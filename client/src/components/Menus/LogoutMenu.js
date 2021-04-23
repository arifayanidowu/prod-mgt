import React from "react";
import useStyles from "../../theme/styles";
import {
  Popover,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useHistory } from "react-router";
import MIcon from "../Utils/MIcon";
import { ReactComponent as SignOut } from "../../theme/assets/sign-out.svg";
import { navigate } from "../../handlers/navigate";
import { useDispatch } from "react-redux";

export default function LogoutMenu({ anchorEl, handleClose }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    navigate(history, "/");
    localStorage.removeItem("prod:token");
    dispatch({
      type: "RESET_STORE",
    });
    handleClose();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: 180,
            overflow: "unset",
            // marginTop: 3,
          },
        }}
      >
        <ListItem button onClick={logout} className={classes.dropdownMenuItems}>
          <ListItemIcon>
            <MIcon src={SignOut} viewBox="0 0 477.867 477.867" />
          </ListItemIcon>
          <ListItemText primary="Logout" className={classes.ml10} />
        </ListItem>
      </Popover>
    </div>
  );
}
