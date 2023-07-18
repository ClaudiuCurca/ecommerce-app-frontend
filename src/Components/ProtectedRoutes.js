import Cookies from "js-cookie";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageNotFound from "../Pages/PageNotFound";

function ProtectedRoutes({ userInfo, admin }) {
  // the jwt expiration is checked on the backend
  const token = Cookies.get("token");
  const navigate = useNavigate();

  if (!token || !userInfo) {
    return (
      <div className="page-must-login">
        <h1>You must log in.</h1>
        <button onClick={() => navigate("/login")}>Log in</button>
      </div>
    );
  } else {
    if (admin && !userInfo.isAdmin) {
      return <PageNotFound />;
    } else {
      return <Outlet />;
    }
  }
}

export default ProtectedRoutes;
