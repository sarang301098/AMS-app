import { action } from "typesafe-actions";
import actionTypes from "./action.enum";

/**
 * adminDashboardDataPending action creator
 * @returns
 */
const adminDashboardDataPending = () =>
  action(actionTypes.ADMIN_DASHBOARD_DATA_PENDING);

/**
 * adminDashboardDataSuccess action creator
 * @param payload
 * @returns
 */
const adminDashboardDataSuccess = (payload: object) =>
  action(actionTypes.ADMIN_DASHBOARD_DATA_SUCCESS, payload);

/**
 * adminDashboardDataFailed action creator
 * @returns
 */
const adminDashboardDataFailed = () =>
  action(actionTypes.ADMIN_DASHBOARD_DATA_FAILED);

export {
  adminDashboardDataPending,
  adminDashboardDataSuccess,
  adminDashboardDataFailed,
};
