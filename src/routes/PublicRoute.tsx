import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

import RootState from "../store/types";

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
  const userLoggedIn = useSelector((state: RootState) => state.user.userData);
  const routeChange = userLoggedIn && userLoggedIn.type === "user";

  return (
    <Route
      {...rest}
      render={(props) =>
        userLoggedIn && restricted ? (
          <Redirect to={routeChange ? "/dashboard" : "/admin/dashboard"} />
        ) : (
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
        )
      }
    />
  );
};

export default PublicRoute;
