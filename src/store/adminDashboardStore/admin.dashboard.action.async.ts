import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as actionCreator from "./admin.dashboard.action.creators";
import * as adminDashboard from "../../services/adminDashboard";
import { toast } from "react-toastify";

const notifyError = (error: string) => toast.error(error, { theme: "colored" });

const adminDashboardAction = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.adminDashboardDataPending());
    return adminDashboard
      .getDashboardData()
      .then((res) => {
        dispatch(actionCreator.adminDashboardDataSuccess(res.data));
      })
      .catch((err) => {
        notifyError("Something went wrong.");
        dispatch(actionCreator.adminDashboardDataFailed());
      });
  };
};
export { adminDashboardAction };
