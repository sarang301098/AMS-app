import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { toast } from "react-toastify";
import * as actionCreator from "./userData.action.creators";
import * as requestFromServer from "../../services/user";
import { addUserData } from "./types";
const notifyError = (error: string) => toast.error(error, { theme: "colored" });
const notifySuccess = (msg: string) => toast.success(msg, { theme: "colored" });

/**
 * get user data thunk
 * @param page
 * @param perPage
 * @param name
 * @returns
 */
const getUserDataAction = (
  page: number,
  perPage: number,
  name: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.userPending());

    requestFromServer
      .getAllUser(page, perPage, name)
      .then((response) => {
        dispatch(actionCreator.userSuccess(response.data));
      })
      .catch((error) => {
        dispatch(actionCreator.userFailed());
      });
  };
};

/**
 * add new user thunk
 * @param values
 * @returns
 */
const addUserDataAction = (
  values: addUserData
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.addUserPending());

    requestFromServer
      .addNewUser(values)
      .then((response) => {
        dispatch(actionCreator.addUserSuccess());
        notifySuccess("User added successfully.");
      })
      .catch((error) => {
        dispatch(actionCreator.addUserFailed());
        if (error.response && error.response.data) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Something went wrong.");
        }
      });
  };
};
export { getUserDataAction, addUserDataAction };
