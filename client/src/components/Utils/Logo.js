import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "../../theme/styles";
import MIcon from "./MIcon";
import { ReactComponent as BadgeIcon } from "../../theme/assets/badge.svg";

const Logo = ({ path, size }) => {
  const classes = useStyles();
  return (
    <>
      <Typography
        className={classes.logo}
        variant="overline"
        component={Link}
        to={path}
        style={{ fontSize: size }}
      >
        <span className={classes.logoTextOne}>RS</span>{" "}
        <MIcon
          src={BadgeIcon}
          viewBox="0 0 294.996 294.996"
          className={classes.iconSmall}
        />
        <span className={classes.logoTextTwo}>Vendor</span>
      </Typography>
    </>
  );
};

export default Logo;
