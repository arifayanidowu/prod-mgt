import { Typography, Grid, Button } from "@material-ui/core";
import clsx from "clsx";
import { useHistory } from "react-router";
import useStyles from "../../theme/styles";
import MIcon from "../Utils/MIcon";
import { ReactComponent as RightArrow } from "../../theme/assets/right-arrow.svg";
import { navigate } from "../../handlers/navigate";

const Hero = () => {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("prod:token");

  const handleClick = () => {
    if (token) {
      navigate(history, "/products");
    } else {
      navigate(history, "/login");
    }
  };

  return (
    <div className={classes.heroSection}>
      <div
        data-aos="fade-up"
        data-aos-offset="500"
        data-aos-duration="500"
        data-aos-easing="ease-in-sine"
      >
        <Grid container justify="space-between" alignItems="center">
          <Grid item md={8} className={classes.heroMd}>
            <Typography
              gutterBottom
              className={clsx(classes.heroTitle, classes.mb20)}
            >
              Manage your products with amazing experience at{" "}
              <span className={classes.xBold}>
                <span>XTraders</span>
              </span>
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              className={clsx(classes.btnPadded, classes.mt20)}
              endIcon={<MIcon src={RightArrow} />}
              onClick={handleClick}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item md={4} className={classes.heroImg} />
        </Grid>
      </div>
    </div>
  );
};

export default Hero;
