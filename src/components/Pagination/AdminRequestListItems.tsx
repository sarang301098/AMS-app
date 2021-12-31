import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import moment from "moment";

import RootState from "../../store/types";
import { Dropdown } from "react-bootstrap";
import ModalView from "../Modals/ModalView";
import ModalAdd from "../Modals/ModalAdd";
import { IAdminRequestPayload } from "../../store/adminRequestStore/types";
import {
  assignInventoryAction,
  checkAvailableBrandAction,
  checkAvailableModelAction,
  updateAdminRequestAction,
} from "../../store/adminRequestStore/admin.request.action.async";
import { getAdminRequestAction } from "../../store/adminRequestStore/admin.request.action.async";
import { debounce } from "lodash";
import { useFormik } from "formik";
import { checkAvailabilityAction } from "../../store/adminRequestStore/admin.request.action.async";
import { assignInventory } from "../../store/adminRequestStore/admin.request.action.creators";
// import { getAdminHeaderNotificationsAction } from "../../store/adminNotificationStore/admin.notification.action.async";

interface Prop {
  itemsPerPage: number;
  filter: string;
  page: number;
  setItemsPerPage: Function;
  setFilter: Function;
}

const pageCount = 1;

const AdminRequestList: React.FC<Prop> = ({
  itemsPerPage,
  filter,
  page,
  setItemsPerPage,
  setFilter,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [showModalView, setShowModalView] = useState(false);
  const [modalViewDetails, setModalViewDetails] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [request, setRequest] = useState({ name: "", id: "" });
  const [updateFilter, setUpdateFilter] = useState("processing");

  const loading = useSelector((state: RootState) => state.adminRequest.loading);
  const currentRequests = useSelector(
    (state: RootState) => state.adminRequest.requestData.requests
  );
  const brandIds = useSelector(
    (state: RootState) => state.adminRequest.availableBrands.brandOptions
  );
  const modelIds = useSelector(
    (state: RootState) => state.adminRequest.availableModels.modelOptions
  );
  const availableInventory = useSelector(
    (state: RootState) => state.adminRequest.availableInventory
  );

  useEffect(() => {
    fetchRequests();
    return () => {
      searchUser.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage, filter]);

  const fetchRequests = (page?: number) =>
    dispatch(getAdminRequestAction(page || pageCount, itemsPerPage, filter));

  const searchUser = useMemo(
    () =>
      debounce((name: string) => {
        dispatch(
          getAdminRequestAction(
            page || pageCount,
            itemsPerPage,
            filter,
            name || undefined
          )
        );
      }, 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {}, [availableInventory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brandId: "",
      modelId: "",
    },
    onSubmit: async (values) => {
    },
  });

  const { errors, touched } = formik;
  console.log(availableInventory);
  return (
    <>
      <ModalView
        viewDetails={{ ...modalViewDetails, title: "Request" }}
        show={showModalView}
        hideModal={() => setShowModalView(false)}
      />
      <ModalAdd
        show={showAddModal}
        hideModal={() => {
          setShowAddModal(false);
          setUpdateFilter(filter === "pending" ? "pending" : "processing");
          dispatch(assignInventory())
        }}
        title="Status"
      >
        <div style={{ display: "grid", placeItems: "center" }}>
          <div className="row">
            <div className="col-md-6">
              <select
                value={updateFilter}
                onChange={(e) => {
                  setUpdateFilter(e.target.value);
                  if (e.target.value === "assign") {
                    dispatch(checkAvailableBrandAction(request.name));
                  }
                }}
                className="custom-select form-control select2 w-150"
              >
                {filter !== "processing" ? (
                  <option value="processing">{t("processing")} </option>
                ) : null}
                <option value="completed">{t("completed")}</option>
                <option value="rejected">{t("rejected")}</option>
                <option value="assign">{t("assign")}</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                value={request.name}
                readOnly
              />
            </div>
          </div>
          {updateFilter === "assign" && (
            <>
              <div className="col-md-6 mt-2">
                <div className="form-group">
                  {brandIds && brandIds.length > 0 && (
                    <>
                      <label className="control-label ">{t("brandId")}</label>
                      <select
                        className="custom-select form-control select2"
                        name="brandId"
                        onChange={(e) => {
                          formik.handleChange(e);
                          dispatch(
                            checkAvailableModelAction(
                              request.name,
                              e.target.value
                            )
                          );
                        }}
                      >
                        <option value="">-- {t("selectBrandId")} --</option>
                        {(brandIds || []).map((id: any, i: number) => (
                          <option key={i} value={id.value}>
                            {id.label}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>
              {brandIds && brandIds.length > 0 ? (
                <div className="col-md-6 mt-2">
                  <div className="form-group">
                    <label className="control-label">{t("modelId")}</label>
                    <select
                      className="custom-select form-control select2"
                      name="modelId"
                      value={formik.values.modelId}
                      onChange={(e) => {
                        formik.handleChange(e);
                        dispatch(
                          checkAvailabilityAction(
                            formik.values.brandId,
                            e.target.value,
                            request.name
                          )
                        );
                      }}
                    >
                      <option value="">-- {t("selectModelId")} --</option>
                      {(modelIds || []).map(
                        (id: any, i: number) =>
                          formik.values.brandId && (
                            <option key={i} value={id.value}>
                              {id.label}
                            </option>
                          )
                      )}
                    </select>
                    {errors.modelId && touched.modelId ? (
                      <p className="text-danger mb-0">
                        {formik.values.brandId &&
                        modelIds &&
                        modelIds.length === 0
                          ? `${t("addNewModel")}`
                          : errors.modelId}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          )}
          <div className="m-l-10" style={{ marginTop: "1rem" }}>
            <button
              disabled={
                updateFilter === "assign" &&
                Object.keys(availableInventory).length === 0
                  ? true
                  : false
              }
              onClick={async () => {
                setShowAddModal(false);
                if (updateFilter === "assign") {
                  await dispatch(
                    assignInventoryAction(availableInventory._id, request.id)
                  );
                } else {
                  await dispatch(
                    updateAdminRequestAction(updateFilter, request.id)
                  );
                }
                fetchRequests(page);
                setUpdateFilter(() =>
                  filter === "pending" ? "pending" : "processing"
                );
              }}
              type="submit"
              className="btn btn-primary"
            >
              {t("submit")}
            </button>
          </div>
        </div>
      </ModalAdd>
      <div className="tab-pane fadeIn active" id="tab-1">
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
            <div className="me-3">
              <input
                placeholder="User Name"
                type="text"
                className="form-control"
                onChange={(e) => {
                  searchUser(e.target.value);
                }}
              />
            </div>
            <div>
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                className="custom-select form-control select2 w-150"
              >
                <option value="pending">{t("pending")}</option>
                <option value="completed">{t("completed")}</option>
                <option value="processing">{t("processing")} </option>
                <option value="rejected">{t("rejected")}</option>
              </select>
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
                <th style={{ width: "15%" }}>{t("name")}</th>
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
                currentRequests.map((item: IAdminRequestPayload) => (
                  <tr key={item && item._id}>
                    <td>
                      {item && item.userData.username
                        ? item.userData.username
                        : item.userData.general.fName +
                          item.userData.general.mName +
                          item.userData.general.lName}
                    </td>
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
                    <td>
                      {moment(item.createdAt).format("DD/MM/YYYY hh:mm")}{" "}
                    </td>
                    <td className="table-field-actions">
                      <Dropdown align="end" className="btn-group">
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="btn btn-sm btn-icon-only"
                        >
                          <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-150">
                          <Dropdown.Item
                            onClick={() => {
                              setShowModalView(true);
                              setModalViewDetails(item);
                            }}
                          >
                            <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                            {t("view")}
                          </Dropdown.Item>
                          {item.status === "pending" ||
                          item.status === "processing" ? (
                            <>
                              {" "}
                              <Dropdown.Item
                                onClick={() => {
                                  setShowAddModal(true);
                                  setRequest(
                                    item && {
                                      id: item._id,
                                      name: item.inventoryName,
                                    }
                                  );
                                }}
                              >
                                <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                                {t("edit")}
                              </Dropdown.Item>
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
      </div>
    </>
  );
};

export default AdminRequestList;
