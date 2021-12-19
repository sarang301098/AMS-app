import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";

import { getReportDataAction } from "../../store/report/reportData.action.async";
import Pagination from "../../components/Pagination/Pagination";
import RootState from "../../store/types";
import { Loading } from "../../components/loader/Spinner";
import { CSVLink } from "react-csv";
import ReportListItems from "../../components/Pagination/ReportListItems";
import { getReport } from "../../services/report";

const pageCount = 1;

const Report = () => {
  const [showDate, setShowDate] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [state, setState]: any = useState([
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
  const [downloadData, setDownloadData] = useState([]);

  const dispatch = useDispatch();

  const isLoading: boolean = useSelector(
    (state: RootState) => state.reportData.loading
  );

  const reportData = useSelector(
    (state: RootState) => state.reportData.reportData
  );

  const showDatePicker = () => {
    setShowDate((show) => !show);
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);
  const fetchReport = (page?: number) =>
    dispatch(
      getReportDataAction(
        true,
        state[0].startDate,
        state[0].endDate,
        page || pageCount,
        itemsPerPage
      )
    );

  // For download CSV
  const downloadCsv = async (start: Date, end: Date) => {
    try {
      const getAllReportData = await getReport(start, end);
      setDownloadData(getAllReportData.data.assignmentData);
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  const headers = [
    { label: "assignedUserId", key: "assignedUserId" },
    { label: "brandData", key: "brandData.name" },
    { label: "createdAt", key: "createdAt" },
    { label: "inventoryDetailId", key: "inventoryDetailId" },
    { label: "isAssigne", key: "isAssigne" },
    { label: "Previously Used", key: "isPreviouslyUsed" },
    { label: "label", key: "label" },
    { label: "modelData", key: "modelData.name" },
    { label: "updatedAt", key: "updatedAt" },
    { label: "userData", key: "userData.username" },
  ];

  useEffect(() => {
    downloadCsv(state[0].startDate, state[0].endDate);
  }, [state]);

  return (
    <React.Fragment>
      <Loading loading={isLoading}>
        <div id="app">
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
                              Page Limit
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
                            className="d-flex align-items-center"
                            style={{ position: "relative" }}
                          >
                            {showDate && (
                              <div
                                style={{
                                  position: "absolute",
                                  right: "0",
                                  top: "40px",
                                }}
                              >
                                <DateRange
                                  editableDateInputs={true}
                                  onChange={(item) =>
                                    setState([item.selection])
                                  }
                                  moveRangeOnFirstSelection={false}
                                  ranges={state}
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

                              <CSVLink data={downloadData} headers={headers}>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  style={{ marginLeft: "10px" }}
                                >
                                  Download CSV
                                </button>
                              </CSVLink>
                            </div>
                          </div>
                        </div>
                        <div className="table">
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
                </div>
              </section>
            </div>
          </div>
        </div>
      </Loading>
    </React.Fragment>
  );
};

export default Report;
