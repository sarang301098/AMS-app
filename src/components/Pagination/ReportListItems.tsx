import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import RootState from "../../store/types";
import ScaleLoader from "react-spinners/ScaleLoader";

const ReportListItems: React.FC = () => {
  const { t } = useTranslation();

  const currentReportData = useSelector(
    (state: RootState) => state.reportData.reportData.assignmentData
  );

  const loading = useSelector((state: RootState) => state.reportData.loading);

  return (
    <>
      <div
        className="table-responsive"
        style={{ minHeight: "calc(100vh - 300px)" }}
      >
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>User Name</th>
              <th style={{ width: "20%" }}>Email</th>
              <th style={{ width: "10%" }}>Type</th>
              <th style={{ width: "25%" }}>Full Name</th>
              <th style={{ width: "15%" }}>Contact</th>
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
                  No requests available
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
