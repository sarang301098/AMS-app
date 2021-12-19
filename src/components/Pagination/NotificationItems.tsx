import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { Dropdown } from "react-bootstrap";
import moment from "moment";

import {
  deleteMultipleNotificationsAction,
  deleteSingleNotificationsAction,
  getHeaderNotificationsAction,
  getNotificationsAction,
  markAsReadNotificationAction,
} from "../../store/notificationStore/notification.action.async";
import RootState from "../../store/types";
import ModalDelete from "../Modals/ModalDelete";
import ModalView from "../Modals/ModalView";
import { INotificationPayload } from "../../store/notificationStore/types";

interface Prop {
  filter: string;
  setFilter: Function;
  setItemsPerPage: Function;
  itemsPerPage: number;
  page: number;
}
const NotificationItems: React.FC<Prop> = ({
  filter,
  setFilter,
  page,
  setItemsPerPage,
  itemsPerPage,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userId = useSelector((state: RootState) => state.user.userData._id);
  const loading = useSelector((state: RootState) => state.notification.loading);

  const { totalNotifications, totalNotificationCountTotal } = useSelector(
    (state: RootState) => state.notification.notifications
  );
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [notificationId, setNotificationId] = useState("");
  const [modalViewDetails, setModalViewDetails] = useState({});
  const [notifications, setNotifications] =
  useState<INotificationPayload[]>(totalNotifications);

  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (
      totalNotifications &&
      totalNotifications.length === 0 &&
      totalNotificationCountTotal > 0
    ) {
      dispatch(getNotificationsAction(userId, 1, itemsPerPage || 10, filter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, totalNotificationCountTotal]);

  useEffect(() => {
    if(totalNotifications && totalNotifications.length > 0) {
      setNotifications(totalNotifications)
    }
  }, [totalNotifications])

  // const check = (id: string) => {
  //   const elem = document.getElementById(id) as HTMLInputElement;
  //   elem.checked = !elem.checked;
  //   const selectedNotification = [...selectedNotifications];
  //   if (!selectedNotification.includes(id)) {
  //     selectedNotification.push(id);
  //   } else {
  //     selectedNotification.splice(selectedNotifications.indexOf(id), 1);
  //   }
  //   setSelectedNotifications(selectedNotification);
  // };

  const handleSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    dispatch(
      getNotificationsAction(userId, page || 1, itemsPerPage || 10, filter)
    );
  };

  const handleMultiDelete = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    await dispatch(deleteMultipleNotificationsAction(selectedNotifications));
    if (
      !(
        totalNotifications &&
        totalNotifications.length === 0 &&
        totalNotificationCountTotal > 0
      )
    ) {
      await dispatch(
        getNotificationsAction(
          userId,
          itemsPerPage === 1 ? page - 1 : page,
          itemsPerPage || 10,
          filter
        )
      );
    }
    setSelectedNotifications([]);
    await dispatch(getHeaderNotificationsAction(userId));
  };

  const handleSingleDelete = async () => {
    await dispatch(deleteSingleNotificationsAction(notificationId));
    if (
      !(
        totalNotifications &&
        totalNotifications.length === 0 &&
        totalNotificationCountTotal > 0
      )
    ) {
      await dispatch(
        getNotificationsAction(
          userId,
          itemsPerPage === 1 ? 1 : page,
          itemsPerPage || 10,
          filter
        )
      );
    }
    dispatch(getHeaderNotificationsAction(userId));
    setSelectedNotifications([]);
  };

  const showDeleteModal = (itemId: string) => {
    setShowModalDelete(true);
    setNotificationId(() => itemId);
  };

  const markAsReadHandler = async () => {
    await dispatch(markAsReadNotificationAction(selectedNotifications));
    await dispatch(
      getNotificationsAction(userId, page || 1, itemsPerPage || 10, filter)
    );
    dispatch(getHeaderNotificationsAction(userId));

    setSelectedNotifications([]);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (id === "selectAll") {
      const tempUser =
        notifications &&
        notifications.map((notification) => {
          return { ...notification, isChecked: checked };
        });
      let checkedNotifications:string[];
      if(checked === true){
        checkedNotifications =
        notifications &&
        notifications.map((notifications) => notifications._id);
      } else {
        checkedNotifications=[]
      }
      console.log(checkedNotifications);
      setNotifications(tempUser);
      setSelectedNotifications(checkedNotifications);
      
    } else {
      const temp = notifications && [...notifications];
      const selectedNotification = [...selectedNotifications];
      if (!selectedNotification.includes(id) && checked === true) {
        selectedNotification.push(id);
      } else {
        selectedNotification.splice(selectedNotifications.indexOf(id), 1);
      }
      const tempUser = temp.map((notification) =>
        notification._id === id
          ? { ...notification, isChecked: checked }
          : notification
      );
      setSelectedNotifications(selectedNotification);
      console.log(selectedNotification)
      setNotifications(tempUser);
    }
  };

  return (
    <>
      <ModalView
        viewDetails={{ ...modalViewDetails, title: "Notification" }}
        show={showModalView}
        hideModal={() => setShowModalView(false)}
      />
      <ModalDelete
        show={showModalDelete}
        hideModal={() => setShowModalDelete(false)}
        deleteAction={handleSingleDelete}
      />
      <ToastContainer />
      <div className="card-header clearfix">
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            padding: "0.8rem",
            width: "100% !important",
            justifyContent: "end",
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <label style={{ fontSize: "1rem" }}>{t("Page Limit")}: </label>
            &nbsp;
            <select
              onChange={(e) => {setItemsPerPage(Number(e.target.value)); setSelectedNotifications([])}}
              defaultValue={10}
              className="custom-select form-control select2 w-150"
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="m-l-10 m-r-15">
              <select
                defaultValue={filter}
                className="custom-select form-control select2"
                onChange={(e) => {setFilter(e.target.value); setSelectedNotifications([])}}
                style={{ width: "115%" }}
              >
                <option value="all">{t("all")}</option>
                <option value="yes">{t("read")}</option>
                <option value="no">{t("unread")}</option>
              </select>
            </div>
            <div className="m-l-10">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-success"
              >
                {t("submit")}
              </button>
            </div>
            <div className="m-l-10">
              <button
                type="button"
                disabled={!(selectedNotifications.length > 0)}
                onClick={markAsReadHandler}
                className="btn btn-secondary"
              >
                {t("markRead")}
              </button>
            </div>
            <div className="m-l-10">
              <button
                type="button"
                disabled={!(selectedNotifications.length > 0)}
                onClick={handleMultiDelete}
                className="btn btn-danger"
              >
                {t("remove")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="table-responsive"
        style={{ minHeight: `calc(100vh - 300px)`, overflowX: "unset" }}
      >
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th style={{ width: "2%" }}></th>
              <th style={{ width: "5%" }}>
              <label
                  className="control control-outline control-primary control--checkbox m-0"
                  htmlFor={"selectAll"}
                >
                  <input
                    type="checkbox"
                    id="selectAll"
                    onChange={(e) => handleCheck(e)}
                    checked={
                      notifications.length > 0 ? notifications.filter(
                        (notification) => notification.isChecked === true
                      ).length === notifications.length : false
                    }
                  />
                  <div className="control__indicator"></div>
                </label>
              </th>
              <th style={{ width: "50%" }}>{t("description")}</th>
              <th>{t("dateTime")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <ScaleLoader color="#F7B500" loading={loading} />
                </td>
              </tr>
            ) : totalNotifications && totalNotifications.length > 0 ? (
              notifications.map((elementInArray, index) => (
                <tr
                  key={elementInArray._id}
                  style={{
                    color: elementInArray.isRead ? "inherit" : "#212529",
                  }}
                >
                  <td>
                    <div
                      style={{
                        height: "10px",
                        backgroundColor: "#f7b500",
                        width: "10px",
                        borderRadius: "50%",
                        display: elementInArray.isRead ? "none" : "block",
                      }}
                    ></div>
                  </td>
                  <td>
                    <label
                      className="control control-outline control-primary control--checkbox m-0"
                      htmlFor={elementInArray._id}
                    >
                      <input
                        type="checkbox"
                        id={elementInArray._id}
                        onChange={(e) => handleCheck(e)}
                        checked={elementInArray.isChecked || false}
                      />
                      <div className="control__indicator"></div>
                    </label>
                  </td>
                  <td className="font-weight-500">
                    {elementInArray.description}
                  </td>
                  <td className="font-weight-500">
                    {" "}
                    {moment(elementInArray.createdAt).format(
                      "DD/MM/YYYY hh:mm"
                    )}
                  </td>
                  <td>
                    <Dropdown align="end" className="btn-group">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btn btn-sm btn-icon-only"
                      >
                        <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="w-150"
                        style={{ height: "126px" }}
                      >
                        <Dropdown.Item
                          onClick={() => {
                            setShowModalView(true);
                            setModalViewDetails(elementInArray);
                          }}
                        >
                          <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                          {t("view")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => showDeleteModal(elementInArray._id)}
                        >
                          <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                          {t("delete")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No notifications available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NotificationItems;
