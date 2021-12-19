import { ActionType } from "typesafe-actions";
import * as actions from "./user.action.creators";

type IPurchaseState = {
  brandId: Array<object> | null;
  modelId: Array<object> | null;
  purchase: {
    count: number;
    purchaseEntries: Array<any>;
  };
  inventoryName: Array<object> | null;
  loading: boolean;
};

type IPurchasePayload = {
  brandId: Array<object> | null;
  modelId: Array<object> | null;
  purchase: {
    count: number;
    purchaseEntries: Array<any>;
  };
  inventoryName: Array<object> | null;
};

type purchaseEntryPayload = {
  brandId: string;
  modelId: string;
  units: number;
  purchasedDate: date;
  singleUnitAmount: number;
  totalAmount: number;
  inventoryName: string;
};

type IPurchaseActionType = ActionType<typeof actions>;
export {
  IPurchaseState,
  IPurchaseActionType,
  IPurchasePayload,
  purchaseEntryPayload,
};
