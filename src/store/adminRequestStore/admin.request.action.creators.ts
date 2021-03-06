import { action } from "typesafe-actions";
import actionTypes from "./action.enum";

/**
 * getAdminRequestPending action creator
 * @returns
 */
const getAdminRequestPending = () =>
  action(actionTypes.GET_ADMIN_REQUEST_PENDING);

/**
 * getAdminRequestSuccess action creator
 * @param payload
 * @returns
 */
const getAdminRequestSuccess = (payload: object) =>
  action(actionTypes.GET_ADMIN_REQUEST_SUCCESS, payload);

/**
 * getAdminRequestFailed action creator
 * @returns
 */
const getAdminRequestFailed = () =>
  action(actionTypes.GET_ADMIN_REQUEST_FAILED);

/**
 * updateAdminRequestPending action creator
 * @returns
 */
const updateAdminRequestPending = () =>
  action(actionTypes.UPDATE_ADMIN_REQUEST_PENDING);

/**
 * updateAdminRequestSuccess action creator
 * @returns
 */
const updateAdminRequestSuccess = () =>
  action(actionTypes.UPDATE_ADMIN_REQUEST_SUCCESS);

/**
 * updateAdminRequestFailed action creator
 * @returns
 */
const updateAdminRequestFailed = () =>
  action(actionTypes.UPDATE_ADMIN_REQUEST_FAILED);

/**
 * checkAvailableBrands action creator
 * @param payload
 * @returns
 */
const checkAvailableBrands = (payload: object) =>
  action(actionTypes.CHECK_AVAILABLE_BRANDS, payload);

/**
 * checkAvailableModels action creator
 * @param payload
 * @returns
 */
const checkAvailableModels = (payload: object) =>
  action(actionTypes.CHECK_AVAILABLE_MODELS, payload);

/**
 * checkAvailabilitySuccess action creator
 * @param payload
 * @returns
 */
const checkAvailabilitySuccess = (payload: Record<string, string>) =>
  action(actionTypes.CHECK_AVAILABILITY_SUCCESS, payload);

/**
 * checkAvailabilityFailed action creator
 * @returns
 */
const checkAvailabilityFailed = () =>
  action(actionTypes.CHECK_AVAILABILITY_FAILED);

/**
 * assignInventory
 * @returns
 */
const assignInventory = () => action(actionTypes.RESET);

export {
  getAdminRequestPending,
  getAdminRequestSuccess,
  getAdminRequestFailed,
  updateAdminRequestPending,
  updateAdminRequestSuccess,
  updateAdminRequestFailed,
  checkAvailabilitySuccess,
  checkAvailabilityFailed,
  checkAvailableBrands,
  checkAvailableModels,
  assignInventory,
};
