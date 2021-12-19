import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
// import { toast } from "react-toastify";
import * as actionCreator from "./reportData.action.creators";
import * as requestFromServer from "../../services/report";
// const notifyError = (error: string) => toast.error(error, { theme: "colored" });
// const notifySuccess = (msg: string) => toast.success(msg, { theme: "colored" });

const getReportDataAction = (
  isPaginate: boolean,
  startDate: Date,
  endDate: Date,
  page: number,
  perPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(actionCreator.reportPending());

    requestFromServer
      .getReportList(isPaginate, startDate, endDate, page, perPage)
      .then((response) => {
        dispatch(actionCreator.reportSuccess(response.data));
      })
      .catch((error) => {
        dispatch(actionCreator.reportFailed());
      });
  };
};
export { getReportDataAction };
