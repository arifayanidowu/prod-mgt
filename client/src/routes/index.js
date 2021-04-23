import { Route } from "react-router";
import Home from "../components/General/Home";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Account from "../components/Auth/Account";
import Products from "../components/General/Products";
import AuthGuard from "../components/Guard/AuthGuard";
import ViewProduct from "../components/General/ViewProduct";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/forgotpassword",
    component: ForgotPassword,
  },
  {
    path: "/resetpassword/:token",
    component: ResetPassword,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/account",
    component: Account,
    guard: AuthGuard,
  },
  {
    path: "/products",
    exact: true,
    component: Products,
    guard: AuthGuard,
  },
  {
    path: "/products/:id",
    component: ViewProduct,
    guard: AuthGuard,
  },
];

const RouteWrapper = ({ toggleTheme, ...route }) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) =>
        route.guard ? (
          <route.guard path={route.path}>
            <route.component
              {...props}
              routes={route.routes}
              toggleTheme={toggleTheme}
            />
          </route.guard>
        ) : (
          <route.component
            {...props}
            routes={route.routes}
            toggleTheme={toggleTheme}
          />
        )
      }
    />
  );
};

export { routes as default, RouteWrapper };
