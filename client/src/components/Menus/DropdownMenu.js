import React from "react";
import useStyles from "../../theme/styles";
import {
  Popover,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { useHistory } from "react-router";
import MIcon from "../Utils/MIcon";
import { ReactComponent as SignOut } from "../../theme/assets/sign-out.svg";
import { ReactComponent as SignIn } from "../../theme/assets/sign-in.svg";
import { ReactComponent as Home } from "../../theme/assets/home.svg";
import { ReactComponent as ShoppingBag } from "../../theme/assets/shopping-bag.svg";
import { navigate } from "../../handlers/navigate";

export default function DropdownMenu({ anchorEl, handleClose, openDropdown }) {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("prod:token");

  const logout = () => {
    navigate(history, "/");
    localStorage.removeItem("prod:token");
    handleClose();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleNavigate = (path) => {
    navigate(history, path);
    handleClose();
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
            width: 350,
            overflow: "unset",
            // marginTop: 3,
          },
        }}
      >
        <ListItem
          button
          onClick={() => handleNavigate("/")}
          disableGutters
          className={classes.dropdownMenuItems}
        >
          <ListItemIcon>
            <MIcon src={Home} viewBox="0 0 460.298 460.297" />
          </ListItemIcon>
          <ListItemText primary="Home" className={classes.ml10} />
        </ListItem>
        {token ? (
          <>
            <ListItem
              button
              onClick={() => handleNavigate("/products")}
              disableGutters
              className={classes.dropdownMenuItems}
            >
              <ListItemIcon>
                <MIcon src={ShoppingBag} viewBox="0 0 208.955 208.955" />
              </ListItemIcon>
              <ListItemText primary="Products" className={classes.ml10} />
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigate("/account")}
              disableGutters
              className={classes.dropdownMenuItems}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Account" className={classes.ml10} />
            </ListItem>
            <ListItem
              button
              onClick={logout}
              className={classes.dropdownMenuItems}
            >
              <ListItemIcon>
                <MIcon src={SignOut} viewBox="0 0 477.867 477.867" />
              </ListItemIcon>
              <ListItemText primary="Logout" className={classes.ml10} />
            </ListItem>
          </>
        ) : (
          <ListItem
            button
            onClick={() => handleNavigate("/login")}
            className={classes.dropdownMenuItems}
          >
            <ListItemIcon>
              <MIcon src={SignIn} />
            </ListItemIcon>
            <ListItemText primary="Login" className={classes.ml10} />
          </ListItem>
        )}
      </Popover>
    </div>
  );
}
