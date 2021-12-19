import actionTypes from "./action.enum";
import { IPurchaseActionType, IPurchaseState } from "./types";

const INITIAL_STATE: IPurchaseState = {
  brandId: null,
  modelId: null,
  purchase: { count: 0, purchaseEntries: [] },
  inventoryName: null,
  loading: false,
};

const purchaseReducer = (
  state = INITIAL_STATE,
  action: IPurchaseActionType
): IPurchaseState => {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: true };

    case actionTypes.CLEAR_LOADING:
      return { ...state, loading: false };

    case actionTypes.GET_BRAND_ID:
      return {
        ...state,
        brandId: action.payload,
        loading: false,
      };

    case actionTypes.CREATE_PURCHASE_ENTRY:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.GET_PURCHASE:
      return {
        ...state,
        loading: false,
        purchase: action.payload,
      };

    case actionTypes.GET_MODEL_ID:
      return {
        ...state,
        modelId: action.payload,
        loading: false,
      };

    case actionTypes.GET_INVENTORY_NAME:
      return {
        ...state,
        inventoryName: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default purchaseReducer;
