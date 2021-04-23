import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "../../theme/styles";
import Wrapper from "../General/Wrapper";
import PasswordField from "../Utils/PasswordField";
import Loader from "../Utils/Loader";
import Feedback from "../Utils/Feedback";
import { navigate } from "../../handlers/navigate";
import { getProfile, loginUser } from "../../actions/authAction";

const initState = {
  email: "",
  password: "",
};

const Login = ({ toggleTheme }) => {
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
  const { loading, error, loginSuccess } = useSelector((state) => state.auth);

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

    if (loginSuccess) {
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message: "You've logged in successfully",
        success: true,
      }));

      setTimeout(() => {
        dispatch(getProfile());

        navigate(history, "/");
      }, 1500);
    }
    return () => {
      abortController.abort();
      dispatch({
        type: "RESET_USER",
      });
    };
  }, [loginSuccess, dispatch, history]);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    const data = {
      email,
      password,
    };

    dispatch(loginUser(data));
  };

  const handleCloseFeed = () => {
    setFeed((prevState) => ({ ...prevState, open: false }));
  };

  const validCheck = () => !state.email || !state.password;

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
                      Don't have an account?
                      <Link
                        to="/register"
                        className={clsx(
                          classes.small,
                          classes.greyText,
                          classes.boldText,
                          classes.link
                        )}
                      >
                        {" "}
                        REGISTER
                      </Link>
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

                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox name="rememberme" color="secondary" />
                        }
                        label={
                          <Typography
                            variant="subtitle2"
                            className={classes.appBarTitle}
                          >
                            Remember me
                          </Typography>
                        }
                        color="primary"
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        className={clsx(
                          classes.small,
                          classes.greyText,
                          classes.boldText,
                          classes.link
                        )}
                        component={Link}
                        to="/forgotpassword"
                      >
                        Forgot Password?
                      </Typography>
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    className={clsx(classes.btn, classes.greenBtn)}
                    endIcon={loading && <Loader />}
                    disabled={validCheck() || loading}
                  >
                    {loading ? null : "Login"}
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

export default Login;
