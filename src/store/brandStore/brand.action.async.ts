import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { toast } from "react-toastify";
import * as actionCreator from "./brand.action.creators";
import * as brand from "../../services/brand";
import { getAdminHeaderNotificationsAction } from "../adminNotificationStore/admin.notification.action.async";

const notifyError = (error: string) => toast.error(error, { theme: "colored" });
const notifySuccess = (msg: string) => toast.success(msg, { theme: "colored" });

/**
 * get brand api thunk
 * @returns
 */
const getBrandAction = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.getBrandPending());
    return brand
      .getBrand()
      .then((res) => {
        dispatch(actionCreator.getBrandSuccess(res.data));
      })
      .catch((err) => {
        notifyError(err.msg);
        dispatch(actionCreator.getBrandFailed());
      });
  };
};

/**
 * add brand api thunk
 * @param name
 * @returns
 */
const addBrandAction = (name: string): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.addBrandPending());
    return brand
      .addBrand(name)
      .then(async (res) => {
        notifySuccess("Brand added successfully.");
        await dispatch(actionCreator.addBrandSuccess(res.data));
        dispatch(getAdminHeaderNotificationsAction());
      })
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.addBrandFailed());
      });
  };
};

/**
 * delete brand api thunk
 * @param brandId
 * @returns
 */
const deleteBrandAction = (
  brandId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.deleteBrandPending());
    return brand
      .deleteBrand(brandId)
      .then((res) => {
        notifySuccess("Brand deleted successfully.");
        dispatch(actionCreator.deleteBrandSuccess(brandId));
      })
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.deleteBrandFailed());
      });
  };
};

export { getBrandAction, addBrandAction, deleteBrandAction };
