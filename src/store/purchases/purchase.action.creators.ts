import { action } from "typesafe-actions";
import actionTypes from "./action.enum";
import { IPurchasePayload } from "./types";

/**
 * pending action creator
 * @returns
 */
const loading = () => action(actionTypes.LOADING);

/**
 * pending action creator
 * @returns
 */
const clearLoading = () => action(actionTypes.CLEAR_LOADING);

/**
 *get brand id action
 * @param userParams
 * @returns
 */
const getBrandIdAction = (userParams: IPurchasePayload) =>
  action(actionTypes.GET_BRAND_ID, userParams);

/**
 *get model id action
 * @param userParams
 * @returns
 */
const getModelIdAction = (userParams: IPurchasePayload) =>
  action(actionTypes.GET_MODEL_ID, userParams);

/**
 * purchase Entry Action
 * @returns
 */
const purchaseEntryAction = () => action(actionTypes.CREATE_PURCHASE_ENTRY);

/**
 * get purchase data action
 * @param userParams
 * @returns
 */
const getPurchaseAction = (userParams: IPurchasePayload) =>
  action(actionTypes.GET_PURCHASE, userParams);

/**
 * get inventory name action
 * @param userParams
 * @returns
 */
const getInventoryNameAction = (userParams: IPurchasePayload) =>
  action(actionTypes.GET_INVENTORY_NAME, userParams);

export {
  loading,
  getBrandIdAction,
  getModelIdAction,
  clearLoading,
  purchaseEntryAction,
  getPurchaseAction,
  getInventoryNameAction,
};
