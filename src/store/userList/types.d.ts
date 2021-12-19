import { ActionType } from "typesafe-actions";
import * as actions from "./userData.action.creators";

type IUserDataState = {
  loading: boolean;
  userData: {
    totalUsersCount: number;
    totalUsers: any;
  };
  error: string;
};

type UserDataPayload = {
  userData: {
    totalUsersCount: number;
    totalUsers: any;
  };
};

type addUserData = {
  email: string;
  password: string;
  type: string;
};

type IUserDataActionTypes = ActionType<typeof actions>;

export { IUserDataState, UserDataPayload, IUserDataActionTypes, addUserData };
