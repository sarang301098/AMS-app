import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import RootState from "../store/types";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const userLoggedIn = useSelector((state: RootState) => state.user.userData);
  const userRoute = userLoggedIn && userLoggedIn.type === "user";

  return (
    <Route
      {...rest}
      render={(props) =>
        userLoggedIn && userRoute ? (
          <ErrorBoundary {...props}>
          <Component {...props} />
          </ErrorBoundary>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
