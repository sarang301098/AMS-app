import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as actionCreator from "./admin.notification.action.creators";
import * as notifications from "../../services/adminNotification";
import { toast } from "react-toastify";

const notifyError = (error: string) => toast.error(error, { theme: "colored" });

/**
 * get admin notifications api thunk
 * @param page 
 * @param perPage 
 * @param filter 
 * @param sort 
 * @param sortBy 
 * @returns 
 */
const getAdminNotificationsAction = (
  page: number,
  perPage: number,
  filter:string,
  sort?: string,
  sortBy?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.getAdminNotificationsPending());
    return notifications
      .getAdminNotifications(page, perPage, filter, sort, sortBy)
      .then((res) => {
        dispatch(actionCreator.getAdminNotificationsSuccess(res.data));
      })
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.getAdminNotificationsFailed(err));
      });
  };
};

/**
 * mark as read admin notification api thunk
 * @param ids 
 * @returns 
 */
const markAsReadAdminNotificationAction = (
  ids: string[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.readAdminNotificationPending());
    return notifications
      .markAsReadAdminNotifications(ids)
      .then(() => dispatch(actionCreator.readAdminNotificationsSuccess()))
      .catch(() => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.readAdminNotificationFailed());
      });
  };
};

/**
 * delete single admin notificaions api thunk
 * @param id 
 * @returns 
 */
const deleteSingleAdminNotificationsAction = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.deleteAdminNotificationPending());
    return notifications
      .deleteSingleAdminNotification(id)
      .then(() => dispatch(actionCreator.deleteAdminNotificationSuccess()))
      .catch(() => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.deleteAdminNotificationFailed());
      });
  };
};

/**
 * delete multiple admin notifications api thunk
 * @param ids 
 * @returns 
 */
const deleteMultipleAdminNotificationsAction = (
  ids: string[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.deleteAdminNotificationPending());
    return notifications
      .deleteMultipleNotifications(ids)
      .then(() => {
        dispatch(actionCreator.deleteAdminNotificationSuccess());
      })
      .catch(() => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.deleteAdminNotificationFailed());
      });
  };
};

/**
 * get admin header notification api thunk
 * @param sort 
 * @param sortBy 
 * @returns 
 */
const getAdminHeaderNotificationsAction = (
  sort?: string,
  sortBy?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    return notifications
      .getAdminNotifications(1, 5, "all", sort, sortBy)
      .then((res) => {
        dispatch(actionCreator.getAdminHeaderNotificationsSuccess(res.data));
      })
      .catch(() => {
        notifyError("Something went wrong.");
      });
  };
};

export {
  getAdminNotificationsAction,
  markAsReadAdminNotificationAction,
  deleteSingleAdminNotificationsAction,
  deleteMultipleAdminNotificationsAction,
  getAdminHeaderNotificationsAction
};
