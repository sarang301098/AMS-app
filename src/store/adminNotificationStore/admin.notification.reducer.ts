import {
  IAdminNotificationActionTypes,
  IAdminNotificationState,
} from "./types";
import actionTypes from "./action.enum";

const initialState: IAdminNotificationState = {
  loading: false,
  notifications: { totalNotificationCount: 0, totalNotifications: [], unvisitedCount:0 },
  error: "",
  headerNotifications:{ totalNotificationCount: 0, totalNotifications: [], unvisitedCount:0 },
};
const adminNotificationReducer = (
  state = initialState,
  action: IAdminNotificationActionTypes
) => {
  switch (action.type) {
    case actionTypes.GET_ADMIN_NOTIFICATIONS_PENDING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.GET_ADMIN_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        notifications: [],
      };
    case actionTypes.GET_ADMIN_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        notifications: action.payload,
      };

    case actionTypes.GET_HEADER_ADMIN_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        headerNotifications: action.payload,
      };
    case actionTypes.READ_ADMIN_NOTIFICATIONS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.READ_ADMIN_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.READ_ADMIN_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.DELETE_ADMIN_NOTIFICATIONS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_ADMIN_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.DELETE_ADMIN_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default adminNotificationReducer;
