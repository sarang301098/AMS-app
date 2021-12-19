import { ActionType } from "typesafe-actions";
import * as actions from "./request.action.creators";

type IDashboardState = {
  loading: boolean;
  dashboardData: {
    userDashboardInventory: IDashboardPayload[];
    userDashboardRequest: { completed: number; rejected: number };
  };
};

type IDashboardPayload = {
  inventoryName: string;
  label: string;
  assignedAt: string;
  brandName: string;
  modelName: string;
};

type IDashboardActionTypes = ActionType<typeof actions>;

export { IDashboardState, IDashboardPayload, IDashboardActionTypes };
