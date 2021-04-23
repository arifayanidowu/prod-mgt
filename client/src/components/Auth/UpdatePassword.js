import { useState, useEffect } from "react";
import { Paper, Grid, Button } from "@material-ui/core";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../../theme/styles";
import PasswordField from "../Utils/PasswordField";
import { changePassword } from "../../actions/authAction";
import Feedback from "../Utils/Feedback";
import Loader from "../Utils/Loader";

const initState = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const UpdatePassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState(initState);
  const [feed, setFeed] = useState({
    loading: false,
    open: false,
    message: "",
    success: false,
  });

  const { isPassUpdate, loading, error } = useSelector((state) => state.auth);

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

    if (isPassUpdate) {
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message: "Password changed successfully.",
        success: true,
      }));
    }
    return () => {
      abortController.abort();
      setState(initState);
      dispatch({
        type: "RESET_USER",
      });
    };
  }, [isPassUpdate, dispatch]);

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, password, confirmPassword } = state;

    const data = {
      oldPassword,
      password,
      confirmPassword,
    };
    dispatch(changePassword(data));
  };

  const handleCloseFeed = () => {
    setFeed((prevState) => ({ ...prevState, open: false }));
  };

  const validCheck = () =>
    !state.oldPassword || !state.password || !state.confirmPassword;

  return (
    <Paper style={{ overflow: "hidden" }}>
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
      <Grid container>
        <Grid item className={classes.security} md={5} xs={12} />

        <Grid item md={7} xs={12} className={classes.p30}>
          <form onSubmit={handleSubmit}>
            <PasswordField
              label="Old Password"
              fullWidth
              variant="outlined"
              className={classes.textField}
              name="oldPassword"
              value={state.oldPassword}
              onChange={handleChange}
            />
            <PasswordField
              label="New Password"
              name="password"
              value={state.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className={classes.textField}
            />
            <PasswordField
              label="Confirm New Password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className={classes.textField}
            />
            <Grid container justify="space-between">
              <Grid item></Grid>
              <Grid item>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={clsx(classes.btnPadded, classes.greenBtn)}
                  disabled={validCheck() || loading}
                  endIcon={loading && <Loader />}
                >
                  {loading ? null : "Change Password"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UpdatePassword;
