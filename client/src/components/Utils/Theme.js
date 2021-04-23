import React from "react";
import clsx from "clsx";
import colors from "../../theme/colors";
import useStyles from "../../theme/styles";
import { ReactComponent as CheckIcon } from "../../theme/assets/check.svg";

const Theme = ({ handleChangeTheme }) => {
  const classes = useStyles();
  const color =
    JSON.parse(localStorage.getItem("theme:color")) || colors.primary;

  return (
    <div
      className={clsx(classes.themeContainer, classes.centered, classes.mr5)}
    >
      <div
        className={clsx(classes.themeSingle, classes.themePrimary)}
        onClick={() => handleChangeTheme(colors.primary)}
      >
        {color === colors.primary && <CheckIcon />}
      </div>
      <div
        className={clsx(classes.themeSingle, classes.themeGreen)}
        onClick={() => handleChangeTheme(colors.green)}
      >
        {color === colors.green && <CheckIcon />}
      </div>
      <div
        className={clsx(classes.themeSingle, classes.themePurple)}
        onClick={() => handleChangeTheme(colors.purple)}
      >
        {color === colors.purple && <CheckIcon />}
      </div>
      <div
        className={clsx(classes.themeSingle, classes.themeArmyGreen)}
        onClick={() => handleChangeTheme(colors.armygreen)}
      >
        {color === colors.armygreen && <CheckIcon />}
      </div>
      <div
        className={clsx(classes.themeSingle, classes.themeTeal)}
        onClick={() => handleChangeTheme(colors.teal)}
      >
        {color === colors.teal && <CheckIcon />}
      </div>
      <div
        className={clsx(classes.themeSingle, classes.themeOrange)}
        onClick={() => handleChangeTheme(colors.orange)}
      >
        {color === colors.orange && <CheckIcon />}
      </div>
    </div>
  );
};

export default Theme;
