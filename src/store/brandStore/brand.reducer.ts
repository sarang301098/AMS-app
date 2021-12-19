import actionTypes from "./action.enum";
import { IBrandState, IBrandTypes } from "./types";

const initialState: IBrandState = {
  loading: false,
  brands: { brandOptionsCount: 0, brandOptions: [] },
  error: "",
};
const brandReducer = (state = initialState, action: IBrandTypes) => {
  switch (action.type) {
    case actionTypes.GET_BRANDS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
      };

    case actionTypes.GET_BRANDS_FAILED:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.ADD_BRAND_PENDING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.ADD_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: {
          ...state.brands,
          brandOptions: [
            ...state.brands.brandOptions,
            { label: action.payload.name, value: action.payload._id },
          ],
        },
      };

    case actionTypes.ADD_BRAND_FAILED:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.DELETE_BRAND_PENDING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.DELETE_BRAND_SUCCESS:
      if(state.brands && state.brands.brandOptions){
        for (let i of state.brands.brandOptions) {
          if (i.value === action.payload ) {
            state.brands.brandOptions.splice(state.brands.brandOptions.indexOf(i), 1);
          }
        }
      }
      return {
        ...state,
        loading: false,
      };

    case actionTypes.DELETE_BRAND_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default brandReducer;
