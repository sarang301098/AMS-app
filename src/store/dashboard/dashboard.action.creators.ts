import { action } from "typesafe-actions";
import actionTypes from "./action.enum";

const dashboarDataPending = () => action(actionTypes.DASHBOARD_DATA_PENDING);

const dashboardDataSuccess = (payload: any) =>
  action(actionTypes.DASHBOARD_DATA_SUCCESS, payload);

const dashboardDataFailed = () => action(actionTypes.DASHBOARD_DATA_FAILED);

export { dashboarDataPending, dashboardDataSuccess, dashboardDataFailed };
