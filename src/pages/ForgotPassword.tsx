import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ForgotPasswordAction } from "../store/userStore/user.actions.async";
import RootState from "../store/types";
import { clearSuccess } from "../store/userStore/user.action.creators";
import { Loading } from "../components/loader/Spinner";

const ForgotPassword = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isForgotPasswordSuccess: boolean = useSelector(
    (state: RootState) => state.user.success
  );

  const isLoading: boolean = useSelector(
    (state: RootState) => state.user.loading
  );

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("enterValidEmail")}`)
      .required(`${t("emailRequired")}`),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      dispatch(
        ForgotPasswordAction({
          email: values.email,
        })
      );
    },
  });

  const showPopup = () => {
    setShow(true);
  };

  useEffect(() => {
    if (isForgotPasswordSuccess) {
      showPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isForgotPasswordSuccess]);

  const redirectPage = () => {
    setShow(false);
    dispatch(clearSuccess());
    history.push("/login");
  };

  const { errors, touched } = formik;

  return (
    <React.Fragment>
      <Loading loading={isLoading}>
        <div className="main-container d-flex align-items-center justify-content-center">
          <div className="login-box">
            <div className="login-box-body">
              <h1 className="text-center mb-3 font-weight-500">
                {t("forgotPassword2")}
              </h1>
              <ToastContainer />
              <p className="text-center mb-4">{t("enterRegisteredEmail")}</p>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    placeholder={t("emailId")}
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
                <button
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  onClick={() => formik.handleSubmit()}
                  style={{ width: "100%" }}
                >
                  {t("Submit")}
                </button>
              </form>
            </div>
            <div className="login-box-footer clearfix">
              <div className="form-group text-center mb-2">
                {t("rememberPassword")}
                <Link className="text-accent-custom" to="/login">
                  {t("login")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Modal centered show={show} onHide={redirectPage}>
          <Modal.Body className="text-center p-4">
            <h2 className="font-weight-500">Password Recovery</h2>
            <p className="font-size-15 mt-3">
              An email has been sent to your registered email ID containing the
              password reset link along with a list of instructions. Please
              follow the steps mentioned in the email to reset your password.
            </p>
            <div className="form-row mt-4 px-4">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary btn-block w-100"
                  onClick={redirectPage}
                >
                  Okay
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Loading>
    </React.Fragment>
  );
};

export default ForgotPassword;
