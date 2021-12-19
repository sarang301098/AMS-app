import actionTypes from "./action.enum";
import { IUserDataActionTypes, IUserDataState } from "./types";

const initialState: IUserDataState = {
  loading: false,
  userData: { totalUsersCount: 0, totalUsers: [] },
  error: "",
};

const userDataReducer = (
  state = initialState,
  action: IUserDataActionTypes
) => {
  switch (action.type) {
    case actionTypes.GET_USER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    }
    case actionTypes.GET_USER_FAILED: {
      return {
        ...state,
        loading: false,
        userData: {},
      };
    }
    case actionTypes.ADD_USER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case actionTypes.ADD_USER_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};
export default userDataReducer;
