import { action } from "typesafe-actions";
import actionTypes from "./action.enum";
import { IUserPayload } from "./types";

/**
 * pending action creator
 * @returns
 */
const authPending = () => action(actionTypes.AUTH_PENDING);

/**
 * success action creator
 * @returns
 */
const authSuccess = () => action(actionTypes.AUTH_SUCCESS);

/**
 * login actions creator
 * @param userParams
 * @returns
 */
const loginSuccess = (userParams: IUserPayload) =>
  action(actionTypes.LOGIN_SUCCESS, userParams);

/**
 * register actions creator
 * @param userParams
 * @returns
 */
const registerSuccess = () => action(actionTypes.REGISTER_SUCCESS);

/**
 * forgot password actions creator
 * @param userParams
 * @returns
 */

const forgotPasswordSuccess = () => action(actionTypes.FORGOT_PASSWORD_SUCCESS);

/**
 * error action creator
 * @param error
 * @returns
 */
const authError = (error: string | null) =>
  action(actionTypes.AUTH_ERROR, { error });

/**
 * full fill user data action
 * @param user
 * @returns
 */
const fulfillUserData = (user: object | undefined | null) =>
  action(actionTypes.USER_LOADED, user);

/**
 * logout action
 */
const logout = () => {
  return action(actionTypes.LOGOUT);
};

/**
 * clear register success action
 * @returns
 */
const clearSuccess = () => {
  return action(actionTypes.CLEAR_SUCCESS);
};

/**
 * reset password success action
 * @returns
 */
const resetPasswordSuccess = () => action(actionTypes.RESET_PASSWORD_SUCCESS);

/**
 * change password success action
 * @returns
 */
const changePasswordSuccess = () => action(actionTypes.CHANGE_PASSWORD_SUCCESS);

export {
  authPending,
  authSuccess,
  loginSuccess,
  registerSuccess,
  forgotPasswordSuccess,
  authError,
  fulfillUserData,
  logout,
  clearSuccess,
  resetPasswordSuccess,
  changePasswordSuccess,
};
