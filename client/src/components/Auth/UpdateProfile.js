import { useState, useEffect } from "react";
import { Button, TextField, Paper, Grid, Typography } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "../../theme/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/authAction";
import Loader from "../Utils/Loader";
import Feedback from "../Utils/Feedback";

const initState = {
  email: "",
  username: "",
  address: "",
};
const UpdateProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState(initState);
  const [feed, setFeed] = useState({
    loading: false,
    open: false,
    message: "",
    success: false,
  });

  const { profile, loading, updateSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    let abortController = new AbortController();

    if (updateSuccess) {
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message: "Profile Updated successful",
        success: true,
      }));
    }
    return () => {
      abortController.abort();
      dispatch({
        type: "RESET_USER",
      });
    };
  }, [updateSuccess, dispatch]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      email: profile?.email || "",
      username: profile?.username || "",
      address: profile?.address || "",
    }));
  }, [profile]);

  const handleChange = (e) => {
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
    dispatch(updateProfile(data));
  };
  const handleCloseFeed = () => {
    setFeed((prevState) => ({ ...prevState, open: false }));
  };

  const validCheck = () => !state.email || !state.username || !state.address;

  return (
    <Paper className={clsx(classes.p30)}>
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
      <Typography
        variant="overline"
        gutterBottom
        className={clsx(classes.subtitle)}
      >
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Enter Email Address"
          name="email"
          type="email"
          label="Email"
          value={state.email || ""}
          fullWidth
          onChange={handleChange}
          className={classes.textField}
          variant="outlined"
          autoComplete="off"
        />
        <TextField
          placeholder="Enter your username..."
          name="username"
          label="Username"
          value={state.username || ""}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
          variant="outlined"
          autoComplete="off"
        />
        <TextField
          placeholder="Enter your address..."
          name="address"
          label="Address"
          value={state.address || ""}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
          variant="outlined"
        />

        <Grid container justify="space-between" alignItems="center">
          <Grid item></Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className={clsx(classes.btnPadded, classes.greenBtn)}
              size="large"
              disabled={validCheck() || loading}
              endIcon={loading && <Loader />}
            >
              {loading ? null : "Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UpdateProfile;
