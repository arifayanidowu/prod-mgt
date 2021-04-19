import { useState, useEffect } from "react";
import { Paper, Typography, Grid, TextField, Button } from "@material-ui/core";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../../theme/styles";
import Wrapper from "../General/Wrapper";
import Feedback from "../Utils/Feedback";
import { navigate } from "../../handlers/navigate";
import { Telegram } from "@material-ui/icons";
import { forgotPassword } from "../../actions/authAction";
import Loader from "../Utils/Loader";

const initState = {
  email: "",
};

const ForgotPassword = ({ toggleTheme }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState(initState);
  const [feed, setFeed] = useState({
    loading: false,
    open: false,
    message: "",
    success: false,
  });

  const { loading, message, error, forgotSuccess } = useSelector(
    (state) => state.auth
  );

  const token = localStorage.getItem("prod:token");

  useEffect(() => {
    if (token) {
      navigate(history, "/");
    }
  }, [token, history]);

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

    if (forgotSuccess) {
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message,
        success: true,
      }));
      setTimeout(() => {
        navigate(history, "/login");
      }, 3000);
    }
    return () => {
      abortController.abort();
      dispatch({
        type: "RESET_USER",
      });
    };
  }, [forgotSuccess, message, dispatch, history]);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = state;
    const data = {
      email,
    };
    dispatch(forgotPassword(data));
  };

  const handleCloseFeed = () => {
    setFeed((prevState) => ({ ...prevState, open: false }));
  };

  const validCheck = () => !state.email;

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
            <Grid item xs={12} md={5} className={classes.formImg} />
            <Grid item xs={12} md={7}>
              <div className={classes.p10}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography
                      className={clsx(classes.title, classes.boldText)}
                    >
                      Forgot Password?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component={Link}
                      color="textPrimary"
                      to="/login"
                      className={clsx(
                        classes.small,
                        classes.greyText,
                        classes.boldText,
                        classes.link
                      )}
                    >
                      Login
                    </Typography>
                  </Grid>
                </Grid>

                <form onSubmit={handleSubmit}>
                  <TextField
                    placeholder="Enter Email Address"
                    name="email"
                    type="email"
                    label="Email"
                    value={state.email}
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
                    disabled={validCheck() || loading}
                    endIcon={
                      loading ? <Loader /> : <Telegram fontSize="large" />
                    }
                  >
                    {loading ? null : "Email Me"}
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Wrapper>
  );
};

export default ForgotPassword;
