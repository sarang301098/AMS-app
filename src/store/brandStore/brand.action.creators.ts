import { action } from "typesafe-actions";
import actionTypes from "./action.enum";
import { IBrandPayload } from "./types";

/**
 * get brand success action creator
 * @param payload
 * @returns
 */
const getBrandSuccess = (payload: IBrandPayload) =>
  action(actionTypes.GET_BRANDS_SUCCESS, payload);

/**
 * get brand failed action creator
 * @returns
 */
const getBrandFailed = () => action(actionTypes.GET_BRANDS_FAILED);

/**
 * get brand failed action creator
 * @returns
 */
const getBrandPending = () => action(actionTypes.GET_BRANDS_PENDING);

/**
 * add brand success acion creator
 * @param payload
 * @returns
 */
const addBrandSuccess = (payload: Record<string, string>) =>
  action(actionTypes.ADD_BRAND_SUCCESS, payload);

/**
 * add brand failed action creator
 * @returns
 */
const addBrandFailed = () => action(actionTypes.ADD_BRAND_FAILED);

/**
 * add brand pending action creator
 * @returns
 */
const addBrandPending = () => action(actionTypes.ADD_BRAND_PENDING);

/**
 * delete brand pending action creator
 * @returns
 */
const deleteBrandPending = () => action(actionTypes.DELETE_BRAND_PENDING);

/**
 * delete brand success action creator
 * @param payload
 * @returns
 */
const deleteBrandSuccess = (payload: string) =>
  action(actionTypes.DELETE_BRAND_SUCCESS, payload);

/**
 * delete brands failed action creator
 * @returns
 */
const deleteBrandFailed = () => action(actionTypes.DELETE_BRAND_FAILED);

export {
  getBrandSuccess,
  getBrandFailed,
  getBrandPending,
  addBrandSuccess,
  addBrandFailed,
  addBrandPending,
  deleteBrandPending,
  deleteBrandSuccess,
  deleteBrandFailed,
};
