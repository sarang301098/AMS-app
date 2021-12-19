import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as actionCreator from "./admin.request.action.creators";
import * as requests from "../../services/adminRequests";
import { toast } from "react-toastify";

const notifyError = (error: string) => toast.error(error, { theme: "colored" });
const notifySuccess = (msg: string) => toast.success(msg, { theme: "colored" });

/**
 * get adminRequest api call thunk
 * @param page
 * @param perPage
 * @param filter
 * @returns
 */
const getAdminRequestAction = (
  page: number,
  perPage: number,
  filter: string,
  userName?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.getAdminRequestPending());
    return requests
      .getAdminAllRequest(page, perPage, filter, userName)
      .then((res) => {
        dispatch(actionCreator.getAdminRequestSuccess(res.data));
      })
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.getAdminRequestFailed());
      });
  };
};
/**
 * updateAdminRequest api call thunk
 * @param status
 * @param _id
 * @returns
 */
const updateAdminRequestAction = (
  status: string,
  _id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.updateAdminRequestPending());
    return requests
      .updateAdminRequest(status, _id)
      .then(() => {
        dispatch(actionCreator.updateAdminRequestSuccess());
        notifySuccess("Request updated successfully!");
      })
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.updateAdminRequestFailed());
      });
  };
};

const assignInventoryAction = (
  inventoryDetailId: string,
  requestId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    return requests
      .assignInventory(inventoryDetailId, requestId)
      .then(() => {
        notifySuccess("Inventory assigned successfully!");
        dispatch(actionCreator.assignInventory())
      })
      .catch(() => {
        notifyError("Something went wrong");
        dispatch(actionCreator.assignInventory())
      });
  };
};

const checkAvailableBrandAction = (inventoryName:string):ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    return requests
    .checkAvailableBrand(inventoryName)
    .then(res => {
      if(res.data.brandOptions.length > 0){
        dispatch(actionCreator.checkAvailableBrands(res.data))
      } else{
        notifyError("Inventory not available")
      }
    })
    .catch(() => notifyError("Something went wrong."))
  }
}

const checkAvailableModelAction = (inventoryName:string, brandId:string):ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    return requests
    .checkAvailableModels(inventoryName, brandId)
    .then(res => dispatch(actionCreator.checkAvailableModels(res.data)))
    .catch(() => notifyError("Somethin went wrong."))
  }
}



const checkAvailabilityAction = (
  brandId: string,
  modelId: string,
  inventoryName: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    return requests
      .checkAvailability(brandId, modelId, inventoryName)
      .then((res) => {
        dispatch(actionCreator.checkAvailabilitySuccess(res.data));
      })
      .catch(() => {
        notifyError("Inventory not available")
        dispatch(actionCreator.checkAvailabilityFailed());
      });
  };
};

export {
  getAdminRequestAction,
  updateAdminRequestAction,
  checkAvailabilityAction,
  assignInventoryAction,
  checkAvailableBrandAction,
  checkAvailableModelAction
};
