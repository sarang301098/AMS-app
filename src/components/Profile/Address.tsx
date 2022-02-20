import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";

import { editProfileAction } from "../../store/profileStore/profile.action";
import RootState from "../../store/types";

export default function Address() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const AddressSchema = Yup.object().shape({
    area: Yup.string().required("Area is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string()
      .required("Pincode is required")
      .min(5, "Pincode must be exactly 5 digits")
      .max(5, "Pincode must be exactly 5 digits"),
  });
  const addressData = useSelector(
    (state: RootState) => state.user.userData!.address
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      area: addressData.area || "",
      city: addressData.city || "",
      state: addressData.state || "",
      pincode: addressData.pincode || "",
    },
    validationSchema: AddressSchema,
    onSubmit: (values) => {
      dispatch(
        editProfileAction(
          userData._id || "",
          Object.assign({}, userData, { address: values, _id: undefined })
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
                        <label className="control-label">{t("area")}</label>
                        <input
                          type="text"
                          {...formik.getFieldProps("area")}
                          className="form-control"
                        />
                        {errors.area && touched.area ? (
                          <div className="text-danger">{t("areaRequired")}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">{t("city")}</label>
                        <input
                          type="text"
                          {...formik.getFieldProps("city")}
                          className="form-control"
                        />
                        {errors.city && touched.city ? (
                          <div className="text-danger">{t("cityRequired")}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">{t("state")}</label>
                        <input
                          type="text"
                          {...formik.getFieldProps("state")}
                          className="form-control"
                        />
                        {errors.state && touched.state ? (
                          <div className="text-danger">
                            {t("stateRequired")}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">{t("pincode")}</label>
                        <input
                          type="text"
                          maxLength={5}
                          {...formik.getFieldProps("pincode")}
                          className="form-control"
                        />
                        {formik.touched.pincode && formik.errors.pincode ? (
                          <div className="text-danger">
                            {t("pincodeRequired")}
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
