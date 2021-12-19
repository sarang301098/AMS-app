import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import RootState from "../../store/types";
import Pagination from "../../components/Pagination/Pagination";
import AdminRequestItems from "../../components/Pagination/AdminRequestListItems";
import { getAdminRequestAction } from "../../store/adminRequestStore/admin.request.action.async";

const pageCount = 1;

const RequestList: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const requestData = useSelector(
    (state: RootState) => state.adminRequest.requestData
  );
  const [filter, setFilter] = useState("pending");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);
  const fetchRequests = (page?: number) =>
    dispatch(getAdminRequestAction(page || pageCount, itemsPerPage, filter));

  return (
    <div id="app">
      <ToastContainer />
      <div className="content-wrapper">
        <div className="content">
          <header className="page-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h1>{t("request")}</h1>
              </div>
            </div>
          </header>
          <section className="page-content container-fluid">
            <div className="card card-tabs clearfix">
              <div className="card-body p-0">
                <div className="tab-content">
                  <div className="tab-pane fadeIn active" id="tab-1">
                    <Pagination
                      ItemsComponent={AdminRequestItems}
                      itemsPerPage={itemsPerPage}
                      pageCount={requestData ? requestData.count : 1}
                      dispatchAction={fetchRequests}
                      filter={filter}
                      setItemsPerPage={setItemsPerPage}
                      setFilter={setFilter}
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

export default RequestList;
