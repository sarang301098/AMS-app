import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ScaleLoader from "react-spinners/ScaleLoader";

import RootState from "../../store/types";
import { getReportDataAction } from "../../store/report/reportData.action.async";

interface Prop {
  itemsPerPage: number;
  date: any;
  page: number;
}
const ReportListItems: React.FC<Prop> = ({ itemsPerPage, date, page }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentReportData = useSelector(
    (state: RootState) => state.reportData.reportData.assignmentData
  );

  const currentReportCount = useSelector(
    (state: RootState) => state.reportData.reportData.assignmentDetailsCount
  );
  const loading = useSelector((state: RootState) => state.reportData.loading);

  useEffect(() => {
    if (
      currentReportData &&
      currentReportData.length === 0 &&
      currentReportCount > 0
    ) {
      dispatch(
        getReportDataAction(
          true,
          date[0].startDate,
          date[0].endDate,
          page || 1,
          itemsPerPage
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentReportCount, dispatch]);

  return (
    <>
      <div
        className="table-responsive"
        style={{ minHeight: "calc(100vh - 300px)", overflowX: "unset" }}
      >
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>User Name</th>
              <th style={{ width: "20%" }}>UserId</th>
              <th style={{ width: "10%" }}>Label</th>
              <th style={{ width: "25%" }}>Brand Name</th>
              <th style={{ width: "15%" }}>Model Name</th>
              <th className="table-field-actions" style={{ width: "5%" }}>
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <ScaleLoader color="#F7B500" loading={loading} />
                </td>
              </tr>
            ) : currentReportData && currentReportData.length > 0 ? (
              currentReportData.map((report: any) => (
                <tr key={report && report._id}>
                  <td>
                    {report && report.userData && report.userData.username
                      ? report.userData.username
                      : "NA"}
                  </td>
                  <td>{report && report.assignedUserId}</td>
                  <td>{report && report.label}</td>
                  <td>{report && report.brandData && report.brandData.name}</td>
                  <td>{report && report.modelData && report.modelData.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportListItems;
