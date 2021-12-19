import { action } from "typesafe-actions";
import actionTypes from "./action.enum";
import { ReportDataPayload } from "./types";

const reportPending = () => action(actionTypes.GET_REPORT_PENDING);

const reportSuccess = (payload: ReportDataPayload[]) =>
  action(actionTypes.GET_REPORT_SUCCESS, payload);

const reportFailed = () => action(actionTypes.GET_REPORT_FAILED);

export { reportPending, reportSuccess, reportFailed };
