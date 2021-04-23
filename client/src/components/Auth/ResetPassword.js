import { useState, useEffect } from "react";
import { Paper, Typography, Grid, TextField, Button } from "@material-ui/core";
import clsx from "clsx";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "../../theme/styles";
import Wrapper from "../General/Wrapper";
import PasswordField from "../Utils/PasswordField";
import Loader from "../Utils/Loader";
import Feedback from "../Utils/Feedback";
import { navigate } from "../../handlers/navigate";
import { getUserByToken, resetPassword } from "../../actions/authAction";

const initState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const ResetPassword = ({ toggleTheme }) => {
  const classes = useStyles();
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState(initState);
  const [feed, setFeed] = useState({
    loading: false,
    open: false,
    message: "",
    success: false,
  });
  const { loading, user, error, success } = useSelector((state) => state.auth);

  const usertoken = localStorage.getItem("prod:token");

  useEffect(() => {
    if (token) {
      dispatch(getUserByToken(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      email: user?.email || "",
      username: user?.username || "",
    }));
  }, [user]);

  useEffect(() => {
    if (usertoken) {
      navigate(history, "/");
    }
  }, [usertoken, history]);

  useEffect(() => {
    let abortController = new AbortController();

    if (error && error !== null) {
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message: error,
        success: false,
      }));
    }
    return () => {
      abortController.abort();
      dispatch({
        type: "RESET_USER",
      });
    };
  }, [error, dispatch]);

  useEffect(() => {
    let abortController = new AbortController();

    if (success) {
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message: "Password Reset successfully",
        success: true,
      }));

      setTimeout(() => {
        navigate(history, "/login");
      }, 1500);
    }
    return () => {
      abortController.abort();
      dispatch({
        type: "RESET_USER",
      });
    };
  }, [success, dispatch, history]);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = state;
    const data = {
      password,
      confirmPassword,
      token,
    };

    dispatch(resetPassword(data));
  };

  const handleCloseFeed = () => {
    setFeed((prevState) => ({ ...prevState, open: false }));
  };

  const validCheck = () =>
    !state.email || !state.password || !state.confirmPassword;

  return (
    <Wrapper {...{ toggleTheme }}>
      {feed.success ? (
        <Feedback
          handleCloseFeed={handleCloseFeed}
          open={feed.open}
          severity="success"
          message={feed.message}
        />
      ) : (
        <Feedback
          handleCloseFeed={handleCloseFeed}
          open={feed.open}
          severity="error"
          message={feed.message}
        />
      )}
      <div className={classes.p30}>
        <Paper className={classes.formRoot}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <div className={classes.p10}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  className={classes.mb20}
                >
                  <Grid item>
                    <Typography className={classes.subtitle2}>
                      Reset Password
                    </Typography>
                  </Grid>
                  <Grid item />
                </Grid>

                <form onSubmit={handleSubmit}>
                  <TextField
                    placeholder="Enter Email Address"
                    name="email"
                    type="email"
                    label="Email"
                    value={state.email}
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    required
                    disabled
                  />
                  <TextField
                    placeholder="Enter Email Address"
                    name="username"
                    label="Username"
                    value={state.username}
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    required
                    disabled
                  />
                  <PasswordField
                    placeholder="Enter Password"
                    name="password"
                    type="password"
                    label="Password"
                    value={state.password}
                    onChange={handleChange}
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    required
                  />
                  <PasswordField
                    placeholder="Enter Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    label="Confirm New Password"
                    value={state.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    required
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    className={clsx(classes.btn, classes.greenBtn)}
                    endIcon={loading && <Loader />}
                    disabled={validCheck() || loading}
                  >
                    {loading ? null : "Reset Password"}
                  </Button>
                </form>
              </div>
            </Grid>
            <Grid item xs={12} md={5} className={classes.formImg} />
          </Grid>
        </Paper>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
