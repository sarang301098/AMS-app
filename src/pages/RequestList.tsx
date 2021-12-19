import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Pagination from "../components/Pagination/Pagination";
import RequestItems from "../components/Pagination/RequestListItems";
import { getRequestsAction } from "../store/requestStore/request.action";
import RootState from "../store/types";

const pageCount = 1;

const RequestList: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const requestData = useSelector(
    (state: RootState) => state.request.requestData
  );
  const [filter, setFilter] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);
  const fetchRequests = (page?: number) =>
    dispatch(getRequestsAction(page || pageCount, itemsPerPage, filter));

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
                      ItemsComponent={RequestItems}
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
