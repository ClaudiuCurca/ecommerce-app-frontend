import React from "react";
import { useNavigate } from "react-router-dom";

function AdminNavigation() {
  const navigate = useNavigate();
  return (
    <nav className="admin-nav">
      <button
        className="admin-nav__button"
        onClick={() => navigate("/admin/products")}
      >
        Products
      </button>

      <button
        className="admin-nav__button"
        onClick={() => navigate("/admin/categories")}
      >
        Categories
      </button>

      <button
        className="admin-nav__button"
        onClick={() => navigate("/admin/users")}
      >
        Users
      </button>

      <button
        className="admin-nav__button"
        onClick={() => navigate("/admin/orders")}
      >
        Orders
      </button>
    </nav>
  );
}

export default AdminNavigation;
