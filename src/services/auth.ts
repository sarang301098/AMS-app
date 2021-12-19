import { API } from "../middlewares/middleware";
import {
  loginPayloadData,
  registerPayloadData,
  forgotPasswordPayloadData,
  resetPasswordPayloadData,
  changePasswordPayloadData,
} from "../store/userStore/types";

/**
 * login api call
 * @param values
 * @returns
 */
export const authLogin = (values: loginPayloadData): Promise<any> => {
  return API.post("/auth/login", values);
};

/**
 * register api call
 * @param values
 * @returns
 */
export const authRegister = (values: registerPayloadData): Promise<any> => {
  return API.post("/users/", values);
};

/**
 *forgot password api call
 * @param values
 * @returns
 */
export const authForgotPassword = (
  values: forgotPasswordPayloadData
): Promise<any> => {
  return API.post("/users/forget-password", values);
};

/**
 * get user data api call
 */
export const getUserDataByToken = (): Promise<any> => {
  return API.get("/users/me");
};

/**
 * reset password api call
 * @param values
 * @returns
 */
export const authRestPassword = (
  values: resetPasswordPayloadData
): Promise<any> => {
  return API.post("/users/update-password", values);
};
/**
 * change password api call
 * @param values
 * @returns
 */
export const authChangePassword = (
  values: changePasswordPayloadData
): Promise<any> => {
  return API.patch("/users/change-password", values);
};
