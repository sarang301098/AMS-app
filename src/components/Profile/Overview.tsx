import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import RootState from "../../store/types";

export default function Overview() {
  const overViewData = useSelector((state: RootState) => state.user.userData!);
  const { t } = useTranslation();
  const general = overViewData.general;
  const contact = overViewData.contact;
  const address = Object.values(overViewData.address).join(" ");
  return (
    <div>
      <div className="card-body">
        <div className="media">
          <div className="media-body">
            <div className="row">
              <div className="col-lg-12 col-xl-10">
                <h2 className="mt-0 mb-3 text-info">{overViewData.username}</h2>
                <ul className="list-unstyled text-left row mb-0">
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">{t("firstName")}</label>
                    <br />
                    {general["fName"]}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">{t("middleName")}</label>
                    <br />
                    {general["mName"]}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">{t("lastName")}</label>
                    <br />
                    {general["lName"]}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">{t("gender")}</label>
                    <br />
                    {general["gender"]}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">{t("dob")}</label>
                    <br />
                    {moment(general["dob"]).format("DD-MM-YYYY")}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">{t("workEmail")}</label>
                    <br />
                    {contact["workEmail"]}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">
                      {t("personalEmail")}
                    </label>
                    <br />
                    {contact["personalEmail"]}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">{t("workPhone")}</label>
                    <br />
                    {contact["workPhone"]}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">
                      {t("personalPhone")}
                    </label>
                    <br />
                    {contact["personalPhone"]}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">
                      {t("residencePhone")}
                    </label>
                    <br />
                    {contact["residencePhone"]}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">{t("Email")}</label>
                    <br /> {overViewData.email}
                  </li>
                  <li className="mb-3 col-md-6">
                    <label className="text-muted mb-1">{t("Address")}</label>
                    <br />
                    {address}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
