import { useCallback, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Typography,
  IconButton,
  TextField,
} from "@material-ui/core";
import MUIRichTextEditor from "mui-rte";
import { EditorState, convertToRaw } from "draft-js";
import { useSelector, useDispatch } from "react-redux";
import { Close, Photo } from "@material-ui/icons";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import useStyles from "../../theme/styles";
import Loader from "../Utils/Loader";
import Feedback from "../Utils/Feedback";
import { createProduct, getAllProducts } from "../../actions/productAction";
import Progress from "../Utils/Progress";
import useStorage from "../../hooks/useStorage";

const initState = {
  name: "",
  address: "",
  image: "",
};

const CreateProduct = ({ open, handleClose, pageSize, filter }) => {
  const classes = useStyles();
  const [state, setState] = useState(initState);
  const [details, setDetails] = useState(null);
  const [editorCheck, setEditorCheck] = useState(null);
  const [file, setFile] = useState(null);
  const [feed, setFeed] = useState({
    loading: false,
    open: false,
    message: "",
    success: false,
  });

  const { url, progress, setProgress, setUrl } = useStorage(file);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.product);

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
        type: "RESET_PRODUCT",
      });
    };
  }, [error, dispatch]);

  useEffect(() => {
    let abortController = new AbortController();
    if (success) {
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message: "New Product created successfully",
        success: true,
      }));
      setState(initState);
    }
    EditorState.createEmpty();
    dispatch(getAllProducts(pageSize, filter));

    return () => {
      abortController.abort();

      dispatch({
        type: "RESET_PRODUCT",
      });
    };
  }, [success, dispatch, pageSize, filter]);

  useEffect(() => {
    if (url) {
      setProgress(0);
      setFeed((prev) => ({
        loading: false,
        open: !prev.open,
        message: "Image uploaded successfully.",
        success: true,
      }));
      setState((prev) => ({
        ...prev,
        image: url,
      }));
    }

    return () => {
      setTimeout(() => {
        setUrl(null);
      }, 2000);
    };
  }, [url, setProgress, setUrl]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file) {
        setFile(file);
      }
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeEditor = (state = EditorState) => {
    const details = JSON.stringify(convertToRaw(state.getCurrentContent()));
    setDetails(details);

    setEditorCheck(state.getCurrentContent().getPlainText());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, image } = state;
    const data = {
      name,
      address,
      image: image === "" ? undefined : image,
      details,
    };
    dispatch(createProduct(data));

    setTimeout(() => {
      handleClose();
    }, 3500);
  };

  const handleCloseFeed = () => {
    setFeed((prevState) => ({ ...prevState, open: false }));
  };

  const validCheck = () => !state.name || !state.address || !editorCheck;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      className={classes.dialog}
    >
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
      <DialogTitle className={classes.dialogTitle}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="overline" className={clsx(classes.subtitle)}>
              Product
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose} className={classes.dialogBtn}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={6} className={classes.mb20}>
              <Typography className={clsx(classes.fileTypo, classes.small)}>
                Add Product Image
              </Typography>
              <div {...getRootProps({ className: classes.dropzone })}>
                <input {...getInputProps()} accept="image/*" />
                {isDragActive ? (
                  <p>Drop the file(s) here ...</p>
                ) : (
                  <>
                    <Photo fontSize="large" className={classes.mAuto} />

                    <p className={clsx(classes.grid, classes.justifyCenter)}>
                      Drag and Drop your files here or click here to upload
                    </p>
                  </>
                )}
              </div>
              <div className={classes.mb20}>
                {progress === 0 ? null : (
                  <Progress value={progress} loading={loading} />
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Name"
                name="name"
                value={state.name || ""}
                onChange={handleChange}
                className={classes.textField}
                placeholder="Enter Product Name"
                required
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Product Address"
                name="address"
                value={state.address || ""}
                onChange={handleChange}
                className={classes.textField}
                placeholder="Enter Product Location"
                helperText={
                  <Typography
                    variant="caption"
                    className={clsx(classes.helperText, classes.link)}
                    display="block"
                  >
                    Example: Street name, City, State, Country.
                  </Typography>
                }
                required
              />
              <>
                <Typography className={clsx(classes.helperText, classes.small)}>
                  Product Details <sup style={{ fontSize: 16 }}>*</sup>
                </Typography>
                <MUIRichTextEditor
                  label="Enter Product Details...*"
                  inlineToolbar={true}
                  variant="outlined"
                  className={classes.textField}
                  onChange={handleChangeEditor}
                />
              </>
            </Grid>
          </Grid>
          <Grid container justify="space-between" className={classes.mt20}>
            <Grid item></Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                className={clsx(
                  classes.greenBtn,
                  classes.btnPadded,
                  classes.mb20
                )}
                endIcon={loading && <Loader />}
                disabled={validCheck() || loading || progress > 0}
              >
                {loading ? null : "Create"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProduct;
