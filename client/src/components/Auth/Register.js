import { useState, useEffect } from "react";
import { Paper, Typography, Grid, TextField, Button } from "@material-ui/core";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "../../theme/styles";
import Wrapper from "../General/Wrapper";
import PasswordField from "../Utils/PasswordField";
import Loader from "../Utils/Loader";
import Feedback from "../Utils/Feedback";
import { navigate } from "../../handlers/navigate";
import { registerUser } from "../../actions/authAction";

const initState = {
  username: "",
  address: "",
  email: "",
  password: "",
};

const Register = ({ toggleTheme }) => {
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
  const { loading, registerSuccess, error } = useSelector(
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

    if (registerSuccess) {
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message: "Account registeration successful",
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
  }, [registerSuccess, dispatch, history]);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...state,
    };
    dispatch(registerUser(data));
  };

  const handleCloseFeed = () => {
    setFeed((prevState) => ({ ...prevState, open: false }));
  };

  const validCheck = () =>
    !state.username || !state.address || !state.email || !state.password;

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
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  className={classes.mb20}
                >
                  <Grid item />
                  <Grid item>
                    <Typography className={classes.subtitle2}>
                      Already have an account?
                      <Link
                        to="/login"
                        className={clsx(
                          classes.small,
                          classes.greyText,
                          classes.boldText,
                          classes.link
                        )}
                      >
                        {" "}
                        LOGIN
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>

                <form onSubmit={handleSubmit}>
                  <TextField
                    placeholder="Enter your username..."
                    name="username"
                    label="Username"
                    value={state.username}
                    fullWidth
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                    autoComplete="off"
                    required
                  />
                  <TextField
                    placeholder="Enter your address..."
                    name="address"
                    label="Address"
                    value={state.address}
                    fullWidth
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                    helperText={
                      <Typography
                        variant="caption"
                        className={clsx(
                          classes.small,
                          classes.greyText,
                          classes.boldText,
                          classes.link
                        )}
                        display="block"
                      >
                        Example: Street name, City, State, Country.
                      </Typography>
                    }
                    required
                  />

                  <TextField
                    placeholder="Enter Email Address"
                    name="email"
                    type="email"
                    label="Email"
                    value={state.email}
                    fullWidth
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                    autoComplete="off"
                    required
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

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    className={clsx(classes.btn, classes.greenBtn)}
                    endIcon={loading && <Loader />}
                    disabled={validCheck() || loading}
                  >
                    {loading ? null : "Register"}
                  </Button>
                </form>
                <Typography
                  className={clsx(
                    classes.subtitle2,
                    classes.small2,
                    classes.mt20
                  )}
                  variant="caption"
                  display="block"
                >
                  By Register, you agree to XTraders{" "}
                  <Link to="#" className={classes.link}>
                    {" "}
                    Terms of use
                  </Link>{" "}
                  &
                  <Link to="#" className={classes.link}>
                    {" "}
                    Privacy Policy
                  </Link>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Wrapper>
  );
};

export default Register;
