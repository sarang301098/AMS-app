import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ToastContainer } from "react-toastify";
import ModalAdd from "../../components/Modals/ModalAdd";
import {
  addBrandAction,
  deleteBrandAction,
  getBrandAction,
} from "../../store/brandStore/brand.action.async";
import RootState from "../../store/types";
import { ScaleLoader } from "react-spinners";
import ModalDelete from "../../components/Modals/ModalDelete";

const Brands = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const brands = useSelector((state: RootState) => state.brand.brands || []);
  const { brandOptions } = brands;
  const loading = useSelector(
    (state: RootState) => state.brand.loading || false
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brandId, setBrandId] = useState("");

  useEffect(() => {
    dispatch(getBrandAction());
  }, [dispatch]);

  useEffect(() => {}, [brands]);

  const addBrandSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: addBrandSchema,
    onSubmit: async (values, { resetForm }) => {
      setShowAddModal(false);
      await dispatch(addBrandAction(values.name));
      resetForm();
    },
  });

  const { errors, touched } = formik;

  const deleteBrand = () => {
    dispatch(deleteBrandAction(brandId));
  };

  return (
    <div id="app">
      <ModalDelete
        show={showDeleteModal}
        hideModal={() => setShowDeleteModal(false)}
        deleteAction={deleteBrand}
        message="All models related to this brand will be deleted!"
      />
      <ModalAdd
        show={showAddModal}
        hideModal={() => setShowAddModal(false)}
        title="Brand"
      >
        <form className="form-horizontal" onSubmit={formik.handleSubmit}>
          <div className="card-body">
            <div className="d-flex">
              <div className="row flex">
                <div className="col-xl-8">
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">{t("name")}</label>
                        <input
                          className="form-control"
                          {...formik.getFieldProps("name")}
                        />
                      </div>
                      {errors.name && touched.name ? (
                        <div className="text-danger">{t("nameRequired")}</div>
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
                <h1>{t("brands")}</h1>
              </div>
              <ToastContainer />
            </div>
          </header>
          <section className="page-content container-fluid">
            <div className="card card-tabs clearfix">
              <div className="card-body p-0">
                <div className="tab-content">
                  <div className="tab-pane fadeIn active" id="tab-1">
                    <div className="p-3 d-flex justify-content-end inner-filter">
                      <div className="d-flex align-items-center">
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
                          <ScaleLoader color="#F7B500" loading={loading} />
                        </div>
                      ) : (
                        <div className="row">
                          {brandOptions ? (
                            brandOptions.map((brand) => (
                              <div
                                key={brand && brand.value}
                                className="card  col-md-2 mx-2 brand-cards"
                              >
                                <div
                                  className="card-body"
                                  style={{ textAlign: "center" }}
                                >
                                  <span>{brand && brand.label} </span>
                                  <i
                                    onClick={() => {
                                      setBrandId(brand.value);
                                      setShowDeleteModal(true);
                                    }}
                                    className="fa fa-trash-alt fa-fw text-danger delete-icon"
                                  ></i>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p style={{ textAlign: "center" }}>
                              {t("noBrands")}
                            </p>
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

export default Brands;
