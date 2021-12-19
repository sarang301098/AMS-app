import { IUserState } from "./userStore/types";
import { IDataState } from "./dataStore/types";
import { IRequestState } from "./requestStore/types";
import { IDashboardState } from "./dashboard/types";
import { INotificationState } from "./notificationStore/types";
import { IPurchaseState } from "./purchases/types";
import { IBrandState } from "./brandStore/types";
import { IModelState } from "./modelStore/types";
import { IAdminNotificationState } from "./adminNotificationStore/types";
import { IAdminRequestState } from "./adminRequestStore/types";
import { IAdminDashboardState } from "./adminDashboardStore/types";
import { IUserDataState } from "./userList/types";
import { IReportDataState } from "./report/types";

type RootState = {
  user: IUserState;
  data: IDataState;
  request: IRequestState;
  dashboard: IDashboardState;
  notification: INotificationState;
  profile: { loading: boolean };
  purchase: IPurchaseState;
  brand: IBrandState;
  model: IModelState;
  adminNotification: IAdminNotificationState;
  adminRequest: IAdminRequestState;
  adminDashboard: IAdminDashboardState;
  userData: IUserDataState;
  reportData: IReportDataState;
};

export default RootState;
