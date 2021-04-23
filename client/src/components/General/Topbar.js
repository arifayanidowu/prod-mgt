import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import useStyles from "../../theme/styles";
import MIcon from "../Utils/MIcon";
import { ReactComponent as Logo } from "../../theme/assets/logo.svg";
import { ReactComponent as Sun } from "../../theme/assets/sun-2.svg";
import { ReactComponent as HalfMoon } from "../../theme/assets/half-moon-2.svg";

const Topbar = ({ toggleTheme, handleClick, handleClick2, openDropdown }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const token = localStorage.getItem("prod:token");
  const { profile } = useSelector((state) => state.auth);

  return (
    <>
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar>
          <Link to="/">
            <MIcon
              src={Logo}
              viewBox="0 0 1920 1920"
              fontSize="large"
              style={{ width: 60, height: 60 }}
            />
          </Link>

          <div className={classes.fg1} />
          <IconButton
            className={clsx(
              {
                [classes.goldColor]: theme.palette.type === "dark",
              },
              classes.mr10
            )}
            onClick={toggleTheme}
          >
            {theme.palette.type === "light" ? (
              <MIcon
                src={HalfMoon}
                viewBox="0 0 312.999 312.999"
                fontSize="small"
                color="primary"
              />
            ) : (
              <MIcon src={Sun} viewBox="0 0 302.4 302.4" fontSize="small" />
            )}
          </IconButton>
          {matches ? (
            <IconButton
              edge="end"
              onClick={handleClick}
              className={clsx("hamburger", {
                "hamburger--spin": openDropdown,
                "is-active": openDropdown,
              })}
            >
              <span className={clsx("hamburger-box")}>
                <span
                  className={clsx("hamburger-inner", classes.menuColor, {
                    [classes.menuColor]: openDropdown,
                  })}
                ></span>
              </span>
            </IconButton>
          ) : (
            <>
              <Typography
                className={clsx(classes.appBarTitle, classes.small)}
                component={Link}
                to="/"
              >
                Home
              </Typography>
              {token ? (
                <>
                  <Typography
                    className={clsx(classes.appBarTitle, classes.small)}
                    component={Link}
                    to="/products"
                  >
                    Products
                  </Typography>
                  <Typography
                    className={clsx(classes.appBarTitle, classes.small)}
                    component={Link}
                    to="/account"
                  >
                    Account
                  </Typography>
                  <IconButton size="small" onClick={handleClick2}>
                    <Avatar src={profile?.avatar || "/svgs/user.svg"} />
                  </IconButton>
                </>
              ) : (
                <Typography
                  className={clsx(classes.appBarTitle, classes.small)}
                  component={Link}
                  to="/login"
                >
                  Login
                </Typography>
              )}
            </>
          )}
        </Toolbar>
        <Divider />
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Topbar;
