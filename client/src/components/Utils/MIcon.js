import React from "react";
import { SvgIcon } from "@material-ui/core";

const MIcon = ({ src, viewBox = "0 0 512 512", ...rest }) => {
  return <SvgIcon component={src} {...rest} viewBox={viewBox} />;
};

export default MIcon;
