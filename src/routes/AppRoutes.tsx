import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";
import Header from "../components/Header/header";
import { Spinner } from "../components/loader/Spinner";
import RootState from "../store/types";
import Brands from "../pages/admin/Brands";
import Models from "../pages/admin/Models";
import AdminNotifications from "../pages/admin/AdminNotifications";
import AdminRequestList from "../pages/admin/AdminRequestList";
import Report from "../pages/admin/Report";

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const Dashboard = React.lazy(() => import("../components/Dashboard/Dashboard"));
const RequestList = React.lazy(() => import("../pages/RequestList"));
const Requests = React.lazy(() => import("../pages/Requests"));
const Notifications = React.lazy(() => import("../pages/Notifications"));
const Profile = React.lazy(() => import("../pages/Profile"));
const NewPassword = React.lazy(() => import("../pages/ResetPassword"));
const ChangePassword = React.lazy(() => import("../pages/ChangePassword"));
const AdminDashboard = React.lazy(
  () => import("../pages/admin/AdminDashboard")
);
const Purchases = React.lazy(() => import("../pages/admin/Purchases"));
const PurchasesList = React.lazy(() => import("../pages/admin/PurchaseList"));
const AdminProfile = React.lazy(() => import("../pages/admin/AdminProfile"));
const User = React.lazy(() => import("../pages/admin/User"));
const UserList = React.lazy(() => import("../pages/admin/UserList"));

export const AppRoutes = () => {
  const userLoggedIn = useSelector((state: RootState) => state.user.userData);

  return (
    <Suspense fallback={Spinner}>
      {userLoggedIn ? <Header /> : null}
      <Switch>
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <PublicRoute
          restricted={true}
          component={ForgotPassword}
          path="/forgot-password"
          exact
        />
        <PublicRoute
          restricted={true}
          component={Register}
          path="/register"
          exact
        />
        <PublicRoute
          restricted={true}
          component={NewPassword}
          path="/reset-Password"
          exact
        />
        <PrivateRoute component={Dashboard} path="/dashboard" exact />
        <PrivateRoute
          component={ChangePassword}
          path="/change-password"
          exact
        />
        <PrivateRoute component={RequestList} path="/requests" exact />
        <PrivateRoute component={Requests} path="/requests/:id" exact />
        <PrivateRoute component={Notifications} path="/notifications" exact />
        <PrivateRoute component={Profile} path="/profile/" />

        <AdminRoute component={AdminDashboard} path="/admin/dashboard" exact />
        <AdminRoute component={PurchasesList} path="/admin/purchases" exact />
        <AdminRoute component={Purchases} path="/admin/purchases/new" exact />
        <AdminRoute component={UserList} path="/admin/user" exact />
        <AdminRoute component={User} path="/admin/user/new" exact />
        <AdminRoute component={AdminProfile} path="/admin/profile" />
        <AdminRoute component={Brands} path="/admin/brands" />
        <AdminRoute component={Models} path="/admin/models" />
        <AdminRoute
          component={AdminNotifications}
          path="/admin/notifications"
        />
        <AdminRoute component={AdminRequestList} path="/admin/requests" />
        <AdminRoute
          component={ChangePassword}
          path="/admin/change-password"
          exact
        />
        <AdminRoute component={Report} path="/admin/report" exact />
        <Redirect from="*" exact={true} to="/login" />
        <Redirect from="/" exact={true} to="/login" />
      </Switch>
    </Suspense>
  );
};
