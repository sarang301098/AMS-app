import { ActionType } from "typesafe-actions";
import * as actions from "./request.action.creators";

type RequestPayload = {
  createdAt: string;
  descriptionNote: string;
  fromUserId: string;
  inventoryName: string;
  priority: string;
  status: string;
  _id: string;
};

type IRequestState = {
  loading: boolean;
  requestData: {
    count: number;
    requests: RequestPayload[];
  };
  singleRequest: Partial<RequestPayload>;
  error: string;
  // brands:{label:string, value:string}[];
  // models:{label:string, value:string}[];
  // inventoryName: {label:string, value:string}[];
  // inventoryAvailable: boolean
};

type ReqInitialValues = {
  priority?: string;
  descriptionNote?: string;
  status?: string;
  inventoryId?: string;
};

type IRequestActionTypes = ActionType<typeof actions>;

export { IRequestState, RequestPayload, IRequestActionTypes, ReqInitialValues };
