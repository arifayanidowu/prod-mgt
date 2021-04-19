import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Collapse,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
  Divider,
  Badge,
  Backdrop,
  Tooltip,
  CardActionArea,
} from "@material-ui/core";
import clsx from "clsx";
import { Send } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Curve } from "../../theme/assets/curve.svg";
import { ReactComponent as Pin } from "../../theme/assets/pin.svg";
import { ReactComponent as EditIcon } from "../../theme/assets/edit.svg";
import { ReactComponent as Messenger } from "../../theme/assets/messenger.svg";
import MIcon from "../Utils/MIcon";
import useStyles from "../../theme/styles";
import { navigate } from "../../handlers/navigate";
import { textToHtml } from "../Utils/textToHtml";
import { createComment } from "../../actions/commentAction";
import { getAllProducts } from "../../actions/productAction";
import Loader from "../Utils/Loader";

const ProductList = ({
  products,
  handleExpandClick,
  expanded,
  setExpanded,
  check,
  productId,
  pageSize,
  filter,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const { loading, comment: newComment } = useSelector(
    (state) => state.comment
  );
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (newComment && newComment !== null) {
      setComment("");
      dispatch(getAllProducts(pageSize, filter));

      setExpanded(false);
    }
    return () => {
      dispatch({
        type: "RESET_COMMENT",
      });
    };
  }, [newComment, dispatch, productId, pageSize, filter, setExpanded]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      comment,
      productId,
    };
    dispatch(createComment(data));
  };

  return (
    <Grid container justify="center" spacing={3}>
      {products?.()?.map((item, i) => (
        <Grid item xs={12} md={4} key={i}>
          <Card>
            <CardActionArea
              onClick={() => navigate(history, `/products/${item?._id}`)}
            >
              <CardMedia
                className={classes.media}
                image={item?.image}
                title={item?.name}
              >
                <Paper elevation={1} className={clsx(classes.locationAbsolute)}>
                  <MIcon src={Pin} fontSize="small" className={classes.mr6} />
                  <span>{item?.location?.formattedAddress}</span>
                </Paper>
              </CardMedia>
            </CardActionArea>
            <div className={classes.avatarContainer}>
              <Curve className={classes.curve} />

              <Avatar
                src={item?.user?.avatar || "/svgs/user.svg"}
                className={classes.avatarAbsolute}
              />
            </div>
            <CardContent className={classes.cardContent}>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.mb20}
              >
                <Grid item>
                  <Typography className={clsx(classes.small, classes.grayText)}>
                    {item?.user?.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={clsx(classes.small, classes.grayText)}>
                    {moment(item?.createdAt).format("MMM Do, YY")}
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                gutterBottom
                noWrap
                className={clsx(
                  classes.productTitle,
                  classes.boldText,
                  classes.link2,
                  classes.wrapText
                )}
                component={Link}
                to={`/products/${item?._id}`}
              >
                {item?.name}
              </Typography>

              <div
                className={classes.wrapText}
                dangerouslySetInnerHTML={{
                  __html: textToHtml(item?.details),
                }}
              />

              <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.mb20}
              >
                <Grid item>
                  <Tooltip arrow placement="bottom" title="View comments">
                    <IconButton
                      onClick={() =>
                        navigate(history, `/products/${item?._id}`)
                      }
                    >
                      <Badge
                        color="secondary"
                        badgeContent={item?.comments?.length}
                      >
                        <MIcon src={Messenger} viewBox="0 0 512 512.0002" />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip arrow placement="bottom" title="Add comments">
                    <IconButton onClick={() => handleExpandClick(i)}>
                      <MIcon src={EditIcon} viewBox="0 -1 401.52289 401" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
            <Collapse in={expanded && check === i} timeout="auto" unmountOnExit>
              <Divider />
              <CardContent>
                <Typography className={classes.grayText} gutterBottom>
                  Write a comment
                </Typography>
                <Grid container alignItems="center">
                  <Grid item md={2} xs={2}>
                    <Avatar src={profile?.avatar || "/svgs/user.svg"} />
                  </Grid>
                  <Grid item md={10} xs={10}>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Type a message"
                        placeholder="Type a message..."
                        name="comment"
                        value={comment}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="start"
                                type="submit"
                                disabled={!comment}
                              >
                                <Send />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </form>
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}

      <Backdrop className={classes.backdrop} open={loading}>
        <Loader />
      </Backdrop>
    </Grid>
  );
};

export default ProductList;
