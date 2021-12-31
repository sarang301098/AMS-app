import { IDashboardActionTypes, IDashboardState } from "./types";
import actionTypes from "./action.enum";

const AppState: IDashboardState = {
  dashboardData: {userDashboardInventory:[],userDashboardRequest:{completed:0,rejected:0}},
  loading: false,
};
const dashboradReducer = (state = AppState, action: IDashboardActionTypes) => {
  switch (action.type) {
    case actionTypes.DASHBOARD_DATA_PENDING:
      return { ...state, loading: true };

    case actionTypes.DASHBOARD_DATA_SUCCESS:
      return { ...state, loading: false, dashboardData: action.payload };

    case actionTypes.DASHBOARD_DATA_FAILED:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default dashboradReducer;
