import { ActionType } from "typesafe-actions";
import * as actions from "./reportData.action.creators";

type IReportDataState = {
  loading: boolean;
  reportData: { assignmentDetailsCount: number; assignmentData: any };
};

type ReportDataPayload = {
  reportData: { assignmentDetailsCount: number; assignmentData: any };
};

type IReportDataActionTypes = ActionType<typeof actions>;

export { IReportDataState, ReportDataPayload, IReportDataActionTypes };
