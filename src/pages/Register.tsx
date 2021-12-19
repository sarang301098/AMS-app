import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import { RegisterAction } from "../store/userStore/user.actions.async";
import RootState from "../store/types";
import { Loading } from "../components/loader/Spinner";
import { clearSuccess } from "../store/userStore/user.action.creators";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const notifySuccess = (message: string) => toast.success(message);
  const { t } = useTranslation();

  const isRegisterSuccess: boolean = useSelector(
    (state: RootState) => state.user.success
  );

  const isLoading: boolean = useSelector(
    (state: RootState) => state.user.loading
  );

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, `${t("tooShort")}`)
      .max(255, `${t("tooLong")}`)
      .required(`${t("required")}`),
    email: Yup.string()
      .email(`${t("enterValidEmail")}`)
      .required(`${t("emailRequired")}`),
    password: Yup.string()
      .min(6, "Too Short")
      .required(`${t("passwordRequired")}`),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], `${t("passwordsMatch")}`)
      .required(`${t("confirmPasswordRequired")}`),
    acceptTerms: Yup.boolean().oneOf([true], `${t("acceptTnC")}`),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(
        RegisterAction({
          username: values.username,
          email: values.email,
          password: values.password,
          type: "manager",
        })
      );
    },
  });

  useEffect(() => {
    if (isRegisterSuccess) {
      dispatch(clearSuccess());
      notifySuccess(`${t("successfullyRegistered")}`);
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterSuccess]);

  const { errors, touched } = formik;

  return (
    <React.Fragment>
      <Loading loading={isLoading}>
        <div className="main-container d-flex align-items-center justify-content-center">
          <div className="login-box">
            <div className="login-box-body">
              <h1 className="text-center mb-3 font-weight-500">
                {t("register")}
              </h1>
              <ToastContainer />
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    placeholder={t("username")}
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {errors.username && touched.username ? (
                    <div className="text-danger">{errors.username}</div>
                  ) : (
                    <div className="invisible"> error</div>
                  )}
                </div>
                <div className="form-group">
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
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="***********"
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
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="***********"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="text-danger">{errors.confirmPassword}</div>
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
                  {t("register")}
                </button>
              </form>
            </div>
            <div className="login-box-footer d-flex justify-content-between">
              <div className="form-group m-0">
                <Link className="text-accent-custom" to="/login">
                  {t("haveAccount")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Loading>
    </React.Fragment>
  );
};

export default Register;
