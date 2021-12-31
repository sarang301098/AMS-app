/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Languages from "../../i18n/Languages";
import { logout } from "../../store/userStore/user.action.creators";
import RootState from "../../store/types";
import { getHeaderNotificationsAction, markAsReadNotificationAction } from "../../store/notificationStore/notification.action.async";
import { INotificationPayload } from "../../store/notificationStore/types";
import { Dropdown } from "react-bootstrap";
import ModalView from "../Modals/ModalView";
import moment from "moment";
import {
  getAdminHeaderNotificationsAction,
  markAsReadAdminNotificationAction,
} from "../../store/adminNotificationStore/admin.notification.action.async";
import { IAdminNotificationPayload } from "../../store/adminNotificationStore/types";
import Logo from "../../assets/img/peerbits-logo.png";

export default function Header() {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const { totalNotifications, totalNotificationCountTotal, unvisitedCount } =
    useSelector((state: RootState) => state.notification.headerNotifications);

  const adminNotification = useSelector(
    (state: RootState) =>
      state.adminNotification.headerNotifications.totalNotifications
  );

  const adminUnvisitedCount = useSelector(
    (state: RootState) =>
      state.adminNotification.headerNotifications.unvisitedCount
  );

  const userData = useSelector((state: RootState) => state.user.userData);
  const userRoute = userData && userData.type === "user" ? "" : "/admin";
  const [userNotifications, setUserNotifications] = useState<
    INotificationPayload[]
  >([]);
  const [adminNotifications, setAdminNotifications] = useState<
    IAdminNotificationPayload[]
  >([]);

  useEffect(() => {
    userData && userData.type === "user"
      ? dispatch(getHeaderNotificationsAction(userData._id))
      : dispatch(getAdminHeaderNotificationsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unvisitedCount]);

  useEffect(() => {
    if (totalNotifications && userData.type === "user") {
      setUserNotifications(totalNotifications);
    } else if (adminNotification && userData.type === "super_admin") {
      setAdminNotifications(adminNotification);
    }
  }, [
    adminNotification,
    adminNotifications.length,
    dispatch,
    totalNotifications,
    userData.type,
    userNotifications.length,
    totalNotificationCountTotal,
    unvisitedCount,
    adminUnvisitedCount,
  ]);

  const notifications =
    userData.type === "user" ? userNotifications : adminNotifications;

  const notificationsCount =
    userData.type === "user" ? unvisitedCount : adminUnvisitedCount;

  const { t } = useTranslation();
  const [showModalView, setShowModalView] = useState(false);
  const [modalViewDetails, setModalViewDetails] = useState({});
  const logoutHandler = () => {
    dispatch(logout());
    push("/login");
  };
  return (
    <div>
      <ModalView
        viewDetails={{ ...modalViewDetails, title: "Notification" }}
        show={showModalView}
        hideModal={() => setShowModalView(false)}
      />
      <nav className="top-toolbar navbar navbar-mobile navbar-tablet">
        <ul className="navbar-nav nav-left">
          <li className="nav-item">
            <Link to="/" data-toggle-state="aside-left-open">
              <i className="icon dripicons-align-left"></i>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav nav-left site-logo">
          <li>
            <Link to="/">
              <div className="logo-custom"></div>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav nav-right">
          <li className="nav-item">
            <Link to="/" data-toggle-state="mobile-topbar-toggle">
              <i className="icon dripicons-dots-3 rotate-90"></i>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="top-toolbar navbar navbar-desktop flex-nowrap z-index">
        <ul className="site-logo d-none d-lg-inline-block">
          <li>
            <Link to="/">
              <div className="logo-custom"></div>
              <img
                src={Logo}
                alt="Logo"
                style={{
                  width: "100px",
                  marginLeft: "25px",
                  marginTop: "10px",
                }}
              />
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav m-lg-auto">
          {userData && userData.type === "user" ? (
            <>
              <li className="nav-item nav-text d-none d-lg-block">
                <Link to="/dashboard">
                  <span> {t("dashboard")}</span>
                </Link>
              </li>
              <li className="nav-item nav-text d-none d-lg-block">
                <Link to="/requests">
                  <span> {t("requests")}</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item nav-text d-none d-lg-block">
                <Link to="/admin/dashboard">
                  <span> {t("dashboard")}</span>
                </Link>
              </li>
              <li className="nav-item nav-text d-none d-lg-block">
                <Link to="/admin/purchases">
                  <span>{t("purchases")}</span>
                </Link>
              </li>
              <li className="nav-item nav-text d-none d-lg-block">
                <Link to="/admin/brands">
                  <span>{t("brands")}</span>
                </Link>
              </li>
              <li className="nav-item nav-text d-none d-lg-block">
                <Link to="/admin/models">
                  <span>{t("models")}</span>
                </Link>
              </li>
              <li className="nav-item nav-text d-none d-lg-block">
                <Link to="/admin/requests">
                  <span>{t("requests")}</span>
                </Link>
              </li>
              <li className="nav-item nav-text d-none d-lg-block">
                <Link to="/admin/user">
                  <span>{t("users")}</span>
                </Link>
              </li>
              <li className="nav-item nav-text d-none d-lg-block">
                <Link to="/admin/report">
                  <span>Report</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav">
          <Languages />
          <li className="nav-item dropdown dropdown-notifications dropdown-menu-lg">
            <Dropdown align="end" className="btn-group">
              <Dropdown.Toggle
                id="dropdown-basic"
                className="btn btn-sm btn-icon-only"
              >
                <i
                  className="icon dripicons-bell"
                  style={{ margin: "0!important" }}
                ></i>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{
                    display: notificationsCount !== 0 ? "block" : "none",
                  }}
                >
                  {notificationsCount}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ marginTop: ".7rem" }}>
                <p
                  style={{
                    margin: "5px 15px 10px",
                    fontSize: "20px",
                    color: "#000",
                  }}
                >
                  Notifications
                </p>
                <Dropdown.Divider />
                {notifications && notifications.length > 0 ? (
                  notifications.map((notification: INotificationPayload) => (
                    <Dropdown.Item
                      style={{
                        color:
                          notification && notification.isRead
                            ? "#617182"
                            : "#212529",
                        whiteSpace: "pre-wrap",
                      }}
                      className="default-color"
                      onClick={async () => {
                        setShowModalView(true);
                        setModalViewDetails(notification);
                        if (
                          notification.isRead === false &&
                          userData.type === "super_admin"
                        ) {
                          await dispatch(
                            markAsReadAdminNotificationAction([
                              notification._id,
                            ])
                          );
                          dispatch(getAdminHeaderNotificationsAction());
                        } else if (
                          notification.isRead === false &&
                          userData.type === "user"
                        ) {
                          await dispatch(
                            markAsReadNotificationAction([notification._id])
                          );
                          dispatch(getHeaderNotificationsAction(userData._id));
                        }
                      }}
                      key={notification._id}
                    >
                      <span
                        style={{
                          height: "10px",
                          backgroundColor: "#f7b500",
                          width: "10px",
                          borderRadius: "50%",
                          display:
                            notification && notification.isRead
                              ? "none"
                              : "inline-block",
                          position: "relative",
                          left: "-10px",
                        }}
                      ></span>
                      {notification.description}. <br />
                      <small className="text-muted">
                        {moment(notification.createdAt).format(
                          "DD-MM-YYYY hh:mm"
                        )}
                      </small>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item className="text-center">
                    No Notifications
                  </Dropdown.Item>
                )}
                <Dropdown.Divider />
                <Dropdown.Item
                  as={Link}
                  to={
                    userData && userData.type === "user"
                      ? "/notifications"
                      : "/admin/notifications"
                  }
                  className="text-center"
                >
                  {t("viewAll")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item dropdown mr-3">
            <Dropdown
              align="end"
              className="btn-group"
              style={{ marginTop: ".46rem" }}
            >
              <Dropdown.Toggle id="dropdown-basic" style={{ margin: 0 }}>
                <Avatar
                  name={userData ? userData.username : ""}
                  size="40"
                  round={true}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{ marginTop: ".8rem", padding: "15px 10 px" }}
              >
                <div
                  className="media d-user "
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  <Avatar
                    name={userData ? userData.username : ""}
                    size="40"
                    round={true}
                  />
                  <div className="media-body ms-2">
                    <h5 className="mt-0 mb-0">
                      {userData ? userData.username : ""}
                    </h5>
                    <span>{userData ? userData.email : ""}</span>
                  </div>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to={`${userRoute}/profile/overview`}>
                  <i className="icon dripicons-user"></i>
                  {t("myProfile")}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={`${userRoute}/change-password`}>
                  <i className="icon dripicons-gear"></i> {t("changePassword")}
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler}>
                  <i className="icon dripicons-lock"></i>
                  {t("logout")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </div>
  );
}
