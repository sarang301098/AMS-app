import * as actions from "./admin.dashboard.action.creators";
import { ActionType } from "typesafe-actions";

type IAdminDashboardPayload = {
  adminDashboardInventory: Array<{
    inventoryName: string;
    availableUnits: number;
    totalUnits: number;
    assignedUnits: Inumber;
  }>;
  totalBrandCount: number;
  totalModelCount: number;
  adminDashboardRequest: {
    processing: number;
    completed: number;
    pending: number;
    rejected: number;
  };
};
type IAdminDashboardState = {
  adminDashboardData: IAdminDashboardPayload;
  loading: boolean;
};
type IAdminDashboardActionTypes = ActionType<typeof actions>;

export {
  IAdminDashboardPayload,
  IAdminDashboardState,
  IAdminDashboardActionTypes,
};
