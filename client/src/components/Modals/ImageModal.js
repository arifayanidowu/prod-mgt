import { Dialog, Card, CardMedia, Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import clsx from "clsx";
import useStyles from "../../theme/styles";

const ImageModal = ({ open, handleClose, imageUrl }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      className={clsx(classes.dialog)}
    >
      <Card className={clsx(classes.dialogCard)}>
        <Grid container justify="space-between">
          <Grid item></Grid>
          <Grid item>
            <IconButton onClick={handleClose} className={classes.dialogBtn}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <CardMedia
          image={imageUrl || "/img/logo.png"}
          className={clsx(classes.media3)}
        />
      </Card>
    </Dialog>
  );
};

export default ImageModal;
