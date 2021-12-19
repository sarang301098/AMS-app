import actionTypes from "./action.enum";
import { IAdminRequestActionTypes, IAdminRequestState } from "./types";

const initialState: IAdminRequestState = {
  loading: false,
  requestData: { count: 0, requests: [] },
  error: "",
  availableModels: { modelOptionsCount: 0, modelOptions: [] },
  availableBrands: { brandOptionsCount: 0, brandOptions: [] },
  availableInventory: {},
};

const adminRequestReducer = (
  state = initialState,
  action: IAdminRequestActionTypes
) => {
  switch (action.type) {
    case actionTypes.GET_ADMIN_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ADMIN_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        requestData: action.payload,
      };
    }
    case actionTypes.GET_ADMIN_REQUEST_FAILED: {
      return {
        ...state,
        loading: false,
        requestData: {},
      };
    }
    case actionTypes.UPDATE_ADMIN_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_ADMIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UPDATE_ADMIN_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.CHECK_AVAILABLE_BRANDS:
      return {
        ...state,
        availableBrands: action.payload,
      };
    case actionTypes.CHECK_AVAILABLE_MODELS:
      return {
        ...state,
        availableModels: action.payload,
      };
    case actionTypes.CHECK_AVAILABILITY_SUCCESS:
      return {
        ...state,
        availableInventory: action.payload,
      };
    case actionTypes.CHECK_AVAILABILITY_FAILED:
      return {
        ...state,
        availableInventory: {},
      };
    case actionTypes.RESET:
      return {
        ...state,
        availableInventory: {},
        availableModels: { modelOptionsCount: 0, modelOptions: [] },
        availableBrands: { brandOptionsCount: 0, brandOptions: [] },
      };
    default:
      return state;
  }
};
export default adminRequestReducer;
