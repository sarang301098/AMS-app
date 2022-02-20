import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";

import { addUserDataAction } from "../../store/userList/userData.action.async";
import RootState from "../../store/types";
import { Loading } from "../../components/loader/Spinner";

const User = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isLoading: boolean = useSelector(
    (state: RootState) => state.userData.loading
  );

  const AddUserSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("enterValidEmail")}`)
      .required(`${t("emailRequired")}`),
    type: Yup.string().required(`Please select user type`),
    password: Yup.string()
      .min(6, "Password is too Short")
      .required(`${t("password is required")}`),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      type: "",
      password: "",
    },
    validationSchema: AddUserSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addUserDataAction({
          email: values.email,
          password: values.password,
          type: values.type,
        })
      );
      resetForm();
    },
  });

  const { errors, touched } = formik;

  return (
    <React.Fragment>
      <ToastContainer />
      <Loading loading={isLoading}>
        <div id="app">
          <div className="content-wrapper">
            <div className="content">
              <header className="page-header">
                <div className="d-flex align-items-center">
                  <div className="mr-auto">
                    <h1>Add New User</h1>
                  </div>
                </div>
              </header>
              <section className="page-content container-fluid">
                <div className="card">
                  <form className="form-horizontal">
                    <div className="card-body px-4">
                      <div className="mt-3">
                        <div className="form-group">
                          <div className="col-md-5">
                            <input
                              type="text"
                              name="email"
                              placeholder={t("abc@xyz.com")}
                              className="form-control"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                            />
                            {errors.email && touched.email ? (
                              <div className="text-danger">{errors.email}</div>
                            ) : (
                              <div className="invisible"> error</div>
                            )}
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-md-5">
                            <input
                              type="text"
                              name="password"
                              placeholder="Enter Password"
                              className="form-control"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                            />
                            {errors.password && touched.password ? (
                              <div className="text-danger">
                                {errors.password}
                              </div>
                            ) : (
                              <div className="invisible"> error</div>
                            )}
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-5">
                            <select
                              className="custom-select form-control select2"
                              {...formik.getFieldProps("type")}
                            >
                              <option value="">-- Select User Type --</option>=
                              <option value="super_admin">SUPER_ADMIN </option>
                              <option value="admin">ADMIN </option>
                              <option value="manager"> MANAGER </option>
                              <option value="worker"> WORKER </option>
                              <option value="device"> DEVICE </option>
                              <option value="installer"> INSTALLER </option>
                              <option value="classifier"> CLASSIFIER </option>
                              <option value="ml_model"> ML_MODEL </option>
                              <option value="distributor"> DISTRIBUTOR </option>
                              <option value="developer"> DEVELOPER </option>
                              <option value="user"> USER </option>
                            </select>
                            {errors.type && touched.type ? (
                              <div className="text-danger">{errors.type}</div>
                            ) : (
                              <div className="invisible"> error</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-light text-right">
                      <button
                        onClick={() => history.goBack()}
                        type="button"
                        className="btn btn-secondary clear-form mr-2  "
                        style={{ marginRight: "10px" }}
                      >
                        {t("cancel")}
                      </button>
                      <button
                        onClick={() => formik.handleSubmit()}
                        type="button"
                        className="btn btn-primary"
                      >
                        {t("save")}
                      </button>
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

export default User;
