import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";

import { ChangePasswordAction } from "../store/userStore/user.actions.async";
import RootState from "../store/types";
import { clearSuccess } from "../store/userStore/user.action.creators";
import { Loading } from "../components/loader/Spinner";

const ChangePassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const notifySuccess = (message: string) => toast.success(message);
  const { t } = useTranslation();

  const isChangeSuccess: boolean = useSelector(
    (state: RootState) => state.user.success
  );

  const isLoading: boolean = useSelector(
    (state: RootState) => state.user.loading
  );

  const ResetPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required(`${t("passwordRequired")}`),
    newPassword: Yup.string()
      .min(6, `${t("tooShort")}`)
      .required(`${t("passwordRequired")}`),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], `${t("passwordsMatch")}`)
      .required(`${t("confirmPasswordRequired")}`),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      dispatch(
        ChangePasswordAction({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        })
      );
    },
  });

  useEffect(() => {
    if (isChangeSuccess) {
      dispatch(clearSuccess());
      notifySuccess(`${t("successfullyChangedPassword")}`);
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChangeSuccess]);

  const { errors, touched } = formik;

  return (
    <React.Fragment>
      <Loading loading={isLoading}>
        <div id="app">
          <div className="content-wrapper">
            <div className="content">
              <header className="page-header">
                <div className="d-flex align-items-center">
                  <div className="mr-auto">
                    <h1>{t("changePassword")}</h1>
                  </div>
                  <ToastContainer />
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
                              type="password"
                              className="form-control"
                              name="oldPassword"
                              placeholder={t("oldPassword")}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.oldPassword}
                            />
                            {errors.oldPassword && touched.oldPassword ? (
                              <p className="text-danger mb-0">
                                {errors.oldPassword}
                              </p>
                            ) : (
                              <p className="invisible mb-0"> error</p>
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-5">
                            <input
                              type="password"
                              className="form-control"
                              name="newPassword"
                              placeholder={t("newPassword")}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.newPassword}
                            />
                            {errors.newPassword && touched.newPassword ? (
                              <p className="text-danger mb-0">
                                {errors.newPassword}
                              </p>
                            ) : (
                              <p className="invisible mb-0"> error</p>
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-5">
                            <input
                              type="password"
                              className="form-control"
                              name="confirmNewPassword"
                              placeholder={t("confirmPassword")}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.confirmNewPassword}
                            />
                            {errors.confirmNewPassword &&
                            touched.confirmNewPassword ? (
                              <p className="text-danger mb-0">
                                {errors.confirmNewPassword}
                              </p>
                            ) : (
                              <p className="invisible mb-0"> error</p>
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
                        {t("update")}
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

export default ChangePassword;
