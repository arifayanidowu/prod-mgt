import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import clsx from "clsx";
import useStyles from "../../theme/styles";
import MIcon from "../Utils/MIcon";
import { ReactComponent as World } from "../../theme/assets/worldwide.svg";
import { ReactComponent as ShoppingBag } from "../../theme/assets/shopping-bag.svg";
import { ReactComponent as HandShake } from "../../theme/assets/hand-shake.svg";
import { ReactComponent as Trophy } from "../../theme/assets/trophy.svg";

const Features = () => {
  const classes = useStyles();

  return (
    <Container className={clsx(classes.container, classes.p60)}>
      <Typography
        className={clsx(classes.subtitle, classes.featuresText)}
        align="center"
        variant="overline"
        display="block"
        gutterBottom
      >
        Features
      </Typography>

      <Grid container spacing={3} alignItems="stretch" className={classes.mt20}>
        <Grid item md={4} className={classes.overflowUnset}>
          <Card variant="outlined" className={classes.card}>
            <CardContent className={classes.p30}>
              <MIcon
                src={World}
                viewBox="0 0 510 510"
                fontSize="large"
                className={clsx(classes.mAuto)}
              />

              <Typography
                className={classes.subtitle}
                gutterBottom
                variant="overline"
                display="block"
              >
                Global experience
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                dignissim ultricies sapien in hendrerit. Mauris est arcu,
                tincidunt vitae viverra ac, feugiat sit amet massa. Ut
                tristique.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} className={classes.overflowUnset}>
          <Card variant="outlined" className={classes.card}>
            <CardContent className={classes.p30}>
              <MIcon
                src={ShoppingBag}
                viewBox="0 0 208.955 208.955"
                fontSize="large"
                className={clsx(classes.mAuto)}
              />
              <Typography
                className={classes.subtitle}
                gutterBottom
                variant="overline"
                display="block"
              >
                Customer Satisfaction
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                dignissim ultricies sapien in hendrerit. Mauris est arcu,
                tincidunt vitae viverra ac, feugiat sit amet massa. Ut
                tristique.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} className={classes.overflowUnset}>
          <Card variant="outlined" className={classes.card}>
            <CardContent className={classes.p30}>
              <MIcon
                src={HandShake}
                fontSize="large"
                className={clsx(classes.mAuto)}
              />

              <Typography
                className={classes.subtitle}
                gutterBottom
                variant="overline"
                display="block"
              >
                Reliability
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                dignissim ultricies sapien in hendrerit. Mauris est arcu,
                tincidunt vitae viverra ac, feugiat sit amet massa. Ut
                tristique.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className={clsx(classes.centered, classes.mt50)}>
        <MIcon
          className={classes.mAuto}
          src={Trophy}
          style={{ fontSize: 150 }}
        />
        <Typography
          className={clsx(classes.title, classes.boldText)}
          variant="h1"
        >
          The Number one award winning product management platform
        </Typography>
      </div>
    </Container>
  );
};

export default Features;
