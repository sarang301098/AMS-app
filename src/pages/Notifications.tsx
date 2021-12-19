import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import NotificationItems from "../components/Pagination/NotificationItems";
import Pagination from "../components/Pagination/Pagination";
import { getNotificationsAction } from "../store/notificationStore/notification.action.async";
import RootState from "../store/types";

const pageCount = 1;

const Notifications: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const userData = useSelector((state: RootState) => state.user.userData);
  const { totalNotificationCountTotal } = useSelector(
    (state: RootState) => state.notification.notifications
  );
  const headerUnvisitedCount = useSelector((state:RootState) => state.notification.headerNotifications.unvisitedCount)

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage, headerUnvisitedCount]);
  const fetchNotifications = (page?: number) =>
    dispatch(
      getNotificationsAction(
        userData._id,
        page || pageCount,
        itemsPerPage,
        filter
      )
    );
  return (
    <div id="app">
      <ToastContainer />
      <div className="content" style={{ width: "100%" }}>
        <div className="content-wrapper">
          <header className="page-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h1>{t("notifications")}</h1>
              </div>
            </div>
          </header>
          <section className="page-content container-fluid ">
            <div className="card card-tabs notifications clearfix">
              <div className="card-body p-0">
                <div className="tab-content">
                  <div className="tab-pane fadeIn active">
                    <Pagination
                      pageCount={totalNotificationCountTotal || pageCount}
                      itemsPerPage={itemsPerPage}
                      ItemsComponent={NotificationItems}
                      dispatchAction={fetchNotifications}
                      setFilter={setFilter}
                      filter={filter}
                      setItemsPerPage={setItemsPerPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
