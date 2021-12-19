import { IAdminDashboardActionTypes, IAdminDashboardState } from "./types";
import actionTypes from "./action.enum";

const AppState: IAdminDashboardState = {
  adminDashboardData: {
    adminDashboardInventory: [],
    totalBrandCount: 0,
    totalModelCount: 0,
    adminDashboardRequest: {
      processing: 0,
      completed: 0,
      pending: 0,
      rejected: 0,
    },
  },
  loading: false,
};
const adminDashboardReducer = (
  state = AppState,
  action: IAdminDashboardActionTypes
) => {
  switch (action.type) {
    case actionTypes.ADMIN_DASHBOARD_DATA_PENDING:
      return { ...state, loading: true };

    case actionTypes.ADMIN_DASHBOARD_DATA_SUCCESS:
      return { ...state, loading: false, adminDashboardData: action.payload };

    case actionTypes.ADMIN_DASHBOARD_DATA_FAILED:
      return { ...state, loading: false };

    default:
      return state;
  }
};
export default adminDashboardReducer;
