import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { loadInfoFromServer } from "../../store/dashboard/dashboard.actions";
import RootState from "../../store/types";
import { Loading } from "../loader/Spinner";
import { Accordion } from "react-bootstrap";
import moment from "moment";
import { CountUp } from "use-count-up";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const dashboardInventoryData = useSelector(
    (state: RootState) =>
      state.dashboard.dashboardData.userDashboardInventory || []
  );
  const dashboardRequestData = useSelector(
    (state: RootState) => state.dashboard.dashboardData.userDashboardRequest
  );
  const userId = useSelector((state: RootState) => state.user.userData._id);
  const isLoading: boolean = useSelector(
    (state: RootState) => state.dashboard.loading
  );

  useEffect(() => {
    dispatch(loadInfoFromServer(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
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
                            dashboardRequestData &&
                            (dashboardRequestData.completed || 0)
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
                            dashboardRequestData &&
                            (dashboardRequestData.rejected || 0)
                          }
                          duration={3.2}
                        />
                      </h2>
                      <h6 className="text-muted m-t-10 font-weight-500">
                        {t("rejected")}
                      </h6>
                    </div>
                  </div>
                </div>
              </section>
              <section className="page-content container-fluid">
                <div className="row">
                  <h1>{t("inventory")}</h1>
                  {dashboardInventoryData.map((i, id: number) => (
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
                              <p>Label : {i.label}</p>
                              <p>Brand : {i.brandName}</p>
                              <p>Model : {i.modelName}</p>
                              <p>
                                Assigned Date :{" "}
                                {moment(i.assignedAt).format("DD-MM-YYYY")}
                              </p>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </Loading>
    </React.Fragment>
  );
}
