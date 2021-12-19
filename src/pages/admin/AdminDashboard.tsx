import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CountUp } from "use-count-up";
// import { CSVLink } from "react-csv";

import { adminDashboardAction } from "../../store/adminDashboardStore/admin.dashboard.action.async";
import RootState from "../../store/types";
import { Loading } from "../../components/loader/Spinner";
import { Accordion } from "react-bootstrap";
// user dashboard -----


// const helper = (startDate, endDate) => {
//   return `Peerbits Purchases (${moment(startDate)}-${moment(endDate)})`;
// }

// const data = [
//   { firstName: "fahad", lastName: "Mansuri", email: "fahad@1.com", age: "23" },
//   { firstName: "wahib", email: "wahib@2.com", age: "26" },
//   { firstName: "xyz", lastName: "user", email: "xyz@1.com", age: "25" },
//   { firstName: "abc", lastName: "admin", email: "abc@1.com" },
//   { firstName: "efg", lastName: "hij", age: "20" },
// ];
// const headers = [
//   { label: "First Name", key: "firstName" },
//   { label: "Last Name", key: "lastName" },
//   { label: "Email", key: "email" },
//   { label: "Age", key: "age" },
// ];

// const csvReport = {
//   filename: helper(startDate, endDate),
//   headers: headers,
//   data: data,
// };
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const dashboardData = useSelector(
    (state: RootState) => state.adminDashboard.adminDashboardData
  );

  const isLoading: boolean = useSelector(
    (state: RootState) => state.adminDashboard.loading
  );

  useEffect(() => {
    dispatch(adminDashboardAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Loading loading={isLoading}>
        <div id="app">
          <div className="d-block d-lg-none"></div>
          <div className="content-wrapper">
            <div className="content">
              <header className="page-header">
                <div className="d-flex align-items-center">
                  <div className="mr-auto">
                    <h1>{t("dashboard")}</h1>
                  </div>
                </div>
              </header>
              <section className="page-content container-fluid">
                <div className="row">
                  <h1>{t("brandsAndModel")} </h1>
                  <div className="col-md-2 col-lg-5 col-xl-2">
                    <div
                      className="card card-body"
                      style={{ textAlign: "center" }}
                    >
                      <h2 className="card-title m-b-5 font-weight-500 text-success">
                        <CountUp
                          isCounting
                          start={0}
                          end={dashboardData.totalBrandCount}
                          duration={3.2}
                        />
                      </h2>
                      <h6 className="text-muted m-t-10 font-weight-500">
                        {t("brands")}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-5 col-xl-2">
                    <div
                      className="card card-body"
                      style={{ textAlign: "center" }}
                    >
                      <h2 className="card-title m-b-5 font-weight-500 text-success">
                        <CountUp
                          isCounting
                          start={0}
                          end={dashboardData.totalModelCount}
                          duration={3.2}
                        />
                      </h2>
                      <h6 className="text-muted m-t-10 font-weight-500">
                        {t("models")}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <h1>{t("requests")}</h1>
                  <div className="col-md-2 col-lg-5 col-xl-2">
                    <div
                      className="card card-body"
                      style={{ textAlign: "center" }}
                    >
                      <h2 className="card-title m-b-5 font-weight-500 text-success">
                        <CountUp
                          isCounting
                          start={0}
                          end={
                            dashboardData.adminDashboardRequest.processing || 0
                          }
                          duration={3.2}
                        />
                      </h2>
                      <h6 className="text-muted m-t-10 font-weight-500">
                        {t("processing")}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-5 col-xl-2">
                    <div
                      className="card card-body"
                      style={{ textAlign: "center" }}
                    >
                      <h2 className="card-title m-b-5 font-weight-500 text-success">
                        <CountUp
                          isCounting
                          start={0}
                          end={
                            dashboardData.adminDashboardRequest.completed || 0
                          }
                          duration={3.2}
                        />
                      </h2>
                      <h6 className="text-muted m-t-10 font-weight-500">
                        {t("completed")}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-5 col-xl-2">
                    <div
                      className="card card-body"
                      style={{ textAlign: "center" }}
                    >
                      <h2 className="card-title m-b-5 font-weight-500 text-success">
                        <CountUp
                          isCounting
                          start={0}
                          end={
                            dashboardData.adminDashboardRequest.rejected || 0
                          }
                          duration={3.2}
                        />
                      </h2>
                      <h6 className="text-muted m-t-10 font-weight-500">
                        {t("rejected")}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-5 col-xl-2">
                    <div
                      className="card card-body"
                      style={{ textAlign: "center" }}
                    >
                      <h2 className="card-title m-b-5 font-weight-500 text-success">
                        <CountUp
                          isCounting
                          start={0}
                          end={dashboardData.adminDashboardRequest.pending || 0}
                          duration={3.2}
                        />
                      </h2>
                      <h6 className="text-muted m-t-10 font-weight-500">
                        {t("pending")}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <h1>{t("inventory")}</h1>
                  {dashboardData.adminDashboardInventory
                    ? dashboardData.adminDashboardInventory.map((i, id) => (
                        <div className="col-md-3 col-lg-6 col-xl-3" key={id}>
                          <div
                            className="card card-body"
                            style={{ textAlign: "center" }}
                          >
                            <Accordion style={{ textAlign: "left" }}>
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                  {i.inventoryName}
                                </Accordion.Header>
                                <Accordion.Body>
                                  <p>
                                    {t("availableUnits")}: {i.availableUnits}
                                  </p>
                                  <p>
                                    {t("totalUnits")}: {i.totalUnits}
                                  </p>
                                  <p>
                                    {t("assignUnits")}: {i.assignedUnits}
                                  </p>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </section>
            </div>
          </div>
        </div>
        {/* <CSVLink {...csvReport}>DOwnload File</CSVLink> */}
      </Loading>
    </React.Fragment>
  );
};

export default AdminDashboard;
