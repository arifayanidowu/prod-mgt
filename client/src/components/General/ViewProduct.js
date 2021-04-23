import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CardMedia,
  Container,
  Typography,
  Backdrop,
  Grid,
  Card,
  CardContent,
  Badge,
  Collapse,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  CardActionArea,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import clsx from "clsx";
import moment from "moment";
import { getProductById } from "../../actions/productAction";
import Wrapper from "./Wrapper";
import useStyles from "../../theme/styles";
import Loader from "../Utils/Loader";
import { textToHtml } from "../Utils/textToHtml";
import MIcon from "../Utils/MIcon";
import { ReactComponent as Pencil } from "../../theme/assets/pencil.svg";
import { ReactComponent as Pin } from "../../theme/assets/pin.svg";
import { Send } from "@material-ui/icons";
import { getAllComments, replyComment } from "../../actions/commentAction";
import ImageModal from "../Modals/ImageModal";

const ViewProduct = ({ toggleTheme }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(null);
  const [reply, setReply] = useState("");
  const { loading, product } = useSelector((state) => state.product);
  const { comments, comment, loading: load } = useSelector(
    (state) => state.comment
  );
  const { profile } = useSelector((state) => state.auth);

  const handleExpandClick = (i) => {
    const isId = comments.findIndex((_, index) => index === i);
    setCheck(isId);
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getAllComments(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (comment && comment !== null) {
      dispatch(getAllComments(id));
      setReply("");
      setExpanded(false);
    }

    return () => {
      dispatch({
        type: "RESET_COMMENT",
      });
    };
  }, [comment, id, dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitReply = (id) => {
    const data = {
      id,
      reply,
    };

    dispatch(replyComment(data));
  };

  return (
    <Wrapper {...{ toggleTheme }}>
      <ImageModal {...{ open, handleClose, imageUrl: product?.image }} />
      <div className={clsx(classes.p30)}>
        <Button
          variant="outlined"
          className={clsx(classes.rounded, classes.btnPadded)}
          //   startIcon={<ChevronLeft />}
          onClick={() => history.goBack()}
        >
          Back
        </Button>

        <Container className={classes.imageContainer}>
          <div className={clsx(classes.centered)}>
            <Avatar
              src={product?.user?.avatar || "/svgs/user.svg"}
              className={clsx(classes.mAuto)}
            />
            <>
              <Typography className={clsx(classes.grayText)}>
                {product?.user?.username}
              </Typography>

              <Typography
                align="center"
                className={clsx(classes.grayText, classes.grid3)}
              >
                <MIcon src={Pin} fontSize="small" className={classes.mr6} />{" "}
                {product?.location?.formattedAddress}
              </Typography>
              <Typography
                gutterBottom
                className={clsx(
                  classes.productTitle,
                  classes.boldText,
                  classes.link2
                )}
              >
                {product?.name}
              </Typography>
            </>
          </div>
          <CardActionArea onClick={handleOpen}>
            <CardMedia
              image={product?.image || "/img/logo.png"}
              title={product?.name}
              alt={product?.name}
              className={classes.media2}
              style={{
                backgroundPosition: !product?.image && "center",
              }}
            />
          </CardActionArea>
          <Typography
            gutterBottom
            className={clsx(
              classes.productTitle,
              classes.boldText,
              classes.link2,
              classes.mt20
            )}
          >
            Details
          </Typography>

          <div
            className={clsx(classes.title2, classes.grayText)}
            dangerouslySetInnerHTML={{
              __html: textToHtml(product?.details),
            }}
          />
        </Container>

        <div>
          <Typography
            gutterBottom
            className={clsx(
              classes.productTitle,
              classes.boldText,
              classes.link2,
              classes.mt20,
              classes.mb20
            )}
          >
            Comments ({comments?.length || 0})
          </Typography>

          {comments?.length === 0 ? (
            <Card variant="outlined" className={classes.cardTransparent}>
              <CardContent className={classes.centered}>
                <Typography
                  align="center"
                  gutterBottom
                  className={clsx(
                    classes.productTitle,
                    classes.boldText,
                    classes.link2,
                    classes.mt20,
                    classes.mb20
                  )}
                >
                  You have 0 comment(s) for this Product
                </Typography>
              </CardContent>
            </Card>
          ) : (
            comments?.map((item, i) => (
              <Grid container justify="center" spacing={2} key={i}>
                <Grid item>
                  <Avatar
                    src={item?.user?.avatar || "/svgs/user.svg"}
                    alt="title"
                  />
                </Grid>
                <Grid item xs={10} md={11}>
                  <Card variant="outlined" className={classes.cardTransparent}>
                    <CardContent>
                      <Grid
                        container
                        justify="space-between"
                        className={classes.mb20}
                      >
                        <Grid item>
                          <Typography
                            className={clsx(classes.small, classes.grayText)}
                          >
                            {item?.user?.username}
                          </Typography>
                          <Typography className={clsx(classes.small)}>
                            {item?.user?.location?.formattedAddress}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            className={clsx(classes.small, classes.grayText)}
                          >
                            {moment(item?.createdAt).fromNow()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography>{item?.comment}</Typography>
                      <Button
                        color="default"
                        variant="text"
                        endIcon={
                          <Badge
                            color="secondary"
                            badgeContent={item?.replies?.length}
                          >
                            <MIcon
                              src={Pencil}
                              viewBox="0 0 300 300"
                              className={classes.ml2}
                            />
                          </Badge>
                        }
                        onClick={() => handleExpandClick(i)}
                      >
                        Reply
                      </Button>

                      <Collapse
                        in={expanded && check === i}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent>
                          <Typography className={classes.grayText} gutterBottom>
                            Write a reply
                          </Typography>
                          <Grid container spacing={2} className={classes.mb20}>
                            <Grid item>
                              <Avatar
                                src={profile?.avatar || "/svgs/user.svg"}
                              />
                            </Grid>
                            <Grid item xs={12} md={11}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                label="Type a reply"
                                name="reply"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Type a reply..."
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        edge="start"
                                        disabled={!reply}
                                        onClick={() =>
                                          handleSubmitReply(item?._id)
                                        }
                                      >
                                        <Send />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                required
                              />
                            </Grid>
                          </Grid>

                          {/* START REPLIES */}
                          <Divider />
                          <Typography
                            className={clsx(classes.grayText, classes.mt20)}
                            gutterBottom
                          >
                            Replies ({item?.replies?.length || 0})
                          </Typography>

                          {item?.replies?.map((reply, i) => (
                            <Card
                              key={i}
                              variant="outlined"
                              className={clsx(
                                classes.cardTransparent,
                                classes.mb20
                              )}
                            >
                              <CardContent>
                                <Grid
                                  container
                                  justify="space-between"
                                  className={classes.mb20}
                                >
                                  <Grid item>
                                    <Typography
                                      className={clsx(
                                        classes.small,
                                        classes.grayText
                                      )}
                                    >
                                      {reply?.user?.username}
                                    </Typography>
                                    <Typography className={clsx(classes.small)}>
                                      {reply?.user?.location?.formattedAddress}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      className={clsx(
                                        classes.small,
                                        classes.grayText
                                      )}
                                    >
                                      {moment(item?.updatedAt).fromNow()}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Typography>{reply?.reply}</Typography>
                              </CardContent>
                            </Card>
                          ))}

                          {/* END REPLIES */}
                        </CardContent>
                      </Collapse>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ))
          )}
        </div>
      </div>

      <Backdrop className={classes.backdrop} open={loading || load}>
        <Loader />
      </Backdrop>
    </Wrapper>
  );
};

export default ViewProduct;
