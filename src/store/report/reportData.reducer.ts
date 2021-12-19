import actionTypes from "./action.enum";
import { IReportDataActionTypes, IReportDataState } from "./types";

const initialState: IReportDataState = {
  loading: false,
  reportData: { assignmentDetailsCount: 0, assignmentData: [] },
};

const reportDataReducer = (
  state = initialState,
  action: IReportDataActionTypes
) => {
  switch (action.type) {
    case actionTypes.GET_REPORT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_REPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        reportData: action.payload,
      };
    }
    case actionTypes.GET_REPORT_FAILED: {
      return {
        ...state,
        loading: false,
        reportData: {},
      };
    }

    default:
      return state;
  }
};
export default reportDataReducer;
