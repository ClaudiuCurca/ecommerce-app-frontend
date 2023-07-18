import React, { useState } from "react";
import axiosInstance from "../../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { API_URL } from "../../config";

function ChangePasswordPage() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [alertShow, setAlertShow] = useState("");
  const [successShow, setSuccessShow] = useState("");
  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    currentPassword: undefined,
    password: undefined,
    passwordConfirm: undefined,
  });

  const updateFieldErrors = (filterName, value) => {
    setFieldErrors((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const resetErrors = (fieldName) => {
    if (fieldErrors[fieldName] !== undefined || alertShow === true) {
      updateFieldErrors(fieldName, undefined);
      setAlertShow(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !password || !passwordConfirm) {
      setError("You must complete all the fields");
      setAlertShow(true);
    } else if (password.length < 8) {
      updateFieldErrors("password", "Password must be at least 8 characters");
    } else if (password !== passwordConfirm) {
      updateFieldErrors("password", "");
      updateFieldErrors("passwordConfirm", "Passwords must match");
    } else if (
      fieldErrors.currentPassword ||
      fieldErrors.password ||
      fieldErrors.passwordConfirm
    ) {
      console.log("this i not fixed");
    } else {
      try {
        await axiosInstance.patch(`${API_URL}/api/users/updateMyPassword`, {
          currentPassword,
          password,
          passwordConfirm,
        });
        setSuccessShow(true);

        setTimeout(() => {
          navigate("/my-profile");
        }, 1000);
      } catch (err) {
        if (err.response.data.message === "Current password is incorrect") {
          updateFieldErrors("currentPassword", err.response.data.message);
        } else {
          setError(err.response.data.message);
          setAlertShow(true);
        }
      }
    }
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    resetErrors("currentPassword");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    resetErrors("password");
    resetErrors("passwordConfirm");
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    resetErrors("password");
    resetErrors("passwordConfirm");
  };
  return (
    <div className="change-password">
      <div className="login-register-page">
        <h1 className="login-register-page__title">Change your password</h1>
        <form
          onSubmit={handleSubmit}
          className="login-register-page__form login-register-page__form-change-password"
        >
          <Input
            type={"password"}
            id={"currentPassword"}
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            label={"Current password"}
            fieldError={fieldErrors.currentPassword}
          />

          <Input
            type={"password"}
            id={"newPassword"}
            value={password}
            onChange={handlePasswordChange}
            label={"New password"}
            fieldError={fieldErrors.password}
          />

          <Input
            type={"password"}
            id={"newPasswordConfirm"}
            value={passwordConfirm}
            label={"Confirm new password"}
            onChange={handlePasswordConfirmChange}
            fieldError={fieldErrors.passwordConfirm}
          />
          <button className="login-register-page__form--button">
            Change password
          </button>

          <div
            className="alert alert--error"
            style={{ opacity: alertShow ? 1 : 0 }}
          >
            {error}
          </div>
          <div
            className="alert alert--success"
            style={{ opacity: successShow ? 1 : 0 }}
          >
            Password changed succesfully.
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
