import { action } from "typesafe-actions";
import actionTypes from "./action.enum";
import { RequestPayload } from "./types";

/**
 * getAllRequests action creator
 * @returns
 */
const requestPending = () => action(actionTypes.GET_REQUEST_PENDING);
const requestSuccess = (payload: RequestPayload[]) =>
  action(actionTypes.GET_REQUEST_SUCCESS, payload);
const requestFailed = () => action(actionTypes.GET_REQUEST_FAILED);

/**
 *  makeNewRequestPending action creator
 * @returns
 */
const newRequestPending = () => action(actionTypes.NEW_REQUEST_PENDING);

/**
 * makeNewRequestSuccess action creator
 * @param payload
 * @returns
 */
const newRequestSuccess = (payload: object) =>
  action(actionTypes.NEW_REQUEST_SUCCESS, payload);

/**
 * makeNewRequestFailed action creator
 * @param payload
 * @returns
 */
const newRequestFailed = (payload: object) =>
  action(actionTypes.NEW_REQUEST_FAILED, payload);

/**
 * getSingleRequestPending action creator
 * @returns
 */
const getSingleRequestPending = () =>
  action(actionTypes.GET_SINGLE_REQUEST_PENDING);

/**
 * getSingleRequestFailed action creator
 * @param payload
 * @returns
 */
const getSingleRequestFailed = (payload: RequestPayload) =>
  action(actionTypes.GET_SINGLE_REQUEST_FAILED, payload);

/**
 * getSingleRequestSuccess action creator
 * @param payload
 * @returns
 */
const getSingleRequestSuccess = (payload: object) =>
  action(actionTypes.GET_SINGLE_REQUEST_SUCCESS, payload);

/**
 * updateRequestPending action creator
 * @returns
 */
const updateRequestPending = () => action(actionTypes.UPDATE_REQUEST_PENDING);

/**
 * updateRequestSuccess action creator
 * @param payload
 * @returns
 */
const updateRequestSuccess = (payload: RequestPayload) =>
  action(actionTypes.UPDATE_REQUEST_SUCCESS, payload);

/**
 * updateRequestFailed action creator
 * @returns
 */
const updateRequestFailed = () => action(actionTypes.UPDATE_REQUEST_FAILED);

/**
 * deleteRequestPending action creator
 * @returns
 */
const deleteRequestPending = () => action(actionTypes.DELETE_REQUEST_PENDING);

/**
 * deleteRequestSuccess action creator
 * @returns
 */
const deleteRequestSuccess = () => action(actionTypes.DELETE_REQUEST_SUCCESS);

/**
 * deleteRequestFailed action creator
 * @returns
 */
const deleteRequestFailed = () => action(actionTypes.DELETE_REQUEST_FAILED);

export {
  requestPending,
  requestSuccess,
  requestFailed,
  newRequestPending,
  newRequestSuccess,
  newRequestFailed,
  getSingleRequestPending,
  getSingleRequestFailed,
  getSingleRequestSuccess,
  updateRequestPending,
  updateRequestSuccess,
  updateRequestFailed,
  deleteRequestSuccess,
  deleteRequestPending,
  deleteRequestFailed,
};
