import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as actionCreator from "./request.action.creators";
import * as requestFromServer from "../../services/request";
import { ReqInitialValues } from "./types";
import { toast } from "react-toastify";
const notifyError = (error: string) => toast.error(error, { theme: "colored" });
const notifySuccess = (msg: string) => toast.success(msg, { theme: "colored" });

/**
 * get requests api call thunk
 * @param skip
 * @param limit
 * @returns
 */
const getRequestsAction = (
  page: number,
  perPage: number,
  status: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.requestPending());
    return requestFromServer
      .getAllRequest(page, perPage, status)
      .then((res) => {
        dispatch(actionCreator.requestSuccess(res.data));
      })
      .catch(() => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.requestFailed());
      });
  };
};

/**
 * make request api call thunk
 * @param values
 * @returns
 */
const newRequestAction = (
  redirect: Function,
  values: ReqInitialValues
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.newRequestPending());
    return requestFromServer
      .makeNewRequest(values)
      .then(async(res) => {
        await dispatch(actionCreator.newRequestSuccess(res.data));
        // dispatch(addNewNotification(res.data.newNotification))
        redirect();
        notifySuccess("Request created successfully!");
      })
      .catch((error) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.newRequestFailed(error));
      });
  };
};

/**
 * get single request api call thunk
 * @param id
 * @returns
 */
const getSingleRequestAction = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.getSingleRequestPending());
    return requestFromServer
      .getSingleRequest(id)
      .then((res) => {
        dispatch(actionCreator.getSingleRequestSuccess(res.data));
      })
      .catch((error) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.getSingleRequestFailed(error));
      });
  };
};

/**
 * update request api call thunk
 * @param id
 * @param redirect
 * @param values
 * @returns
 */
const updateRequestAction = (
  id: string,
  redirect: Function,
  values: ReqInitialValues
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.updateRequestPending());
    return requestFromServer
      .updateRequest(id, values)
      .then((res) => {
        dispatch(actionCreator.updateRequestSuccess(res.data));
        redirect();
        notifySuccess("Request updated successfully!");
      })
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.updateRequestFailed());
      });
  };
};

/**
 * delete api call thunk
 * @param id
 * @returns
 */
const deleteRequestAction = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.deleteRequestPending());
    return requestFromServer
      .deleteRequest(id)
      .then((res) => {
        notifySuccess("Request deleted successfully!");
        dispatch(actionCreator.deleteRequestSuccess());
      })
      .catch(() => {
        notifyError("You can not delete request!");
        dispatch(actionCreator.deleteRequestFailed());
      });
  };
};

export {
  getRequestsAction,
  newRequestAction,
  getSingleRequestAction,
  updateRequestAction,
  deleteRequestAction,
};
