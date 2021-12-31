import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Tabs, Tab } from "react-bootstrap";
import { Route } from "react-router-dom";
import ContactEdit from "../../components/adminComponents/admin-profile/ContactEdit";
import GeneralEdit from "../../components/adminComponents/admin-profile/GeneralEdit";
import Overview from "../../components/adminComponents/admin-profile/Overview";
import Address from "../../components/adminComponents/admin-profile/Address";
import { useTranslation } from "react-i18next";

const AdminProfile = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);
  const { t } = useTranslation();
  useEffect(() => {
    if (path !== pathname) {
      setPath(pathname);
    }
  }, [path, pathname]);

  // throw new Error("Something went wrong!!!")
  return (
    <React.Fragment>
      <div id="app">
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>{t("Profile")}</h1>
                </div>
                <div className="m-l-10"></div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs">
                <div className="card-header">
                  <Tabs
                    onSelect={(eventKey: any) => {
                      history.push(eventKey);
                      setPath(eventKey);
                    }}
                    activeKey={path}
                    defaultActiveKey="/admin/profile/overview"
                    id="uncontrolled-tab-example"
                    style={{ margin: "0%" }}
                  >
                    <Tab
                      eventKey="/admin/profile/overview"
                      title={t("overview")}
                    >
                      <Route
                        exact
                        path="/admin/profile/overview"
                        component={Overview}
                      />
                    </Tab>
                    <Tab
                      eventKey="/admin/profile/general"
                      title={t("generalEdit")}
                    >
                      <Route
                        exact
                        path="/admin/profile/general"
                        component={GeneralEdit}
                      />
                    </Tab>
                    <Tab
                      eventKey="/admin/profile/contact"
                      title={t("contactEdit")}
                    >
                      <Route
                        exact
                        path="/admin/profile/contact"
                        component={ContactEdit}
                      />
                    </Tab>
                    <Tab
                      eventKey="/admin/profile/inventory"
                      title={t("inventory")}
                    ></Tab>
                    <Tab eventKey="/admin/profile/address" title={t("address")}>
                      <Route
                        exact
                        path="/admin/profile/address"
                        component={Address}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminProfile;
