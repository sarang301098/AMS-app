import actionTypes from "./action.enum";
import { IRequestActionTypes, IRequestState } from "./types";

const initialState: IRequestState = {
  loading: false,
  requestData: { count: 0, requests: [] },
  error: "",
  singleRequest: {},
  // brands:[],
  // models:[],
  // inventoryName:[],
  // inventoryAvailable:false
};

const requestReducer = (state = initialState, action: IRequestActionTypes) => {
  switch (action.type) {
    case actionTypes.GET_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
        singleRequest: {},
      };
    case actionTypes.GET_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        requestData: action.payload,
        singleRequest: {},
      };
    }
    case actionTypes.GET_REQUEST_FAILED: {
      return {
        ...state,
        loading: false,
        requestData: {},
      };
    }
    case actionTypes.NEW_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
        singleRequest: {},
      };
    case actionTypes.NEW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        requestData: action.payload,
        error: "",
      };
    case actionTypes.NEW_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        singleRequest: {},
      };
    case actionTypes.GET_SINGLE_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
        singleRequest: {},
      };
    case actionTypes.GET_SINGLE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        singleRequest: action.payload,
      };
    case actionTypes.GET_SINGLE_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.UPDATE_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UPDATE_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.DELETE_REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.DELETE_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    // case actionTypes.AVAILABLE_BRANDS_SUCCESS:
    //   return {
    //     ...state,
    //     loading:false,
    //     brands: action.payload.brandOptions
    //   }
   
    // case actionTypes.AVAILABLE_MODELS_SUCCESS:
    //   return {
    //     ...state,
    //     loading:false,
    //     models: action.payload.modelOptions
    //   }
    // case actionTypes.CHECK_AVAILABILITY_SUCCESS:
    //   return {
    //     ...state,
    //     inventoryAvailable:true
    //   }
    // case actionTypes.CHECK_AVAILABILITY_FAILED:
    //   return {
    //     ...state,
    //     inventoryAvailable:false
    //   }
    default:
      return state;
  }
};
export default requestReducer;
