import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import moment from "moment";

import { RequestPayload } from "../../store/requestStore/types";
import RootState from "../../store/types";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  deleteRequestAction,
  getRequestsAction,
} from "../../store/requestStore/request.action";
import ModalDelete from "../Modals/ModalDelete";
import ModalView from "../Modals/ModalView";

interface Prop {
  itemsPerPage: number;
  filter: string;
  page: number;
  setItemsPerPage: Function;
  setFilter: Function;
}

const RequestItems: React.FC<Prop> = ({
  itemsPerPage,
  filter,
  page,
  setItemsPerPage,
  setFilter,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentRequests = useSelector(
    (state: RootState) => state.request.requestData.requests
  );
  const currentRequestCount = useSelector(
    (state: RootState) => state.request.requestData.count
  );
  const loading = useSelector((state: RootState) => state.request.loading);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [modalViewDetails, setModalViewDetails] = useState({});
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    if (
      currentRequests &&
      currentRequests.length === 0 &&
      currentRequestCount > 0
    ) {
      dispatch(getRequestsAction(1, itemsPerPage, filter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRequestCount, dispatch]);

  const showDeleteModal = (itemId: string) => {
    setShowModalDelete(true);
    setRequestId(() => itemId);
  };
  const deleteReq = async () => {
    await dispatch(deleteRequestAction(requestId));
    if (
      !(
        currentRequests &&
        currentRequests.length === 0 &&
        currentRequestCount > 0
      )
    ) {
      dispatch(getRequestsAction(page || 1, itemsPerPage, filter));
    }
  };

  return (
    <>
      <ModalDelete
        show={showModalDelete}
        hideModal={() => setShowModalDelete(false)}
        deleteAction={deleteReq}
      />
      <ModalView
        viewDetails={{ ...modalViewDetails, title: "Request" }}
        show={showModalView}
        hideModal={() => setShowModalView(false)}
      />
      <div className="p-3 d-flex justify-content-between inner-filter">
        <div className="d-flex justify-content-center align-items-center">
          <label style={{ fontSize: "1rem" }}>{t("pageLimit")}: </label>
          &nbsp;
          <select
            defaultValue={10}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="custom-select form-control select2 w-150"
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="d-flex align-items-center">
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="custom-select form-control select2 w-150"
            >
              <option value="all">{t("all")}</option>
              <option value="pending">{t("pending")}</option>
              <option value="completed">{t("completed")}</option>
              <option value="processing">{t("processing")}</option>
              <option value="rejected">{t("rejected")}</option>
            </select>
          </div>
          <div className="m-l-10">
            <button
              onClick={() =>
                dispatch(getRequestsAction(page || 1, itemsPerPage, filter))
              }
              type="button"
              className="btn btn-secondary"
            >
              {t("submit")}
            </button>
          </div>
          <div className="m-l-10">
            <Link to="requests/new">
              <button type="button" className="btn btn-success">
                {t("newRequest")}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="table-responsive"
        style={{ minHeight: "calc(100vh - 300px)", overflowX: "unset" }}
      >
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>{t("inventoryName")}</th>
              <th style={{ width: "40%" }}>{t("description")}</th>
              <th style={{ width: "10%" }}>{t("priority")}</th>
              <th style={{ width: "10%" }}>{t("status")}</th>
              <th style={{ width: "15%" }}>{t("dateTime")}</th>
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
            ) : currentRequests && currentRequests.length > 0 ? (
              currentRequests.map((item: RequestPayload) => (
                <tr key={item && item._id}>
                  <td>{item && item.inventoryName}</td>
                  <td>{item && item.descriptionNote}</td>
                  <td>{item && t(item.priority)}</td>
                  <td>
                    <span
                      className={
                        "badge rounded-pill " + item.status + " text-dark"
                      }
                    >
                      {t(item.status)}
                    </span>
                  </td>
                  <td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm")} </td>
                  <td className="table-field-actions">
                    <Dropdown align="end" className="btn-group">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btn btn-sm btn-icon-only"
                      >
                        <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="w-150"
                        style={{
                          height: item.status === "pending" ? "175px" : "70px",
                        }}
                      >
                        <Dropdown.Item
                          onClick={() => {
                            setRequestId(item._id);
                            setShowModalView(true);
                            setModalViewDetails(item);
                          }}
                        >
                          <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                          {t("view")}
                        </Dropdown.Item>
                        {item.status === "pending" ? (
                          <>
                            {" "}
                            <Dropdown.Item
                              as={Link}
                              to={{ pathname: "/requests/" + item["_id"] }}
                            >
                              <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                              {t("edit")}
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => showDeleteModal(item._id)}
                            >
                              <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                              {t("delete")}
                            </Dropdown.Item>{" "}
                          </>
                        ) : null}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestItems;
