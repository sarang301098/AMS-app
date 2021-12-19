import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";

import RootState from "../../store/types";
import ScaleLoader from "react-spinners/ScaleLoader";
import PurchaseModalView from "../Modals/PurchaseModalView";

const PurchaseListItems: React.FC = () => {
  const [showModalView, setShowModalView] = useState(false);
  const [modalViewDetails, setModalViewDetails] = useState({});
  const { t } = useTranslation();

  const loading = useSelector((state: RootState) => state.purchase.loading);
  const purchaseEntryList = useSelector(
    (state: RootState) => state.purchase.purchase
  );

  return (
    <>
      <PurchaseModalView
        viewDetails={{ ...modalViewDetails, title: "Purchase" }}
        show={showModalView}
        hideModal={() => setShowModalView(false)}
      />
      <div
        className="table-responsive"
        style={{ minHeight: "calc(100vh - 300px)" }}
      >
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>{t("inventoryName")}</th>
              <th style={{ width: "10%" }}>{t("units")}</th>
              <th style={{ width: "15%" }}>{t("singleUnitAmount")}</th>
              <th style={{ width: "15%" }}>{t("totalAmount")}</th>
              <th style={{ width: "20%" }}>{t("purchasedDate")}</th>
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
            ) : purchaseEntryList.purchaseEntries &&
              purchaseEntryList.purchaseEntries.length > 0 ? (
              purchaseEntryList.purchaseEntries.map((item: any) => (
                <tr key={item._id}>
                  <td>{item.inventoryName}</td>
                  <td>{item.units}</td>
                  <td>{item.singleUnitAmount}</td>
                  <td>{item.totalAmount}</td>
                  <td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm")} </td>
                  <td className="table-field-actions">
                    <i
                      onClick={() => {
                        setShowModalView(true);
                        setModalViewDetails(item);
                      }}
                      role="button"
                      className="fa fa-info-circle fa-fw text-accent-custom"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No Inventory available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PurchaseListItems;
