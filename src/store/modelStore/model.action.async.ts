import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { toast } from "react-toastify";
import * as actionCreator from "./model.action.creators";
import * as model from "../../services/models";

const notifyError = (error: string) => toast.error(error, { theme: "colored" });
const notifySuccess = (msg: string) => toast.success(msg, { theme: "colored" });

/**
 * get model api thunk
 * @param brandId
 * @returns
 */
const getModelAction = (
  brandId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.getModelPending());
    return model
      .getModels(brandId)
      .then((res) => {
        dispatch(actionCreator.getModelSuccess(res.data));
      })
      .catch((err) => {
        notifyError("Something went wrong. Try Again!");
        dispatch(actionCreator.getModelFailed());
      });
  };
};

/**
 * add model api thunk
 * @param name
 * @param brandId
 * @param selectedBrandId
 * @returns
 */
const addModelAction = (
  name: string,
  brandId: string,
  selectedBrandId?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.addModelPending());
    return model
      .addModel(name, brandId)
      .then(async (res) => {
        notifySuccess("Model added successfully.");
        await dispatch(actionCreator.addModelSuccess(res.data));
        if (brandId === selectedBrandId) {
          dispatch(getModelAction(selectedBrandId!));
        }
      })
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.addModelFailed());
      });
  };
};

/**
 * delete model api thunk
 * @param modelId
 * @returns
 */
const deleteModelAction = (
  modelId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.deleteModelPending());
    return model
      .deleteModel(modelId)
      .then(() => {
        notifySuccess("Model deleted successfully.");
        dispatch(actionCreator.deleteModelSuccess(modelId));
      })
      .catch(() => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.deleteModelFailed());
      });
  };
};

export { getModelAction, addModelAction, deleteModelAction };
