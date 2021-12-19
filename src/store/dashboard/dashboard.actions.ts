import { ThunkDispatch, ThunkAction } from "redux-thunk";

import { AnyAction } from "redux";

import {
  dashboarDataPending,
  dashboardDataSuccess,
  dashboardDataFailed,
} from "./dashboard.action.creators";
import { getAllData } from "../../services/dashboard";
// import { string } from "yup/lib/locale";

export const loadInfoFromServer = (
  userId: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(dashboarDataPending());
    try {
      const response = await getAllData(userId);
      if (response) {
        dispatch(dashboardDataSuccess(response.data));
      }
    } catch (error) {
      dispatch(dashboardDataFailed());
    }
  };
};
