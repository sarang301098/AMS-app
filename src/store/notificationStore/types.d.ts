import * as actions from "./notification.action.creators";
import { ActionType } from "typesafe-actions";

type INotificationPayload = {
  _id: string;
  isRead: boolean;
  description: string;
  createdAt: string;
  isCreatedByAdmin: string;
  isChecked?: boolean
};

type INotificationState = {
  loading: boolean;
  notifications: {
    totalNotificationCountTotal: number;
    totalNotifications: INotificationPayload[];
    unvisitedCount: number;
  };
  headerNotifications: {
    totalNotificationCountTotal: number;
    totalNotifications: INotificationPayload[];
    unvisitedCount: number;
  }
  error: string;
};

type INotificationActionTypes = ActionType<typeof actions>;

export { INotificationActionTypes, INotificationState, INotificationPayload };
