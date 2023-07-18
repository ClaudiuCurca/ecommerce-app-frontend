import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../Api/userAPI";
import Input from "./Input";

function RegisterForm() {
  const [error, setError] = useState({});
  const [alertShow, setAlertShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
    passwordConfirm: undefined,
  });

  const navigate = useNavigate();

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

  const handleNameChange = (e) => {
    setName(e.target.value);
    resetErrors("name");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    resetErrors("email");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    resetErrors("password");
    resetErrors("passwordConfirm");
  };

  const handlepasswordConfirmChange = (e) => {
    setpasswordConfirm(e.target.value);
    resetErrors("password");
    resetErrors("passwordConfirm");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password || !email || !passwordConfirm) {
      setError({ message: "You must complete all the fields" });
      setAlertShow(true);
    } else if (password.length < 8) {
      updateFieldErrors("password", "Password must be at least 8 characters");
      updateFieldErrors("passwordConfirm", "");
    } else if (password !== passwordConfirm) {
      updateFieldErrors("password", "");
      updateFieldErrors("passwordConfirm", "Passwords must match");
    } else {
      try {
        await signUp(name, email, password, passwordConfirm);
        setSuccessShow(true);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (err) {
        console.log(err);
        const { errors } = err.response.data;
        errors.map((error) => {
          console.log(error);
          updateFieldErrors(error.field, error.message);
        });
        // setError(err.response.data);
        // setAlertShow(true);
      }
    }
  };

  return (
    <div className="login-register-page">
      <h1 className="login-register-page__title"> Register a new account</h1>
      <form
        className="login-register-page__form login-register-page__form-register"
        onSubmit={handleSubmit}
      >
        <Input
          type={"text"}
          id={"name"}
          value={name}
          onChange={handleNameChange}
          fieldError={fieldErrors.name}
          label={"Name"}
        />
        <Input
          type={"email"}
          id={"email"}
          value={email}
          onChange={handleEmailChange}
          label={"Email"}
          fieldError={fieldErrors.email}
        />

        <Input
          type={"password"}
          id={"password"}
          maxLength={20}
          value={password}
          onChange={handlePasswordChange}
          label={"Password"}
          fieldError={fieldErrors.password}
        />

        <Input
          type={"password"}
          id={"passwordConfirm"}
          maxLength={20}
          value={passwordConfirm}
          onChange={handlepasswordConfirmChange}
          label={"Password"}
          fieldError={fieldErrors.passwordConfirm}
        />
        <button className="login-register-page__form--button">Register</button>
        <div
          className={`alert alert--error`}
          style={{ opacity: alertShow ? 1 : 0 }}
        >
          {error.message}
        </div>
        <div
          className={`alert alert--success`}
          style={{ opacity: successShow ? 1 : 0 }}
        >
          Your account was created successfully. You can now log in
        </div>
      </form>
      <p
        className="login-register-page--go-to-register"
        onClick={() => navigate("/login")}
      >
        You already have an account? Click here to log in
      </p>
    </div>
  );
}

export default RegisterForm;
