import React, { useState } from "react";
import Input from "./Components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(undefined);
  const [alertShow, setAlertShow] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClick = async (e) => {
    try {
      if (email.trim().length === 0) {
        setEmailError("Email can't be empty");
      } else if (!validateEmail(email)) {
        setEmailError("Invalid email address");
      } else {
        setAlertShow(true);
        await axios.post(`${API_URL}/api/users/forgotPassword`, {
          email,
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forgot-password-page">
      <h1 className="forgot-password-page__title">Forgot your password?</h1>
      <form
        className="forgot-password-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          label={"Email"}
          type={"email"}
          value={email}
          onChange={(e) => {
            if (emailError) setEmailError(undefined);
            setEmail(e.target.value);
          }}
          fieldError={emailError}
        />
        <button className="forgot-password-form__button" onClick={handleClick}>
          Recover password
        </button>
      </form>
      <div
        className={`forgot-password-page__alert`}
        style={{ opacity: alertShow ? "1" : "0" }}
      >
        If an account with this email has been created, you will recieve a link
        in your email to reset your password
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
