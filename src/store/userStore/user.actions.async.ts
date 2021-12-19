import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { toast } from "react-toastify";
import {
  authPending,
  loginSuccess,
  forgotPasswordSuccess,
  registerSuccess,
  resetPasswordSuccess,
  authSuccess,
  changePasswordSuccess,
} from "./user.action.creators";
import * as requestFromServer from "../../services/auth";
import {
  loginPayloadData,
  registerPayloadData,
  forgotPasswordPayloadData,
  resetPasswordPayloadData,
  changePasswordPayloadData,
} from "./types";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

const notifyError = (error: string) => toast.error(error);

/**
 * user login api call thunk
 * @param email
 * @param password
 */
export const LoginAction = (
  values: loginPayloadData
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authPending());

    requestFromServer
      .authLogin(values)
      .then((response) => {
        dispatch(loginSuccess({ token: response.data.access_token }));
      })
      .catch((error) => {
        dispatch(authSuccess());
        if (error.response && error.response.data) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Something went wrong.");
        }
      });
  };
};
/**
 * user register api call thunk
 * @param values
 * @returns
 */
export const RegisterAction = (
  values: registerPayloadData
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authPending());

    requestFromServer
      .authRegister(values)
      .then((response) => {
        dispatch(registerSuccess());
      })
      .catch((error) => {
        dispatch(authSuccess());
        if (error.response && error.response.data) {
          notifyError(error.response.data.message);
        } else {
          notifyError(" Something went wrong.");
        }
      });
  };
};

/**
 * user forgot password api call thunk
 * @param values
 * @returns
 */
export const ForgotPasswordAction = (
  values: forgotPasswordPayloadData
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authPending());

    requestFromServer
      .authForgotPassword(values)
      .then((response) => {
        dispatch(forgotPasswordSuccess());
      })
      .catch((error) => {
        dispatch(authSuccess());
        if (error.response && error.response.data) {
          notifyError(error.response.data.message);
        } else {
          notifyError(" Something went wrong.");
        }
      });
  };
};

/**
 * reset password api thunk
 */
export const ResetPasswordAction = (
  values: resetPasswordPayloadData
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authPending());

    requestFromServer
      .authRestPassword(values)
      .then((response) => {
        dispatch(resetPasswordSuccess());
      })
      .catch((error) => {
        dispatch(authSuccess());
        if (error.response && error.response.data) {
          notifyError(error.response.data.message);
        } else {
          notifyError(" Something went wrong.");
        }
      });
  };
};

/**
 * change password api thunk
 */
export const ChangePasswordAction = (
  values: changePasswordPayloadData
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authPending());

    requestFromServer
      .authChangePassword(values)
      .then((response) => {
        dispatch(changePasswordSuccess());
      })
      .catch((error) => {
        dispatch(authSuccess());
        if (error.response && error.response.data) {
          notifyError(error.response.data.message);
        } else {
          notifyError(" Something went wrong.");
        }
      });
  };
};
