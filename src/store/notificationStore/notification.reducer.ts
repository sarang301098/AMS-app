import { INotificationActionTypes, INotificationState } from "./types";
import actionTypes from "./action.enum";

const initialState: INotificationState = {
  loading: false,
  notifications: {
    totalNotificationCountTotal: 0,
    totalNotifications: [],
    unvisitedCount: 0,
  },
  headerNotifications: {
    totalNotificationCountTotal: 0,
    totalNotifications: [],
    unvisitedCount: 0,
  },
  error: "",
};
const notificationReducer = (
  state = initialState,
  action: INotificationActionTypes
) => {
  switch (action.type) {
    case actionTypes.GET_NOTIFICATIONS_PENDING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.GET_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        notifications: [],
      };
    case actionTypes.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        notifications: action.payload,
      };

    case actionTypes.GET_HEADER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        error: "",
        headerNotifications: action.payload,
      };

    case actionTypes.DELETE_NOTIFICATIONS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.DELETE_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.READ_NOTIFICATIONS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.READ_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.READ_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default notificationReducer;
