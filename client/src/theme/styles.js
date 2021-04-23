import { darken, lighten, makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { hex2rgba } from "../handlers/hex2rgba";
import colors from "./colors";

const letterSpacing = 1.5;
const WIDTH = document.documentElement.clientWidth;

const useStyles = makeStyles(
  (theme) => ({
    appBar: {
      background:
        theme.palette.type === "light"
          ? "rgba(250, 250, 250, 0.5)"
          : "rgb(22 28 36 / 30%)",
      backdropFilter: "blur(8px)",

      "& > *": {
        color: theme.palette.type === "light" ? "#000000de" : "#fff",
      },
    },
    appBarTitle: {
      marginRight: theme.spacing(2),
      textDecoration: "none",
      color: "inherit",
    },
    logo: { width: 60, height: 60 },
    fg1: {
      flexGrow: 1,
    },
    link: {
      color: green[600],
    },
    link2: {
      color: "inherit",
      textTransform: "uppercase",
      display: "inline-block",
    },
    productContent: {
      overflow: "hidden",
      maxHeight: 30,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    wrapper: {
      overflow: "hidden",
    },
    content: {
      display: "flex",
      minHeight: "100vh",
      justifyContent: "space-between",
      flexDirection: "column",
      overflowY: "auto",
    },
    container: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      width: "100vw",
    },
    heroSection: {
      background:
        theme.palette.type === "light"
          ? "rgb(121 121 121 / 3%)"
          : darken(theme.palette.background.default, 0.3),
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      width: "100%",
      height: "100vh",
      display: "block",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
      },
    },
    heroMd: {
      [theme.breakpoints.down("sm")]: {
        backgroundImage: "url(/img/coins.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top 10px right -5%",
        backgroundSize: "contain",
      },
    },
    heroImg: {
      backgroundImage: "url(/img/shopping.png)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: 400,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    productTitle: {
      fontSize: "clamp(1rem, -0.875rem + 8.333vw, 1.5rem)",
      lineHeight: 1.5,
    },
    title: {
      fontFamily: "Quicksand",
      fontSize: "clamp(1rem, -0.875rem + 8.333vw, 1.5rem)",
      lineHeight: 1.5,
    },
    title2: {
      fontSize: "clamp(1rem, -0.875rem + 8.333vw, 1.5rem)",
      lineHeight: 1.5,
    },
    subtitle: {
      fontFamily: "Quicksand",
      fontSize: "clamp(0.5rem, -0.875rem + 8.333vw, 1rem)",
      lineHeight: 1.5,
      fontWeight: 600,
      // marginBottom: 20,
    },
    subtitle2: {
      fontFamily: "Quicksand",
      fontSize: "clamp(0.8rem, 0.5rem, 1rem)",
      lineHeight: 1.5,
      fontWeight: 600,
    },
    heroTitle: {
      fontFamily: "Quicksand",
      fontSize: "clamp(1rem, -0.875rem + 8.333vw, 3.5rem)",
    },
    btnPadded: {
      padding: theme.spacing(1.5, 5),
      letterSpacing,
      "& > svg": {
        flip: false,
      },
    },
    ml10: {
      marginLeft: 10,
    },
    ml20: {
      marginLeft: 20,
    },
    ml2: {
      marginLeft: 2,
    },
    mr10: {
      flip: false,
      marginRight: 10,
    },
    mr20: {
      flip: false,
      marginRight: 20,
    },
    mr2: {
      flip: false,
      marginRight: 2,
    },
    mr6: {
      flip: false,
      marginRight: 6,
    },
    mr50: {
      flip: false,
      marginRight: 50,
    },
    mr5: {
      flip: false,
      marginRight: 5,
    },
    w100: {
      width: 100,
    },

    mt20: {
      marginTop: 20,
    },

    mt50: {
      marginTop: 50,
    },
    mb20: {
      marginBottom: 20,
    },
    mb2: {
      marginBottom: 2,
    },
    p5: {
      padding: 5,
    },
    p10: {
      padding: 10,
    },
    p30: {
      padding: 30,
    },
    p60: {
      padding: 60,
    },
    overflowUnset: {
      overflow: "unset",
    },
    card: {
      overflow: "unset",
      background: "transparent",
      borderRadius: theme.shape.borderRadius * 2,
      zIndex: 1,
      marginTop: 40,
    },
    goldColor: {
      color: "rgb(255 225 2)",
    },
    centered: {
      textAlign: "center",
    },
    mAuto: {
      margin: "auto",
      display: "block",
      marginBottom: 20,
    },
    iconRounded: {
      width: 100,
      height: 100,
      background: "transperant",
      borderRadius: "50%",
      boxShadow: theme.shadows[2],
      marginBottom: 20,
      zIndex: 999999,
      "&:hover": {
        background: theme.palette.background.paper,
      },
    },
    mtn20: {
      marginTop: -20,
    },
    rotate: {
      animation: "3s linear $rotation infinite",
      perspective: 500,
      transformStyle: "preserve-3d",
    },
    "@keyframes rotation": {
      "0%": {
        transform: "rotateZ(0deg)",
      },

      "100%": {
        transform: "rotateZ(359deg)",
      },
    },
    helperText: {
      marginTop: -5,
      marginBottom: 10,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontSize: 8.5,
    },
    textField: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      flip: false,
    },
    btn: {
      margin: "10px 0",
      padding: theme.spacing(2),
      letterSpacing: 2.5,
    },
    greenBtn: {
      color: theme.palette.getContrastText(green[500]),
      background: green[500],
      "&:hover": {
        background: green[700],
      },
    },
    formRoot: {
      width: 900,
      margin: "30px auto",
      overflow: "hidden",
      padding: 30,
      borderRadius: theme.shape.borderRadius * 3,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    formImg: {
      background: "url(/img/login.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: theme.shape.borderRadius * 3,
      padding: 30,
    },
    photoRoot: {
      textAlign: "center",
      height: 400,
      padding: theme.spacing(6),
      [theme.breakpoints.down("sm")]: {
        height: "100%",
      },
    },
    biggestAvatar: {
      width: 150,
      height: 150,
      margin: "auto",
    },
    mediumAvatar: {
      width: 100,
      height: 100,
      margin: "auto",
    },
    photoIcon: {
      fill: "#fff",
    },
    avatarBtn: {
      color: "#fff",
      position: "relative",
      "&:hover $middle": {
        opacity: 1,
      },
      "&:hover $avatarProfile": {
        // opacity: 0.5,
      },
      textAlign: "center",
      zIndex: 11,
      "&:after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        padding: 2,
        borderRadius: "50%",
        border: `1px dashed ${hex2rgba(theme.palette.primary.main, 0.5)}`,
      },
    },
    progressCircular: {
      position: "absolute",
      top: -9,
      color: "orange",
      zIndex: -2,
    },
    avatarProfile: {
      opacity: 1,
      display: "block",
      backfaceVisibility: "hidden",
      // transition: "opacity 100ms ease-in-out",
    },
    grayText: {
      color: "#868686",
    },
    small: {
      fontSize: 11,
      letterSpacing,
      textTransform: "uppercase",
    },
    small2: {
      fontSize: 9,
      letterSpacing,
      textTransform: "uppercase",
    },
    security: {
      background: "url(/img/security.png)",
      backgroundRepeat: "no-repeat",
      backgroundPostion: "center",
      backgroundSize: "cover",
      backgroundColor: "#f2e6dc",
    },
    middle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: 12,
      opacity: 0,
      position: "absolute",
      width: 150,
      height: 150,
      borderRadius: "50%",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      // background: hex2rgba(theme.palette.primary.main, 0.59999999),
      background: hex2rgba("#000000", 0.69999999),

      transition: "all 300ms ease",
    },
    grid: {
      flip: false,
      display: "flex",
      alignItems: "center",
      "& > svg": {
        flip: false,
        marginLeft: 4,
        fontSize: 20,
      },
    },
    grid2: {
      flip: false,
      display: "flex",
      alignItems: "center",
    },
    grid3: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    dropdownMenuUpper: {
      padding: 10,
      paddingLeft: 20,
    },
    dropdownMenuItems: {
      flip: false,
      padding: 20,
    },
    searchRoot: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      maxWidth: 350,
      width: "100%",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      position: "relative",
      backgroundColor:
        theme.palette.type === "light"
          ? "rgb(29 33 49 / 10%)"
          : "rgb(29 33 49 / 90%)",
      backgroundImage: "url(/img/logo.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    bgTrans: {
      backgroundColor: "transparent",
    },
    media2: {
      height: 0,

      paddingTop: "56.25%", // 16:9
      backgroundColor:
        theme.palette.type === "light"
          ? "rgb(29 33 49 / 10%)"
          : "rgb(29 33 49 / 90%)",
      backgroundImage: "url(/img/logo.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: theme.shape.borderRadius * 2,
      border: "6px solid #e6e2e2",
    },
    media3: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      backgroundColor:
        theme.palette.type === "light"
          ? "rgb(29 33 49 / 10%)"
          : "rgb(29 33 49 / 90%)",
      backgroundImage: "url(/img/logo.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      border: "6px solid #cccccc",
      [theme.breakpoints.down("sm")]: {
        height: 500,
      },
    },
    xBold: {
      color: "white",
      backgroundRepeat: "repeat",
      backgroundImage:
        "linear-gradient( 109.6deg,  rgba(116,18,203,1) 11.2%, rgba(230,46,131,1) 91.2% )",
      fontWeight: 900,
      fontFamily: "Rubik",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textTransform: "uppercase",
    },
    locationAbsolute: {
      position: "absolute",
      right: 10,
      top: 10,
      padding: 10,
      display: "flex",
      alignItems: "center",
    },
    cardContent: {
      paddingTop: 30,
    },
    avatarContainer: {
      position: "relative",
      zIndex: 2,
    },
    avatarAbsolute: {
      flip: false,
      position: "absolute",
      left: 52,
      top: -32,
    },
    curve: {
      flip: false,
      position: "absolute",
      top: -36,
      // zIndex: 1,
      fill: theme.palette.background.paper,
    },

    boldText: {
      fontWeight: 600,
    },

    featuresText: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      // width: "100%",
      // maxWidth: 600,
      "&:before": {
        content: "''",
        position: "absolute",
        flex: 1,
        width: 80,
        height: 2,
        display: "block",
        background: "#f85650",
        marginRight: 180,
      },
      "&:after": {
        content: "''",
        position: "absolute",
        flex: 1,
        width: 80,
        height: 2,
        display: "block",
        background: "#f85650",
        marginLeft: 180,
      },
    },
    editorWrapper: {
      width: 500,
      height: 300,
      // [theme.breakpoints.down("sm")]: {
      //   width: "100%",
      //   height: "100%",
      // },
    },
    dropzone: {
      border: `1px dashed #eeeeee`,
      borderRadius: theme.shape.borderRadius,
      textAlign: "center",
      padding: theme.spacing(6) * 2,
      backgroundColor:
        theme.palette.type === "light" ? "#fafafa" : "transparent",
      transition: theme.transitions.create(["all"], {
        easing: theme.transitions.easing.easeIn,
      }),

      cursor: "pointer",

      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "100%",

        padding: 0,
      },
      "&:hover": {
        // background: darken("#fafafa", 0.05),
        borderColor: lighten(colors.green, 0.5),
      },
    },
    chip: {
      // background: color.brown,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1) / 2,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      // color: color.black,
      borderRadius: theme.shape.borderRadius,
      fontSize: 9,
      fontWeight: 900,
    },
    fileTypo: {
      fontSize: 12,
      fontFamily: "Quicksand",

      fontWeight: 600,
    },
    justifyCenter: {
      justifyContent: "center",
    },
    dialog: {
      overflow: "unset",
    },
    dialogTitle: {
      position: "relative",
      overflow: "unset",
    },
    br8: {
      borderRadius: 8,
    },
    dialogBtn: {
      position: "absolute",
      right: -15,
      top: -30,
      background: theme.palette.background.paper,
      zIndex: 2,
      boxShadow: theme.shadows[2],
      "&:hover": {
        background: theme.palette.background.paper,
      },
      border: `4px solid ${
        theme.palette.type === "light" ? "#d8d4d4" : "#e6e2e2"
      }`,
    },
    noProducts: {
      padding: theme.spacing(6),
      margin: "30px auto",

      textAlign: "center",

      background: "transparent",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      "& > img": {
        width: 300,
      },
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    wrapText: {
      display: "block",
      "& > *": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "block",
      },
      "& > p": {
        fontSize: 16,
      },
    },
    rounded: {
      borderRadius: 30,
    },
    imageContainer: {
      maxWidth: 745,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        maxWidth: "100%",
      },
    },
    cardTransparent: {
      backgroundColor: "transparent",
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius * 4,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0.5),
      },
    },
    cursor: {
      cursor: "pointer",
      width: "fit-content",
    },
    skeletonCard: {
      // width: 390,
      width: WIDTH / 3.3,
      [theme.breakpoints.down("sm")]: {
        width: WIDTH - 50,
      },
    },
    footer: {
      marginTop: "auto",
      padding: 28,
    },
    hidden: {
      display: "none",
    },
    menuColor: {
      backgroundColor: theme.palette.type === "dark" && "#f9f9f9",

      "&:before": {
        backgroundColor: theme.palette.type === "dark" && "#f9f9f9",
      },
      "&:after": {
        backgroundColor: theme.palette.type === "dark" && "#f9f9f9",
      },
    },
  }),
  { index: 1 }
);

export default useStyles;
