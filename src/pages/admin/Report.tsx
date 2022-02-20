import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { DateRange } from "react-date-range";
import { CSVLink } from "react-csv";
import moment from "moment";

import { getReport } from "../../services/report";
import Pagination from "../../components/Pagination/Pagination";
import ReportListItems from "../../components/Pagination/ReportListItems";
import { getReportDataAction } from "../../store/report/reportData.action.async";
import RootState from "../../store/types";

const pageCount = 1;

const Report: React.FC = () => {
  const [showDate, setShowDate] = useState(false);
  const [downloadData, setDownloadData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [date, setDate]: any = useState([
    {
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
      ),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const reportData = useSelector(
    (state: RootState) => state.reportData.reportData
  );

  const showDatePicker = () => {
    setShowDate((show) => !show);
  };

  const headers = [
    { label: "AssignedUserId", key: "assignedUserId" },
    { label: "BrandName", key: "brandData.name" },
    { label: "AssignedAt", key: "createdAt" },
    { label: "isAssigned", key: "isAssigned" },
    { label: "Previously Used", key: "isPreviouslyUsed" },
    { label: "Label", key: "label" },
    { label: "ModelName", key: "modelData.name" },
    { label: "UserName", key: "userData.username" },
    { label: "UserData", key: "userData.general" },
  ];

  const downloadCsv = async (start: Date, end: Date) => {
    try {
      const getAllReportData = await getReport(start, end);
      setDownloadData(
        (getAllReportData &&
          getAllReportData.data &&
          getAllReportData.data.assignmentData) ||
          []
      );
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  useEffect(() => {
    downloadCsv(date[0].startDate, date[0].endDate);
  }, [date]);

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage, date]);

  const fetchReport = (page?: number) =>
    dispatch(
      getReportDataAction(
        true,
        date[0].startDate,
        date[0].endDate,
        page || pageCount,
        itemsPerPage
      )
    );

  return (
    <div id="app">
      <ToastContainer />
      <div className="content-wrapper">
        <div className="content">
          <header className="page-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h1>Report</h1>
              </div>
            </div>
          </header>
          <section className="page-content container-fluid">
            <div className="card card-tabs clearfix">
              <div className="card-body p-0">
                <div className="tab-content">
                  <div className="tab-pane fadeIn active" id="tab-1">
                    <div className="p-3 d-flex justify-content-between inner-filter">
                      <div className="d-flex justify-content-center align-items-center">
                        <label style={{ fontSize: "1rem" }}>
                          {t("pageLimit")}:{" "}
                        </label>
                        &nbsp;
                        <select
                          defaultValue={10}
                          onChange={(e) =>
                            setItemsPerPage(Number(e.target.value))
                          }
                          className="custom-select form-control select2 w-150"
                        >
                          <option value={5}>5</option>
                          <option value={8}>8</option>
                          <option value={10}>10</option>
                        </select>
                      </div>
                      <div
                        style={{ position: "relative" }}
                        className="d-flex align-items-center"
                      >
                        {showDate && (
                          <div
                            style={{
                              position: "absolute",
                              right: "0",
                              top: "40px",
                              zIndex: 2,
                            }}
                          >
                            <DateRange
                              editableDateInputs={true}
                              onChange={(item) => setDate([item.selection])}
                              moveRangeOnFirstSelection={false}
                              ranges={date}
                            />
                          </div>
                        )}

                        <div className="m-l-10">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={showDatePicker}
                          >
                            Select Date
                          </button>
                        </div>
                        <div className="m-l-10">
                          <CSVLink
                            data={downloadData}
                            headers={headers}
                            filename={`Peerbits Assignment Details ${moment(
                              date[0].startDate
                            ).format("DD-MM-YYYY")} - ${moment(
                              date[0].endDate
                            ).format("DD-MM-YYYY")}}`}
                          >
                            <button type="button" className="btn btn-success">
                              Download CSV
                            </button>
                          </CSVLink>
                        </div>
                      </div>
                    </div>
                    <Pagination
                      ItemsComponent={ReportListItems}
                      itemsPerPage={itemsPerPage}
                      pageCount={
                        reportData ? reportData.assignmentDetailsCount : 1
                      }
                      dispatchAction={fetchReport}
                      setItemsPerPage={setItemsPerPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Report;
