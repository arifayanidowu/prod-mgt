import { Grid, Typography, Divider, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import clsx from "clsx";
import MIcon from "../Utils/MIcon";
import { ReactComponent as Logo } from "../../theme/assets/logo.svg";
import useStyles from "../../theme/styles";

const Footer = () => {
  const classes = useStyles();
  const location = useLocation();
  const token = localStorage.getItem("prod:token");

  return (
    <div>
      {location.pathname === "/" && <Divider />}

      <div className={classes.footer}>
        {location.pathname === "/" && (
          <>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              //   className={classes.centered}
            >
              <Grid item>
                <Link to="/">
                  <MIcon
                    src={Logo}
                    viewBox="0 0 1920 1920"
                    fontSize="large"
                    className={classes.logo}
                  />
                </Link>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={clsx(classes.appBarTitle, classes.small)}
                  component={Link}
                  to="/"
                >
                  Home
                </Typography>
                {token ? (
                  <Typography
                    variant="subtitle2"
                    className={clsx(classes.appBarTitle, classes.small)}
                    component={Link}
                    to="/products"
                  >
                    Products
                  </Typography>
                ) : (
                  <Button
                    color="inherit"
                    size="small"
                    variant="outlined"
                    href="/login"
                  >
                    Login
                  </Button>
                )}
              </Grid>
            </Grid>
          </>
        )}
        <div className={clsx(classes.centered, classes.mt20)}>
          <Typography
            gutterBottom
            display="block"
            component="small"
            className={classes.small}
          >
            &copy; XTraders. {new Date().getFullYear()}, All rights reserved.
          </Typography>
          <Typography variant="caption" display="block" component="small">
            We use Cookies to ensure we give you the best experience as you
            browse through our website.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
