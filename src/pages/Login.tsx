import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import { LoginAction } from "../store/userStore/user.actions.async";
import RootState from "../store/types";
import { Loading } from "../components/loader/Spinner";
import { authSuccess } from "../store/userStore/user.action.creators";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isLoggedIn: object = useSelector(
    (state: RootState) => state.user.userData
  );

  const isLoading: boolean = useSelector(
    (state: RootState) => state.user.loading
  );

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("enterValidEmail")}`)
      .required(`${t("emailRequired")}`),
    password: Yup.string().required(`${t("passwordRequired")}`),
    acceptTerms: Yup.boolean().oneOf([true], `${t("acceptTnC")}`),
  });

  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "password",
      acceptTerms: false,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(
        LoginAction({
          email: values.email,
          password: values.password,
        })
      );
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(authSuccess);
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const { errors, touched } = formik;

  return (
    <React.Fragment>
      <Loading loading={isLoading}>
        <div className="main-container d-flex align-items-center justify-content-center">
          <div className="login-box">
            <div className="login-box-body">
              <h1 className="text-center mb-3 font-weight-500">{t("login")}</h1>
              <ToastContainer />
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    placeholder="abc@xyz.com"
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
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="******"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {errors.password && touched.password ? (
                    <div className="text-danger">{errors.password}</div>
                  ) : (
                    <div className="invisible"> error</div>
                  )}
                </div>
                <div className="form-group">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="stateCheck1"
                      checked={formik.values.acceptTerms}
                      onChange={formik.handleChange}
                      name="acceptTerms"
                    />
                    <label
                      className="control control-outline control-primary control--checkbox mb-0"
                      htmlFor="stateCheck1"
                    >
                      {t("I agree to the")}
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a href="/"> {t("terms")} </a> {t("and")}
                      <a href="/"> {t("conditions")} </a>
                    </label>
                  </div>
                  {errors.acceptTerms && touched.acceptTerms ? (
                    <div className="text-danger">{errors.acceptTerms}</div>
                  ) : (
                    <div className="invisible"> error</div>
                  )}
                  <div className="control__indicator"></div>
                </div>
                <button
                  onClick={() => formik.handleSubmit()}
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  style={{ width: "100%" }}
                >
                  {t("login")}
                </button>
              </form>
            </div>
            <div className="login-box-footer d-flex justify-content-between">
              <div className="form-group m-0">
                <Link className="text-accent-custom" to="/register">
                  {t("noAccount")}
                </Link>
              </div>
              <div className="password-reset-link">
                <Link className="text-accent-custom" to="/forgot-password">
                  {t("forgotPassword")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Loading>
    </React.Fragment>
  );
};

export default Login;
