import { useState, useEffect, useRef } from "react";
import { Toolbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  useViewportScroll,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import useStyles from "../../theme/styles";
import Footer from "./Footer";
import Topbar from "./Topbar";
import DropdownMenu from "../Menus/DropdownMenu";
import LogoutMenu from "../Menus/LogoutMenu";
import { getProfile } from "../../actions/authAction";

const Wrapper = ({ toggleTheme, children }) => {
  const classes = useStyles();
  const docRef = useRef();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dispatch = useDispatch();

  const { scrollYProgress } = useViewportScroll();
  const width = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useMotionTemplate`${width}`;

  useEffect(() => {
    const token = localStorage.getItem("prod:token");
    if (token) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  const handleClick = (event) => {
    setOpenDropdown(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenDropdown(false);
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          zIndex: 9999999999999,
          background: "rgb(230 46 131)",
          width: "100%",
          scaleX: progress,
        }}
        initial={{
          originX: 0,
        }}
      />
      <div className={classes.wrapper} ref={docRef}>
        <Topbar {...{ toggleTheme, handleClick, handleClick2, openDropdown }} />
        <DropdownMenu {...{ anchorEl, handleClose, openDropdown }} />
        <LogoutMenu {...{ anchorEl: anchorEl2, handleClose: handleClose2 }} />
        <div className={classes.content}>
          {children}
          <Toolbar />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Wrapper;
