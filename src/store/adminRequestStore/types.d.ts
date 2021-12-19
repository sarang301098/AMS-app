import { ActionType } from "typesafe-actions";
import * as actions from "./request.action.creators";

type IAdminRequestPayload = {
  createdAt: string;
  descriptionNote: string;
  priority: string;
  status: string;
  inventoryName:string;
  _id: string;
  userData: {
    _id: string;
    username: string;
    general: {
      fName: string;
      mName: string;
      lName: string;
    };
  };
};

type IAdminRequestState = {
  loading: boolean;
  requestData: {
    count: number;
    requests: IAdminRequestPayload[];
  };
  error: string;
  availableInventory:Record<string, string>;
  availableBrands: {brandOptionsCount: number, brandOptions: {value: string,label: string}[]};
  availableModels: { modelOptionsCount: number,modelOptions: {value: string,label: string}[]};
};

type IAdminRequestActionTypes = ActionType<typeof actions>;

export { IAdminRequestState, IAdminRequestPayload, IAdminRequestActionTypes };
