import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";

import { ResetPasswordAction } from "../store/userStore/user.actions.async";
import RootState from "../store/types";
import { clearSuccess } from "../store/userStore/user.action.creators";
import { Loading } from "../components/loader/Spinner";

const ResetPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const notifySuccess = (message: string) => toast.success(message);
  const { t } = useTranslation();

  const isResetSuccess: boolean = useSelector(
    (state: RootState) => state.user.success
  );

  const isLoading: boolean = useSelector(
    (state: RootState) => state.user.loading
  );

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const email = query.get("email");
  const token = query.get("token");

  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required(`${t("passwordRequired")}`),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], `${t("passwordsMatch")}`)
      .required(`${t("confirmPasswordRequired")}`),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      dispatch(
        ResetPasswordAction({ email, token, newPassword: values.newPassword })
      );
    },
  });

  useEffect(() => {
    if (isResetSuccess) {
      dispatch(clearSuccess());
      notifySuccess(`${t("successfullyChangedPassword")}`);
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetSuccess]);

  const { errors, touched } = formik;

  return (
    <React.Fragment>
      <Loading loading={isLoading}>
        <div className="main-container d-flex align-items-center justify-content-center">
          <div className="login-box">
            <div className="login-box-body">
              <h1 className="text-center mb-3 font-weight-500">
                {t("resetPassword")}
              </h1>
              <ToastContainer />
              <form>
                <div className="form-group">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder={t("password")}
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                  />
                  {errors.newPassword && touched.newPassword ? (
                    <div className="text-danger">{errors.newPassword}</div>
                  ) : (
                    <div className="invisible"> error</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmNewPassword"
                    placeholder={t("confirmPassword")}
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmNewPassword}
                  />
                  {errors.confirmNewPassword && touched.confirmNewPassword ? (
                    <div className="text-danger">
                      {errors.confirmNewPassword}
                    </div>
                  ) : (
                    <div className="invisible"> error</div>
                  )}
                </div>

                <button
                  onClick={() => formik.handleSubmit()}
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  style={{ width: "100%" }}
                >
                  {t("resetPassword")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Loading>
    </React.Fragment>
  );
};

export default ResetPassword;
