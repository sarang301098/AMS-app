import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as actionCreator from "./notification.action.creators";
import * as notifications from "../../services/notification";
import { toast } from "react-toastify";

const notifyError = (error: string) => toast.error(error, { theme: "colored" });

/**
 * get notifications api call thunk
 * @param userId
 * @param page
 * @param perPage
 * @param isRead
 * @param sort
 * @param sortBy
 * @returns
 */
const getNotificationsAction = (
  userId: string,
  page: number,
  perPage: number,
  isRead: string,
  sort?: string,
  sortBy?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.getNotificationsPending());
    return notifications
      .getNotifications(userId, page, perPage, isRead, sort, sortBy)
      .then((res) => {
        dispatch(actionCreator.getNotificationsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actionCreator.getNotificationsFailed(err));
      });
  };
};

/**
 * delete multiple notifications api call thunk
 * @param ids
 * @returns
 */
const deleteMultipleNotificationsAction = (
  ids: string[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.deleteNotificationsPending());
    return notifications
      .deleteMultipleNotifications(ids)
      .then((res) => {
        dispatch(actionCreator.deleteNotificationsSuccess(res.data));
      })
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.deleteNotificationsFailed(err));
      });
  };
};

/**
 * delete single notification api call thunk
 * @param id
 * @returns
 */
const deleteSingleNotificationsAction = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.deleteNotificationsPending());
    return notifications
      .deleteSingleNotification(id)
      .then((res) =>
        dispatch(actionCreator.deleteNotificationsSuccess(res.data))
      )
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.deleteNotificationsFailed(err));
      });
  };
};

/**
 * mark as read notification api call thunk
 * @param ids
 * @param payload
 * @returns
 */
const markAsReadNotificationAction = (
  ids: string[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.readNotificationsPending());
    return notifications
      .markAsReadNotifications(ids)
      .then((payload) =>
        dispatch(actionCreator.readNotificationsSuccess(payload))
      )
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.readNotificationsFailed(err));
      });
  };
};

/**
 * get header notification api thunk
 * @param userId 
 * @param sort 
 * @param sortBy 
 * @returns 
 */
const getHeaderNotificationsAction = (
  userId: string,
  sort?: string,
  sortBy?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    return notifications
      .getNotifications(userId, 1, 5, "all", sort, sortBy)
      .then((res) => {
        dispatch(actionCreator.getHeaderNotificationsSuccess(res.data));
      })
      .catch(() => {
        notifyError("Something went wrong")
      });
  };
};

export {
  getNotificationsAction,
  getHeaderNotificationsAction,
  deleteMultipleNotificationsAction,
  deleteSingleNotificationsAction,
  markAsReadNotificationAction,
};
