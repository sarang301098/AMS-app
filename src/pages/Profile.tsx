import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";
import { Tabs, Tab } from "react-bootstrap";
import { Route } from "react-router-dom";

import ContactEdit from "../components/Profile/ContactEdit";
import GeneralEdit from "../components/Profile/GeneralEdit";
import Overview from "../components/Profile/Overview";
import Address from "../components/Profile/Address";

const Profile = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);
  const { t } = useTranslation();
  useEffect(() => {
    if (path !== pathname) {
      setPath(pathname);
    }
  }, [path, pathname]);
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
                  defaultActiveKey="/profile/overview"
                  id="uncontrolled-tab-example"
                  style={{margin:"0%"}}
                >
                  <Tab eventKey="/profile/overview" title={t("overview")}>
                    <Route
                      exact
                      path="/profile/overview"
                      component={Overview}
                    />
                  </Tab>
                  <Tab eventKey="/profile/general" title={t("generalEdit")}>
                    <Route
                      exact
                      path="/profile/general"
                      component={GeneralEdit}
                    />
                  </Tab>
                  <Tab eventKey="/profile/contact" title={t("contactEdit")}>
                    <Route
                      exact
                      path="/profile/contact"
                      component={ContactEdit}
                    />
                  </Tab>
                  {/* <Tab eventKey="/profile/inventory" title={t("inventory")}>
                    <Route
                      exact
                      path="/profile/inventory"
                      component={Inventory}
                    />
                  </Tab> */}
                  <Tab eventKey="/profile/address" title={t("address")}>
                    <Route exact path="/profile/address" component={Address} />
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

export default Profile;
