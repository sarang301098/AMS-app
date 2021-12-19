import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";

import RootState from "../store/types";
import {
  // getBrandsAction,
  // getModelAction,
  getSingleRequestAction,
  newRequestAction,
  updateRequestAction,
  // checkAvailabilityAction
} from "../store/requestStore/request.action";
import { getHeaderNotificationsAction } from "../store/notificationStore/notification.action.async";
import {
  GetInventoryNameActionThunk,
} from "../store/purchases/purchase.actions.async";

const Requests = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const request = useSelector(
    (state: RootState) => state.request.singleRequest
  );

  const userId = useSelector((state: RootState) => state.user.userData._id);

  const inventoryName: object[] | null = useSelector(
    (state: RootState) => state.purchase.inventoryName
  );

  // const assignedInventory = useSelector(
  //   (state: RootState) => state.user.userData.assignedInventory
  // );

  // const inventoryAvailable = useSelector((state:RootState) => state.request.inventoryAvailable)

  // const [inventory, setInventory] = useState<object[] | null>([]);
  const loading = useSelector((state: RootState) => state.request.loading);
  const { id } = useParams<{ id: string }>();

    useEffect(() => {
      dispatch(GetInventoryNameActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  useEffect(() => {
    if (id !== "new") {
      dispatch(getSingleRequestAction(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(request).length > 0 && request.status !== "pending") {
      toast.error("You can not update!", { theme: "colored" });
    }
  }, [request]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const requestSchema = Yup.object().shape({
    descriptionNote: Yup.string().required("Description is Required"),
    priority: Yup.string().required("Priority is required"),
    inventoryName: Yup.string().required(`${t("enterInventoryName")}`),
    // inventory: Yup.string().required(`${t("enterInventoryName")}`),
    // brandId: Yup.string().required(`${t("selectBrand")}`),
    // modelId: Yup.string().required(`${t("selectBrand")}`),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      descriptionNote:
        id === "new" ? "" : (request && request.descriptionNote) || "",
      inventoryName: id === "new" ? "" : (request && request.inventoryName) || "",
      priority: id === "new" ? "" : (request && request.priority) || "",
      // inventory: "Old",
      // brandId: "",
      // modelId: "",
    },
    validationSchema: requestSchema,
    onSubmit: async (values) => {
      if (id !== "new") {
        await dispatch(
          updateRequestAction(
            id,
            () => {
              history.push("/requests");
            },
            {
              ...values,
              // inventoryId: (request && request.inventoryId) || "",
              status: (request && request.status) || "",
            }
          )
        );
      } else {
        await dispatch(
          newRequestAction(() => history.push("/requests"), values)
        );
        dispatch(getHeaderNotificationsAction(userId));
      }
    },
  });

  const { errors, touched } = formik;

  // const checkAvailability = () => {
  //   dispatch(checkAvailabilityAction(formik.values.brandId, formik.values.modelId,formik.values.inventoryName))
  // };

  return (
    <React.Fragment>
      <div id="app">
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
              {request && request.status !== "pending" && <ToastContainer />}

              <div className="card">
                <form
                  className="form-horizontal"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="row flex">
                        <div className="col-xl-8">
                          {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                              <ScaleLoader color="#F7B500" loading={loading} />
                            </div>
                          ) : (
                            <div className="form-row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="control-label">
                                    {t("descriptionNote")}
                                  </label>
                                  <textarea
                                    className="form-control"
                                    {...formik.getFieldProps("descriptionNote")}
                                  />
                                </div>
                                {errors.descriptionNote &&
                                touched.descriptionNote ? (
                                  <div className="text-danger">
                                    {t("descriptionNote")}
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-6 mt-2">
                                <div className="form-group">
                                  <label className="control-label">
                                    {t("priority")}
                                  </label>
                                  <select
                                    className="custom-select form-control select2"
                                    {...formik.getFieldProps("priority")}
                                  >
                                    <option value="">
                                      {" "}
                                      -- {t("priority")} --
                                    </option>
                                    <option value="low">{t("Low")}</option>
                                    <option value="medium">
                                      {t("medium")}
                                    </option>
                                    <option value="high">{t("high")}</option>
                                  </select>
                                </div>
                                {errors.priority && touched.priority ? (
                                  <div className="text-danger">
                                    {t("priorityRequired")}
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-6 mt-2">
                                  <div className="form-group">
                                    <label className="control-label ">
                                      {t("inventoryName")}
                                    </label>
                                    <select
                                      className="custom-select form-control select2"
                                      {...formik.getFieldProps("inventoryName")}
                                    >
                                      <option value="">
                                        -- Select Inventory --
                                      </option>
                                      {(inventoryName || []).map(
                                        (id: any, i: number) => (
                                          <option key={i} value={id.label}>
                                            {id.label}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                  {errors.inventoryName &&
                                  touched.inventoryName ? (
                                    <p className="text-danger mb-0">
                                      {errors.inventoryName}
                                    </p>
                                  ) : null}
                                </div>
                              {/* <div className="col-md-6 mt-2">
                                <label className="me-3">
                                  <input
                                    type="radio"
                                    name="inventory"
                                    value="New"
                                    className=""
                                    defaultChecked={
                                      formik.values.inventory === "New"
                                    }
                                    onChange={async (e) => {
                                      await formik.handleChange(e);
                                      await dispatch(getBrandsAction());
                                      dispatch(GetInventoryNameActionThunk());
                                    }}
                                  />{" "}
                                  New
                                </label>
                                <label>
                                  <input
                                    type="radio"
                                    name="inventory"
                                    value="Old"
                                    defaultChecked={
                                      formik.values.inventory === "Old"
                                    }
                                    onChange={(e) => {
                                      formik.handleChange(e);
                                      setInventory(assignedInventory || []);
                                    }}
                                  />{" "}
                                  Old
                                </label>
                              </div>
                              {formik.values.inventory === "Old" ? (
                                <div className="col-md-6 mt-2">
                                  <div className="form-group">
                                    <label className="control-label ">
                                      {t("inventoryName")}
                                    </label>
                                    <select
                                      className="custom-select form-control select2"
                                      {...formik.getFieldProps("inventoryName")}
                                    >
                                      <option value="">
                                        -- Select Inventory --
                                      </option>
                                      {(inventory || []).map(
                                        (id: any, i: number) => (
                                          <option key={i} value={id.value}>
                                            {id.label}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                  {errors.inventoryName &&
                                  touched.inventoryName ? (
                                    <p className="text-danger mb-0">
                                      {errors.inventoryName}
                                    </p>
                                  ) : null}
                                </div>
                              ) : (
                                <>
                                  
                                  
                                  <div className="col-md-6 mt-2">
                                    <label className="control-label ">
                                      {t("inventoryName")}
                                    </label>
                                    <select
                                      className="custom-select form-control select2"
                                      name="inventoryName"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    >
                                      <option value="">
                                        -- Select Inventory --
                                      </option>
                                      {(inventoryName || []).map(
                                        (id: any, i: number) => (
                                          <option key={i} value={id.label}>
                                            {id.label}
                                          </option>
                                        )
                                      )}
                                    </select>
                                    {errors.inventoryName &&
                                    touched.inventoryName ? (
                                      <p className="text-danger mb-0">
                                        {errors.inventoryName}
                                      </p>
                                    ) : null}
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-primary mt-3 ms-2"
                                    onClick={() => checkAvailability()}
                                  >
                                    Check Availability
                                  </button>
                                </>
                              )} */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-light text-right">
                    <button type="submit" className="btn btn-primary" >
                      {id === "new" ? t("save") : t("update")}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Requests;
