import { action } from "typesafe-actions";
import actionTypes from "./action.enum";
import { IModelPayload } from "./types";

/**
 * get model success action creator
 * @param payload
 * @returns
 */
const getModelSuccess = (payload: IModelPayload) =>
  action(actionTypes.GET_MODELS_SUCCESS, payload);

/**
 * get model failed action creator
 * @returns
 */
const getModelFailed = () => action(actionTypes.GET_MODELS_FAILED);

/**
 * get model pending action creator
 * @returns
 */
const getModelPending = () => action(actionTypes.GET_MODELS_PENDING);

/**
 * add model action creator
 * @param payload
 * @returns
 */
const addModelSuccess = (payload: Record<string, string>) =>
  action(actionTypes.ADD_MODEL_SUCCESS, payload);

/**
 * add model failed action creator
 * @returns
 */
const addModelFailed = () => action(actionTypes.ADD_MODEL_FAILED);

/**
 * add model pending action creator
 * @returns
 */
const addModelPending = () => action(actionTypes.ADD_MODEL_PENDING);

/**
 * delete model pending action creator
 * @returns
 */
const deleteModelPending = () => action(actionTypes.DELETE_MODEL_PENDING);

/**
 * delete model success action creator
 * @param payload
 * @returns
 */
const deleteModelSuccess = (payload: string) =>
  action(actionTypes.DELETE_MODEL_SUCCESS, payload);

/**
 * delete model failed action creator
 * @returns
 */
const deleteModelFailed = () => action(actionTypes.DELETE_MODEL_FAILED);

export {
  getModelSuccess,
  getModelFailed,
  getModelPending,
  addModelSuccess,
  addModelFailed,
  addModelPending,
  deleteModelPending,
  deleteModelSuccess,
  deleteModelFailed,
};
