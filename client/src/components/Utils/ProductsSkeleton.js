import { Grid, Card, Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import clsx from "clsx";
import { ReactComponent as Curve } from "../../theme/assets/curve.svg";
import useStyles from "../../theme/styles";

const ProductsSkeleton = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2} className={clsx(classes.mt20)}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item />
        <Grid item>
          <Skeleton
            variant="rect"
            width={35}
            height={35}
            className={clsx(classes.br8, classes.mr6)}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Card className={classes.skeletonCard}>
          <Skeleton variant="rect" width="100%" height={200} />
          <div className={classes.avatarContainer}>
            <Curve className={classes.curve} />
            <Skeleton
              variant="circle"
              width={40}
              height={40}
              className={classes.avatarAbsolute}
            />
          </div>
          <Paper className={classes.p30}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Skeleton width={80} />
              </Grid>
              <Grid item>
                <Skeleton width={80} />
              </Grid>
            </Grid>
            <Skeleton width={150} height={30} className={classes.mt20} />
            <Skeleton />

            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={3}
              className={classes.mt20}
            >
              <Grid item>
                <Skeleton variant="circle" width={40} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="circle" width={40} height={40} />
              </Grid>
            </Grid>
          </Paper>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.skeletonCard}>
          <Skeleton variant="rect" width="100%" height={200} />
          <div className={classes.avatarContainer}>
            <Curve className={classes.curve} />
            <Skeleton
              variant="circle"
              width={40}
              height={40}
              className={classes.avatarAbsolute}
            />
          </div>
          <Paper className={classes.p30}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Skeleton width={80} />
              </Grid>
              <Grid item>
                <Skeleton width={80} />
              </Grid>
            </Grid>
            <Skeleton width={150} height={30} className={classes.mt20} />
            <Skeleton />

            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={3}
              className={classes.mt20}
            >
              <Grid item>
                <Skeleton variant="circle" width={40} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="circle" width={40} height={40} />
              </Grid>
            </Grid>
          </Paper>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.skeletonCard}>
          <Skeleton variant="rect" width="100%" height={200} />
          <div className={classes.avatarContainer}>
            <Curve className={classes.curve} />
            <Skeleton
              variant="circle"
              width={40}
              height={40}
              className={classes.avatarAbsolute}
            />
          </div>
          <Paper className={classes.p30}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Skeleton width={80} />
              </Grid>
              <Grid item>
                <Skeleton width={80} />
              </Grid>
            </Grid>
            <Skeleton width={150} height={30} className={classes.mt20} />
            <Skeleton />

            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={3}
              className={classes.mt20}
            >
              <Grid item>
                <Skeleton variant="circle" width={40} height={40} />
              </Grid>
              <Grid item>
                <Skeleton variant="circle" width={40} height={40} />
              </Grid>
            </Grid>
          </Paper>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductsSkeleton;
