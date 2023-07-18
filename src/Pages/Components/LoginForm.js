import React, { useState } from "react";
import { login } from "../../Api/userAPI";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

function LoginForm() {
  const [error, setError] = useState({});
  const [alertShow, setAlertShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setAlertShow(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setAlertShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      setSuccessShow(true);

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError(err.response.data);
      setAlertShow(true);
    }
  };

  return (
    <div className="login-register-page">
      <h1 className="login-register-page__title"> Log in to your account</h1>
      <form className="login-register-page__form" onSubmit={handleSubmit}>
        <Input
          type={"email"}
          id={"email"}
          value={email}
          onChange={handleEmailChange}
          label={"Email address"}
        />

        <Input
          type={"password"}
          id={"password"}
          value={password}
          onChange={handlePasswordChange}
          label={"Password"}
        />
        <button className="login-register-page__form--button">Log in</button>
        <p
          className="login-register-page--go-to-forgotPassword"
          onClick={() => navigate("/forgotPassword")}
        >
          Forgot your password?
        </p>
        <div
          className="alert alert--error"
          style={{ opacity: alertShow ? 1 : 0 }}
        >
          {error.message}
        </div>
        <div
          className="alert alert--success"
          style={{ opacity: successShow ? 1 : 0 }}
        >
          You logged in successfully. You will be sent to the home page
        </div>
      </form>
      <p
        className="login-register-page--go-to-register"
        onClick={() => navigate("/register")}
      >
        You don't have an account? Click here to register
      </p>
    </div>
  );
}

export default LoginForm;
