import { useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  createMuiTheme,
  MuiThemeProvider,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { create } from "jss";
import rtl from "jss-rtl";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";
import theme from "./theme";
import routes, { RouteWrapper } from "./routes";
import colors from "./theme/colors";
import store from "./store";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  const [theming, setTheme] = useState(theme);

  const toggleTheme = () => {
    let newPaletteType = theming.palette.type === "light" ? "dark" : "light";

    setTheme((prev) => ({
      ...prev,
      palette: {
        type: newPaletteType,
        background: {
          default: newPaletteType === "dark" ? colors.background : "#fafafa",
          paper: newPaletteType === "light" ? "#fff" : colors.paperDark,
        },
      },
      overrides: {
        ...theming.overrides,
      },
    }));
    localStorage.setItem("prod:type", newPaletteType);
  };

  const muiTheme = createMuiTheme(theming);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <PersistGate persistor={persistor}>
            <Router>
              <Switch>
                {routes.map((route, i) => (
                  <RouteWrapper key={i} {...route} toggleTheme={toggleTheme} />
                ))}
              </Switch>
            </Router>
          </PersistGate>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  );
}

export default App;
