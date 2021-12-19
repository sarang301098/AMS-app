import * as actions from "./admin.notification.action.creators";
import { ActionType } from "typesafe-actions";

type IAdminNotificationPayload = {
  _id: string;
  isRead: boolean;
  description: string;
  createdAt: string;
  isCreatedByAdmin: string;
  isChecked?:boolean
};

type IAdminNotificationState = {
  loading: boolean;
  notifications: {
    totalNotificationCount: number;
    totalNotifications: INotificationPayload[];
    unvisitedCount:number
  };
  headerNotifications: {
    totalNotificationCount: number;
    totalNotifications: INotificationPayload[];
    unvisitedCount:number
  };
  error: string;
};

type IAdminNotificationActionTypes = ActionType<typeof actions>;

export {
  IAdminNotificationActionTypes,
  IAdminNotificationState,
  IAdminNotificationPayload,
};
