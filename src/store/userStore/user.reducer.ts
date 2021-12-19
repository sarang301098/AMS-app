import actionTypes from "./action.enum";
import { IUserActionType, IUserState } from "./types";

const INITIAL_STATE: IUserState = {
  userData: null,
  loading: false,
  isLoggedIn: false,
  errorMessage: null,
  token: null,
  success: false,
};

const userReducer = (
  state = INITIAL_STATE,
  action: IUserActionType
): IUserState => {
  switch (action.type) {
    case actionTypes.AUTH_PENDING:
      return { ...state, loading: true };

    case actionTypes.AUTH_SUCCESS:
      return { ...state, loading: false };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token || null,
        isLoggedIn: true,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        success: true,
      };

    case actionTypes.CLEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        success: true,
      };

    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        success: true,
      };

    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error || "",
      };

    case actionTypes.USER_LOADED:
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        userData: null,
        loading: false,
        isLoggedIn: false,
        errorMessage: null,
        token: null,
      };

    default:
      return state;
  }
};

export default userReducer;
