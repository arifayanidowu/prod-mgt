import { createMuiTheme } from "@material-ui/core/styles";
import colors from "./colors";

const type = localStorage.getItem("prod:type") || "light";
const direction = localStorage.getItem("prod:direction") || "ltr";
const primaryColor =
  JSON.parse(localStorage.getItem("prod:color")) || colors.primary;

const theme = createMuiTheme({
  palette: {
    type,

    primary: {
      main: primaryColor,
      // dark: "#1a237e",
      light: "#0176ff",
    },
    secondary: {
      // main: "#b71c1c",
      main: "#dc004e",
    },
    success: {
      main: "#4caf50",
      dark: "#388e3c",
    },
    action: {
      // disabled: "rgba(255, 255, 255, 0.3)",
    },
    grey: {
      A400: "#3c3737",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,

    background: {
      default: type === "dark" ? colors.background : "#fafafa",
      paper: type === "light" ? "#fff" : colors.paperDark,
    },
  },
  direction,
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: [
      "Rubik",
      "Quicksand",
      "Sacramento",
      "Parisienne",
      "Montez",
      "Lobster Two",
      "Alfa Slab One",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiTextField: {
      root: {
        flip: false,
        backgroundColor: "transparent",
      },
    },

    MuiFormControl: {
      root: {
        flip: false,
      },
    },
    MuiOutlinedInput: {
      input: {
        flip: false,
      },
      inputAdornedEnd: {
        flip: false,
      },
    },
    MuiFormControlLabel: {
      root: {
        flip: false,
      },
    },
    MuiIconButton: {
      root: {
        transition: "all 300ms ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      },
    },
    MuiListItemText: {
      root: {
        flip: false,
        // fontSize: 15,
      },
      primary: {
        flip: false,
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 1.5,
      },
    },
    MuiListItem: {
      root: {
        flip: false,
      },
      gutters: {
        flip: false,
        paddingLeft: 35,
      },
    },
    MuiListItemIcon: {
      root: {
        flip: false,
        minWidth: 25,
      },
    },
    MuiButtonGroup: {
      root: {
        flip: false,
      },
      contained: {
        flip: false,
      },
      grouped: {
        flip: false,
      },
      groupedOutlinedHorizontal: {
        flip: false,
      },
    },
    MuiButton: {
      root: {
        flip: false,
      },
      endIcon: {
        flip: false,
      },
      startIcon: {
        flip: false,
      },
      outlined: {
        flip: false,
      },
    },
    MuiButtonBase: {
      root: {
        flip: false,
      },
    },

    MuiTab: {
      wrapper: {
        flip: false,
      },
    },
    MuiDialog: {
      paper: {
        overflow: "unset",
        overflowY: "unset",
      },
    },
    MUIRichTextEditor: {
      root: {
        // backgroundColor: "#ebebeb",
        borderRadius: 4,
        "&:hover": {
          borderColor: "#e0e0e0",
        },
      },
      container: {
        display: "flex",
        flexDirection: "column-reverse",
        "&:hover": {
          borderColor: "#e0e0e0",
        },
      },
      editor: {
        padding: "20px",
        height: "200px",
        maxHeight: "200px",
        overflow: "auto",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        border: `1px solid #e0e0e0`,
        "&:hover": {
          borderColor: "#e0e0e0",
        },
        "&:focus": {
          borderColor: "#e0e0e0",
        },
      },
      toolbar: {
        // backgroundColor: type === "light" ? "#ebebeb" : "transparent",
        backgroundColor: "transparent",
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        border: `1px solid #e0e0e0`,
      },
      placeHolder: {
        paddingLeft: 16,
        width: "100%",
        height: "170px",
        position: "absolute",
        top: "20px",
        "&:hover": {
          borderColor: "#e0e0e0",
        },
        "&:focus": {
          borderColor: "#e0e0e0",
        },
      },
      anchorLink: {
        color: "#333333",
        textDecoration: "underline",
      },
    },
  },
});

export default theme;
