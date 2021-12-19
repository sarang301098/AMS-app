import { ActionType } from "typesafe-actions";
import * as actions from "./user.action.creators";

type IUserState = {
  userData: Object<any> | null;
  loading: boolean;
  isLoggedIn: boolean;
  errorMessage: string | null;
  token: string | null;
  success: boolean;
};

type IUserPayload = Partial<{
  errorMessage: string | null;
  userData: Object<any> | null;
  token: string | null;
}>;

type loginPayloadData = {
  email: string;
  password: string;
};

type registerPayloadData = {
  username: string;
  email: string;
  password: string;
  type: string;
};

type forgotPasswordPayloadData = {
  email: string;
};

type resetPasswordPayloadData = {
  email: string | null;
  token: string | null;
  newPassword: string;
};

type changePasswordPayloadData = {
  oldPassword: string;
  newPassword: string;
};

type IUserActionType = ActionType<typeof actions>;
export {
  IUserState,
  IUserActionType,
  IUserPayload,
  loginPayloadData,
  registerPayloadData,
  forgotPasswordPayloadData,
  resetPasswordPayloadData,
  changePasswordPayloadData,
};
