import { combineReducers, CombinedState } from "redux";
import { Reducer } from "react";
import dataReducer from "./dataStore/data.reducer";
import userReducer from "./userStore/user.reducer";
import dashboradReducer from "./dashboard/dashboard.reducer";
import requestReducer from "./requestStore/request.reducer";
import notificationReducer from "./notificationStore/notification.reducer";
import profileReducer from "./profileStore/profile.reducer";
import purchaseReducer from "./purchases/purchase.reducer";
import brandReducer from "./brandStore/brand.reducer";
import modelReducer from "./modelStore/model.reducer";
import adminNotificationReducer from "./adminNotificationStore/admin.notification.reducer";
import adminRequestReducer from "./adminRequestStore/admin.request.reducer";
import adminDashboardReducer from "./adminDashboardStore/admin.dashboard.reducer";
import userDataReducer from "./userList/userData.reducer";
import reportDataReducer from "./report/reportData.reducer";

const reducers: Reducer<CombinedState<any>, any> = combineReducers({
  data: dataReducer,
  user: userReducer,
  dashboard: dashboradReducer,
  request: requestReducer,
  notification: notificationReducer,
  profile: profileReducer,
  purchase: purchaseReducer,
  brand: brandReducer,
  model: modelReducer,
  adminNotification: adminNotificationReducer,
  adminRequest: adminRequestReducer,
  adminDashboard: adminDashboardReducer,
  userData: userDataReducer,
  reportData: reportDataReducer,
});

export default reducers;
