import actionTypes from "./action.enum";
import { IGeneralActionTypes } from "./types";

const initialState:any  = {
    loading: false
}


const profileReducer = (state = initialState, action: IGeneralActionTypes) => {
  switch (action.type) {
    case actionTypes.GENERAL_DATA_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GENERAL_DATA_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GENERAL_DATA_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer