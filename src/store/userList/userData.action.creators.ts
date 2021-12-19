import { action } from "typesafe-actions";
import actionTypes from "./action.enum";
import { UserDataPayload } from "./types";

/**
 * get all user data loading action
 * @returns
 */
const userPending = () => action(actionTypes.GET_USER_PENDING);

/**
 * get user data success sction
 * @param payload
 * @returns
 */
const userSuccess = (payload: UserDataPayload[]) =>
  action(actionTypes.GET_USER_SUCCESS, payload);

/**
 * get users data failed action
 * @returns
 */
const userFailed = () => action(actionTypes.GET_USER_FAILED);

/**
 * add new user loading action
 * @returns
 */
const addUserPending = () => action(actionTypes.ADD_USER_PENDING);

/**
 * add new user success action
 * @returns
 */
const addUserSuccess = () => action(actionTypes.ADD_USER_SUCCESS);

/**
 * add new user failed action
 * @returns
 */
const addUserFailed = () => action(actionTypes.ADD_USER_FAILED);

export {
  userPending,
  userSuccess,
  userFailed,
  addUserPending,
  addUserSuccess,
  addUserFailed,
};
