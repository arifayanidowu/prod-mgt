import React from "react";

import { Route, Redirect } from "react-router-dom";

const AuthGuard = ({ children, ...rest }) => {
  const token = localStorage.getItem("prod:token");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthGuard;
