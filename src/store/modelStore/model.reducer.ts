import actionTypes from "./action.enum";
import { IModelState, IModelTypes } from "./types";

const initialState: IModelState = {
  loading: false,
  models: { modelOptionsCount: -1, modelOptions: [] },
  error: "",
};
const modelReducer = (state = initialState, action: IModelTypes) => {
  switch (action.type) {
    case actionTypes.GET_MODELS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_MODELS_SUCCESS:
      return {
        ...state,
        loading: false,
        models: action.payload,
      };

    case actionTypes.GET_MODELS_FAILED:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.ADD_MODEL_PENDING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.ADD_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.ADD_MODEL_FAILED:
      return {
        ...state,
        loading: false,
      };

      case actionTypes.DELETE_MODEL_PENDING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.DELETE_MODEL_SUCCESS:
      if(state.models && state.models.modelOptions){
        for (let i of state.models.modelOptions) {
          if (i.value === action.payload ) {
            state.models.modelOptions.splice(state.models.modelOptions.indexOf(i), 1);
            state.models.modelOptionsCount-=1
          }
        }
      }
      return {
        ...state,
        loading: false,
      };

    case actionTypes.DELETE_MODEL_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default modelReducer;
