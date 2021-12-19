import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import moment from "moment";
import * as Yup from "yup";

import RootState from "../../store/types";
import { Loading } from "../../components/loader/Spinner";
import {
  GetBrandIdActionThunk,
  GetModelIdActionThunk,
  PurchaseEntryActionThunk,
  GetInventoryNameActionThunk,
} from "../../store/purchases/purchase.actions.async";
import { getBrandAction } from "../../store/brandStore/brand.action.async";
import AddNewBrandAndModel from "../../components/adminComponents/newModelAndBrand/AddNewBrandAndModel";
import { getAdminHeaderNotificationsAction } from "../../store/adminNotificationStore/admin.notification.action.async";

const Purchases = () => {
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddInventoryName, setShowAddInventoryName] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isLoading: boolean = useSelector(
    (state: RootState) => state.purchase.loading
  );

  const brandIds: object[] | null = useSelector(
    (state: RootState) => state.purchase.brandId
  );

  const inventoryName: object[] | null = useSelector(
    (state: RootState) => state.purchase.inventoryName
  );

  const modelIds: object[] | null = useSelector(
    (state: RootState) => state.purchase.modelId
  );

  const { brandOptions } = useSelector(
    (state: RootState) => state.brand.brands
  );

  const { modelOptions } = useSelector(
    (state: RootState) => state.model.models
  );

  const purchasesSchema = Yup.object().shape({
    BrandId: Yup.string().required(`${t("selectBrand")}`),
    modelId: Yup.string().required(`${t("selectModel")}`),
    PurchasedDate: Yup.date().required(`${t("selectDate")}`),
    units: Yup.number()
      .positive(`${t("positiveNumber")}`)
      .required(`${t("enterTotalUnits")}`),
    singleUnitAmount: Yup.number()
      .positive(`${t("positiveNumber")}`)
      .required(`${t("enterSingleUnitAmount")}`),
    totalAmount: Yup.number().positive(`${t("positiveNumber")}`),
    inventoryName: Yup.string().required(`${t("enterInventoryName")}`),
    discountAmount: Yup.number().positive(`${t("positiveNumber")}`),
  });

  const formik = useFormik({
    initialValues: {
      BrandId: "",
      PurchasedDate: "",
      units: "",
      singleUnitAmount: "",
      totalAmount: "",
      inventoryName: "",
      modelId: "",
      discountAmount: "",
    },
    validationSchema: purchasesSchema,
    onSubmit: async (values, { resetForm }) => {
      Promise.resolve(
        dispatch(
          PurchaseEntryActionThunk(
            {
              brandId: values.BrandId,
              purchasedDate: moment(values.PurchasedDate).toDate(),
              units: +values.units,
              singleUnitAmount: +values.singleUnitAmount,
              totalAmount:
                Number(values.units) * Number(values.singleUnitAmount) -
                Number(values.discountAmount),
              inventoryName: values.inventoryName,
              modelId: values.modelId,
            },
            history,
            isRedirect
          )
        )
      ).then(() =>
        setTimeout(() => {
          dispatch(getAdminHeaderNotificationsAction());
        }, 500)
      );

      resetForm();
    },
  });

  const { errors, touched } = formik;

  const addNewModal = () => {
    setShowAddModal(true);
    dispatch(getBrandAction());
  };

  const saveAndRedirect = () => {
    formik.handleSubmit();
    setIsRedirect(true);
  };

  const saveAndReturn = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    dispatch(GetBrandIdActionThunk());
  }, [brandOptions, dispatch]);

  useEffect(() => {
    dispatch(GetModelIdActionThunk(formik.values.BrandId));
  }, [modelOptions, formik.values.BrandId, dispatch]);

  useEffect(() => {
    dispatch(GetInventoryNameActionThunk());
  }, [dispatch]);

  return (
    <React.Fragment>
      <ToastContainer />
      <AddNewBrandAndModel
        formik={formik}
        brandOptions={brandOptions}
        showAddBrand={showAddBrand}
        showAddModal={showAddModal}
        showAddInventoryName={showAddInventoryName}
        setShowAddInventoryName={setShowAddInventoryName}
        setShowAddModal={setShowAddModal}
        setShowAddBrand={setShowAddBrand}
      />
      <Loading loading={isLoading}>
        <div id="app">
          <div className="content-wrapper">
            <div className="content">
              <header className="page-header">
                <div className="d-flex align-items-center">
                  <div className="mr-auto">
                    <h1>{t("purchasesOrder")}</h1>
                  </div>
                </div>
              </header>
              <section className="page-content container-fluid">
                <div className="card">
                  <form className="form-horizontal">
                    <div className="card-body px-4">
                      <div className="mt-3 d-flex flex-wrap">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="control-label ">
                              {t("brandId")}
                            </label>
                            <div className="col-md-10">
                              <select
                                className="custom-select form-control select2"
                                {...formik.getFieldProps("BrandId")}
                              >
                                <option value="">
                                  -- {t("selectBrandId")} --
                                </option>
                                {(brandIds || []).map((id: any, i: number) => (
                                  <option key={i} value={id.value}>
                                    {id.label}
                                  </option>
                                ))}
                              </select>
                              {errors.BrandId && touched.BrandId ? (
                                <p className="text-danger mb-0">
                                  {errors.BrandId}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label">
                              {t("modelId")}
                            </label>
                            <div className="col-md-10">
                              <select
                                className="custom-select form-control select2"
                                {...formik.getFieldProps("modelId")}
                              >
                                <option value="">
                                  -- {t("selectModelId")} --
                                </option>
                                {(modelIds || []).map(
                                  (id: any, i: number) =>
                                    formik.values.BrandId && (
                                      <option key={i} value={id.value}>
                                        {id.label}
                                      </option>
                                    )
                                )}
                              </select>

                              {errors.modelId && touched.modelId ? (
                                <p className="text-danger mb-0">
                                  {formik.values.BrandId &&
                                  modelIds &&
                                  modelIds.length === 0
                                    ? `${t("addNewModel")}`
                                    : errors.modelId}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label">{t("date")}</label>
                            <div className="col-md-10">
                              <input
                                type="date"
                                className="form-control"
                                name="PurchasedDate"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.PurchasedDate}
                              />
                              {errors.PurchasedDate && touched.PurchasedDate ? (
                                <p className="text-danger mb-0">
                                  {errors.PurchasedDate}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label">
                              {t("units")}
                            </label>
                            <div className="col-md-10">
                              <input
                                placeholder="Enter Total Units"
                                type="number"
                                className="form-control"
                                name="units"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.units}
                                min={1}
                              />
                              {errors.units && touched.units ? (
                                <p className="text-danger mb-0">
                                  {errors.units}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="control-label">
                              {t("singleUnitAmount")}
                            </label>
                            <div className="col-md-10">
                              <input
                                placeholder="Enter Single Unit Amount"
                                type="number"
                                className="form-control"
                                name="singleUnitAmount"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.singleUnitAmount}
                                min={1}
                              />
                              {errors.singleUnitAmount &&
                              touched.singleUnitAmount ? (
                                <p className="text-danger mb-0">
                                  {errors.singleUnitAmount}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="d-flex align-items-center">
                              <label className="control-label">
                                Any Discount?
                              </label>
                              <input
                                type="checkbox"
                                checked={discount}
                                onChange={() => setDiscount(!discount)}
                              />
                            </div>
                            <div className="col-md-10">
                              {discount && (
                                <input
                                  placeholder="Enter Discount Amount"
                                  type="number"
                                  className="form-control"
                                  name="discountAmount"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.discountAmount}
                                  min={0}
                                />
                              )}
                              {errors.discountAmount &&
                              touched.discountAmount ? (
                                <p className="text-danger mb-0">
                                  {errors.discountAmount}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label">
                              {t("totalAmount")}
                            </label>
                            <div className="col-md-10">
                              <input
                                placeholder="Enter Total Amount"
                                type="number"
                                className="form-control"
                                name="totalAmount"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  Number(formik.values.units) *
                                    Number(formik.values.singleUnitAmount) -
                                  Number(formik.values.discountAmount)
                                }
                                readOnly
                              />
                              {errors.totalAmount && touched.totalAmount ? (
                                <p className="text-danger mb-0">
                                  {errors.totalAmount}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label ">
                              {t("inventoryName")}
                            </label>
                            <div className="col-md-10">
                              <select
                                className="custom-select form-control select2"
                                {...formik.getFieldProps("inventoryName")}
                              >
                                <option value="">-- Select Inventory --</option>
                                {(inventoryName || []).map(
                                  (id: any, i: number) => (
                                    <option key={i} value={id.label}>
                                      {id.label}
                                    </option>
                                  )
                                )}
                              </select>
                              {errors.inventoryName && touched.inventoryName ? (
                                <p className="text-danger mb-0">
                                  {errors.inventoryName}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card-footer text-right"
                        style={{ paddingLeft: "0" }}
                      >
                        <button
                          onClick={saveAndRedirect}
                          type="button"
                          className="btn btn-primary"
                          style={{ marginRight: "10px" }}
                        >
                          Save
                        </button>
                        <button
                          onClick={saveAndReturn}
                          type="button"
                          className="btn btn-primary"
                          style={{ marginRight: "10px" }}
                        >
                          Save & Return
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary clear-form "
                          onClick={addNewModal}
                          style={{ marginRight: "10px" }}
                        >
                          New Model
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary clear-form ml-2"
                          onClick={() => setShowAddBrand(true)}
                          style={{ marginRight: "10px" }}
                        >
                          New Brand
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary clear-form ml-2"
                          onClick={() => setShowAddInventoryName(true)}
                        >
                          New Inventory
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Loading>
    </React.Fragment>
  );
};

export default Purchases;
