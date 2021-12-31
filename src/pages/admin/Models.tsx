import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

import ModalAdd from "../../components/Modals/ModalAdd";
import { getBrandAction } from "../../store/brandStore/brand.action.async";
import RootState from "../../store/types";
import { ScaleLoader } from "react-spinners";
import {
  addModelAction,
  deleteModelAction,
  getModelAction,
} from "../../store/modelStore/model.action.async";
import ModalDelete from "../../components/Modals/ModalDelete";

const Models = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { brandOptions } = useSelector(
    (state: RootState) => state.brand.brands
  );

  const models = useSelector((state: RootState) => state.model.models || []);
  const { modelOptions } = models;
  const loading = useSelector(
    (state: RootState) => state.model.loading || false
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modelId, setModelId] = useState("");
  const [selectedBrand, setSelectedBrand] = useState({ label: "", value: "" });

  useEffect(() => {
    dispatch(getBrandAction());
  }, [dispatch]);

  useEffect(() => {
    if (brandOptions.length > 0) {
      dispatch(getModelAction(brandOptions[0].value));
    }
  }, [brandOptions, dispatch]);

  useEffect(() => {}, [models]);

  const addBrandSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      brandId:
        brandOptions.length > 0
          ? selectedBrand.value !== ""
            ? selectedBrand
            : brandOptions[0]
          : { label: "", value: "" },
    },
    validationSchema: addBrandSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addModelAction(values.name, values.brandId.value, selectedBrand.value)
      );
      setShowAddModal(false);
      resetForm();
    },
  });

  const { errors, touched } = formik;

  const fetchModels = (brandId: string) => {
    dispatch(getModelAction(brandId));
  };

  const deleteModel = () => {
    dispatch(deleteModelAction(modelId));
  };

  return (
    <div id="app">
      <ToastContainer />
      <ModalDelete
        show={showDeleteModal}
        hideModal={() => setShowDeleteModal(false)}
        deleteAction={deleteModel}
      />
      <ModalAdd
        show={showAddModal}
        hideModal={() => setShowAddModal(false)}
        title="Models"
      >
        <form className="form-horizontal" onSubmit={formik.handleSubmit}>
          <div className="card-body">
            <div className="d-flex">
              <div className="row flex">
                <div className="col-xl-8">
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">{t("Brands")}</label>
                        <Select
                          defaultValue={formik.values.brandId}
                          placeholder="Brands"
                          classNamePrefix={"test"}
                          styles={{
                            menu: (styles) => ({
                              ...styles,
                              ZIndex: 999,
                            }),
                          }}
                          options={brandOptions}
                          name="brandId"
                          value={formik.values.brandId}
                          onChange={(e) =>
                            formik.setValues({ ...formik.values, brandId: e! })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          {t("modelName")}
                        </label>
                        <input
                          className="form-control"
                          {...formik.getFieldProps("name")}
                        />
                      </div>
                      {errors.name && touched.name ? (
                        <div className="text-danger">{t(errors.name)}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-right">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </ModalAdd>
      <div className="content-wrapper">
        <div className="content">
          <header className="page-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h1>{t("models")}</h1>
              </div>
            </div>
          </header>
          <section className="page-content container-fluid">
            <div className="card card-tabs clearfix">
              <div className="card-body p-0">
                <div className="tab-content">
                  <div className="tab-pane fadeIn active" id="tab-1">
                    <div className="p-3 d-flex justify-content-end inner-filter">
                      <div className="d-flex align-items-center">
                        {brandOptions && brandOptions.length > 0 ? (
                          <div style={{ width: "20rem" }}>
                            <Select
                              defaultValue={brandOptions && brandOptions[0]}
                              placeholder="Brands"
                              options={brandOptions}
                              onChange={(e) => {
                                setSelectedBrand(e!);
                                fetchModels(e!.value);
                              }}
                            />
                          </div>
                        ) : null}
                        <div className="m-l-10">
                          <button
                            type="button"
                            onClick={() => setShowAddModal(true)}
                            className="btn btn-success"
                          >
                            {t("addNew")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="container ">
                      {loading ? (
                        <div style={{ textAlign: "center" }} className="my-5">
                          <ScaleLoader color="#F7B500" />
                        </div>
                      ) : (
                        <div className="row">
                          {models &&
                          models.modelOptions &&
                          modelOptions.length > 0 ? (
                            modelOptions.map((model) => (
                              <div
                                key={model.value}
                                className="card  col-md-2 mx-2 brand-cards"
                              >
                                <div
                                  className="card-body"
                                  style={{ textAlign: "center" }}
                                >
                                  <span>{model.label}</span>
                                  <i
                                    onClick={() => {
                                      setShowDeleteModal(true);
                                      setModelId(model.value);
                                    }}
                                    className="fa fa-trash-alt fa-fw text-danger delete-icon"
                                  ></i>
                                </div>
                              </div>
                            ))
                          ) : models.modelOptionsCount === 0 ? (
                            <p style={{ textAlign: "center" }}>
                              {t("noModels")}
                            </p>
                          ) : (
                            <div
                              style={{ textAlign: "center" }}
                              className="my-5"
                            >
                              <ScaleLoader color="#F7B500" />
                            </div>
                          )} 
                        </div>
                      )}
                    </div>
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

export default Models;
