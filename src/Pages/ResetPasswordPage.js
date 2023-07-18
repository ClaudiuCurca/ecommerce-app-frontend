import React, { useState } from "react";
import Input from "./Components/Input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(undefined);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertShow, setAlertShow] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    if (e.target.value.trim().length < 8) {
      setPasswordError("Password must have at least 8 characters");
    } else {
      setPasswordError(undefined);
    }

    if (e.target.value === passwordConfirm && passwordConfirmError) {
      setPasswordConfirmError(undefined);
    } else {
      setPasswordConfirmError("Passwords must match");
    }
    setAlertShow(false);
    setPassword(e.target.value);
  };
  const handleChangePasswordConfirm = (e) => {
    if (passwordConfirmError) setPasswordConfirmError(undefined);
    if (e.target.value !== password)
      setPasswordConfirmError("Passwords must match");

    setAlertShow(false);
    setPasswordConfirm(e.target.value);
  };

  const handleClick = async (e) => {
    try {
      if (password === "") {
        setPasswordError("Set a new password");
      } else if (!passwordError && !passwordConfirmError) {
        const response = await axios.patch(
          `${API_URL}/api/users/resetPassword/${params.passwordResetToken}`,
          {
            password,
            passwordConfirm,
          }
        );
        // console.log(response);

        setAlertMessage(
          "Password changed successfully, you will be sent to the login page"
        );
        setAlertShow(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      if (err.response.data.message === "Token is invalid or has expired") {
        setAlertMessage(err.response.data.message);
        setAlertShow(true);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="reset-password-page">
      <h1 className="reset-password-page__title">Forgot your password?</h1>
      <form
        className="reset-password-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          label={"Password"}
          type={"password"}
          value={password}
          onChange={handleChangePassword}
          fieldError={passwordError}
        />
        <Input
          label={"Password confirm"}
          type={"password"}
          value={passwordConfirm}
          onChange={handleChangePasswordConfirm}
          fieldError={passwordConfirmError}
        />
        <button className="reset-password-form__button" onClick={handleClick}>
          Set new password
        </button>
      </form>
      <div
        className={`reset-password-page__alert`}
        style={{ opacity: alertShow ? "1" : "0" }}
      >
        {alertMessage}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
