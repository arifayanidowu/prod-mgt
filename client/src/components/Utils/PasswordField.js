import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { TextField, Typography } from "@material-ui/core";
import useStyles from "../../theme/styles";

const PasswordField = ({ helperText = "", ...rest }) => {
  const classes = useStyles();

  const [isPassword, setIsPassword] = useState(false);
  const showVisibility = () => {
    setIsPassword((prev) => !prev);
  };
  return (
    <>
      <TextField
        {...rest}
        type={isPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={showVisibility}
                edge="end"
              >
                {isPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography
        variant="caption"
        className={classes.helperText}
        display="block"
        color="textSecondary"
      >
        {helperText}
      </Typography>
    </>
  );
};

export default PasswordField;
