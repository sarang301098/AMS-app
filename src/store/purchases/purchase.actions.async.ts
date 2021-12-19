import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { toast } from "react-toastify";
import {
  loading,
  clearLoading,
  getBrandIdAction,
  getModelIdAction,
  purchaseEntryAction,
  getPurchaseAction,
  getInventoryNameAction,
} from "./purchase.action.creators";
import { purchaseEntryPayload } from "./types";
import * as requestFromServer from "../../services/purchase";

const notifyError = (error: string) => toast.error(error);
const notifySuccess = (success: string) => toast.success(success);
/**
 * get brand id action thunk
 * @returns
 */

export const GetBrandIdActionThunk = (): ThunkAction<
  void,
  {},
  {},
  AnyAction
> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(loading());

    requestFromServer
      .getPurchaseBrandIdApi()
      .then((response) => {
        dispatch(getBrandIdAction(response.data.brandOptions));
      })
      .catch((error) => {
        dispatch(clearLoading());
        notifyError("Something went wrong.");
      });
  };
};

/**
 * get model id action thunk
 * @param values
 * @returns
 */
export const GetModelIdActionThunk = (
  values: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(loading());

    requestFromServer
      .getPurchaseModelIdApi(values)
      .then((response) => {
        dispatch(getModelIdAction(response.data.modelOptions));
      })
      .catch((error) => {
        dispatch(clearLoading());
      });
  };
};

/**
 * get new purchase entry id action thunk
 * @param values
 * @returns
 */
export const PurchaseEntryActionThunk = (
  values: purchaseEntryPayload,
  history: any,
  isRedirect: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(loading());

    requestFromServer
      .purchaseEntryApi(values)
      .then((response) => {
        dispatch(purchaseEntryAction());
        notifySuccess("Purchase Entry Created");
        isRedirect && history.push("/admin/purchases");
      })
      .catch((error) => {
        dispatch(clearLoading());
        if (error.response && error.response.data) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Something went wrong.");
        }
      });
  };
};

/**
 * get purchase entry data action thunk
 * @param page
 * @param perPage
 * @returns
 */
export const getPurchaseActionThunk = (
  page: number,
  perPage: number,
  inventoryName?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(loading());

    requestFromServer
      .getPurchaseApi(page, perPage, inventoryName)
      .then((response) => {
        dispatch(getPurchaseAction(response.data));
      })
      .catch((error) => {
        dispatch(clearLoading());
        notifyError("Something went wrong.");
      });
  };
};

/**
 * get inventory name action thunk
 * @returns
 */
export const GetInventoryNameActionThunk = (): ThunkAction<
  void,
  {},
  {},
  AnyAction
> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(loading());

    requestFromServer
      .getInventoryNameApi()
      .then((response) => {
        dispatch(getInventoryNameAction(response.data.inventoryNameOptions));
      })
      .catch((error) => {
        dispatch(clearLoading());
        notifyError("Something went wrong.");
      });
  };
};

/**
 * add inventory name action thunk
 * @param values
 * @returns
 */
export const addInventoryNameActionThunk = (
  values: any
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(loading());
    requestFromServer
      .inventoryNameApi(values)
      .then((response) => {
        // dispatch(clearLoading());
        notifySuccess("inventory added successfully.");
        dispatch(GetInventoryNameActionThunk());
      })
      .catch((error) => {
        dispatch(clearLoading());
        notifyError("Something went wrong.");
      });
  };
};
