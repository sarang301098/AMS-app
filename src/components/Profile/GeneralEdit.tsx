import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import moment from "moment";

import { editProfileAction } from "../../store/profileStore/profile.action";
import RootState from "../../store/types";

export default function GeneralEdit() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const GeneralSchema = Yup.object().shape({
    uName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("User Name is required"),
    fName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First Name is required"),
    mName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Middle Name is required"),
    lName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("DOB is required"),
  });
  const generalData = useSelector(
    (state: RootState) => state.user.userData!.general
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const formik = useFormik({
    initialValues: {
      uName: userData.username || "",
      fName: generalData.fName || "",
      mName: generalData.mName || "",
      lName: generalData.lName || "",
      gender: generalData.gender || "",
      dob: generalData.dob || "",
    },
    validationSchema: GeneralSchema,
    onSubmit: (values) => {
      dispatch(
        editProfileAction(
          userData._id || "",
          Object.assign(
            {},
            { ...userData, username: values.uName },
            { general: { ...values, uName: undefined }, _id: undefined }
          )
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
                        <label className="control-label">{t("uName")}</label>
                        <input
                          id="userName"
                          name="uName"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.uName}
                          className="form-control"
                        />
                        {errors.uName && touched.uName ? (
                          <div className="text-danger">
                            {t("uNameRequired")}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          {t("firstName")}
                        </label>
                        <input
                          id="firstName"
                          name="fName"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.fName}
                          className="form-control"
                        />
                        {errors.fName && touched.fName ? (
                          <div className="text-danger">{t("fName")}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          {t("middleName")}
                        </label>
                        <input
                          id="middleName"
                          name="mName"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.mName}
                          className="form-control"
                        />
                        {errors.mName && touched.mName ? (
                          <div className="text-danger">{t("mName")}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">{t("lastName")}</label>
                        <input
                          id="lastName"
                          name="lName"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lName}
                          className="form-control"
                        />
                        {errors.lName && touched.lName ? (
                          <div className="text-danger">{t("lName")}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">{t("gender")}</label>
                        <div className="col-md-12">
                          <select
                            className="custom-select form-control select2 w-150"
                            id="gender"
                            {...formik.getFieldProps("gender")}
                          >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                          </select>
                          {errors.gender && touched.gender ? (
                            <div className="text-danger">
                              {t("genderRequired")}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">{t("dob")}</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dob"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={moment(formik.values.dob).format("YYYY-MM-DD")}
                        />
                        {errors.dob && touched.dob ? (
                          <div className="text-danger">{t("dobRequired")}</div>
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
