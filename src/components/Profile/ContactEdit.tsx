import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";

import { editProfileAction } from "../../store/profileStore/profile.action";
import RootState from "../../store/types";

export default function ContactEdit() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ContactSchema = Yup.object().shape({
    workEmail: Yup.string().email().required("Work Email is required"),
    personalEmail: Yup.string().email().required("Personal Email is required"),
    workPhone: Yup.number().required("Work Phone is required."),
    personalPhone: Yup.number().required("Personal Phone is required."),
    residencePhone: Yup.number().required("Residence Phone is required."),
  });
  const contactData = useSelector(
    (state: RootState) => state.user.userData!.contact
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const formik = useFormik({
    initialValues: {
      workEmail: contactData.workEmail || "",
      personalEmail: contactData.personalEmail || "",
      workPhone: contactData.workPhone || "",
      personalPhone: contactData.personalPhone || "",
      residencePhone: contactData.residencePhone || "",
    },
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      dispatch(
        editProfileAction(
          userData._id || "",
          Object.assign({}, userData, { contact: values, _id: undefined })
        )
      );
    },
  });
  const { errors, touched } = formik;
  return (
    <React.Fragment>
      <ToastContainer />
      <form className="form-horizontal" onSubmit={formik.handleSubmit}>
        <div className="card-body">
          <div className="d-flex">
            <div className="row flex">
              <div className="col-xl-12">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <ScaleLoader color="#F7B500" loading={loading} />
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          {t("workEmail")}
                        </label>
                        <input
                          type="email"
                          {...formik.getFieldProps("workEmail")}
                          className="form-control"
                        />
                        {errors.workEmail && touched.workEmail ? (
                          <div className="text-danger">
                            {t("workEmailRequired")}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          {t("personalEmail")}
                        </label>
                        <input
                          type="email"
                          {...formik.getFieldProps("personalEmail")}
                          className="form-control"
                        />
                        {errors.personalEmail && touched.personalEmail ? (
                          <div className="text-danger">
                            {t("personalEmailRequired")}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          {t("workPhone")}
                        </label>
                        <input
                          type="number"
                          {...formik.getFieldProps("workPhone")}
                          className="form-control"
                        />
                        {errors.workPhone && touched.workPhone ? (
                          <div className="text-danger">
                            {t("workPhoneRequired")}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          {t("personalPhone")}
                        </label>
                        <input
                          type="number"
                          {...formik.getFieldProps("personalPhone")}
                          className="form-control"
                        />
                        {errors.personalPhone && touched.personalPhone ? (
                          <div className="text-danger">
                            {t("personalPhoneRequired")}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          {t("residencePhone")}
                        </label>
                        <input
                          type="number"
                          {...formik.getFieldProps("residencePhone")}
                          className="form-control"
                        />
                        {errors.residencePhone && touched.residencePhone ? (
                          <div className="text-danger">
                            {t("residencePhoneRequired")}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer bg-light text-right">
          <button type="submit" className="btn btn-primary">
            {t("edit")}
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
