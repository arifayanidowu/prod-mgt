import { useState, useEffect } from "react";
import {
  Avatar,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../../theme/styles";
import useStorage from "../../hooks/useStorage";
import { uploadAvatar } from "../../actions/authAction";
import Feedback from "../Utils/Feedback";

const ChangePhoto = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [feed, setFeed] = useState({
    loading: false,
    open: false,
    message: "",
    success: false,
  });

  const { url, setUrl, progress, setProgress } = useStorage(file);
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    const asyncUpload = async () => {
      if (url) {
        const data = {
          avatar: url,
        };
        dispatch(uploadAvatar(data));

        setFeed((prev) => ({
          loading: false,
          open: !prev.open,
          message: "Avatar uploaded successfully.",
          success: true,
        }));
        return url;
      }
    };

    asyncUpload();
    return () => {
      setUrl(null);
      setFile(null);
      setProgress(0);
    };
  }, [url, dispatch, setUrl, setProgress]);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const size = file.size / 1024 / 1024;
    if (size > 3.5) {
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message: "Your file is too large (limit is 3.5MiB).",
        success: false,
      }));
      return;
    } else {
      setFile(file);
    }
  };

  const handleCloseFeed = () => {
    setFeed((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <Paper className={classes.photoRoot}>
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

      <IconButton className={classes.avatarBtn}>
        <label htmlFor="avatar" className={clsx(classes.cursor)}>
          <Avatar
            src={profile?.avatar || "/svgs/user.svg"}
            className={classes.biggestAvatar}
          />
          <span className={classes.middle}>
            <AddAPhoto
              style={{ color: "#fff" }}
              className={clsx(classes.photoIcon, classes.avatarProfile)}
            />
            Update Photo
          </span>
        </label>
        <CircularProgress
          value={progress}
          variant="determinate"
          thickness={1.5}
          size={190}
          className={classes.progressCircular}
        />
      </IconButton>

      <div className={classes.mt20}>
        <div className={classes.grayText}>
          <Typography className={classes.small} gutterBottom>
            Allowed formats: *.jpeg, *.jpg, *.png
          </Typography>
          <Typography className={classes.small}>Max size of 3.5MB</Typography>
        </div>
        <input
          type="file"
          accept="image/*,.png,.jpg,.jpeg"
          id="avatar"
          className={classes.hidden}
          onChange={handleChangeFile}
        />
      </div>
    </Paper>
  );
};

export default ChangePhoto;
