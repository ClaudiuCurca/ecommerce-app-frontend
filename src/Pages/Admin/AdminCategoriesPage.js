import React, { useState } from "react";
import Input from "../Components/Input";
import Pagination from "../Components/Pagination";
import AdminCategoryListSort from "./Components/AdminCategoryListSort";
import AdminCategoryList from "./Components/AdminCategoryList";
import { useNavigate } from "react-router-dom";

function AdminCategoriesPage() {
  const [maxResults, setMaxResults] = useState(undefined);
  const [filters, setFilters] = useState({
    page: undefined,
    sort: undefined,
  });

  const navigate = useNavigate();

  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div className="admin-items-page">
      <div className="items">
        <div className="items__header mb-4">
          <h1 className="items__header--title">Categories</h1>
          <div className="items__header--edit-item">
            <Input placeholder={"Category ID"}></Input>
            <button className="items__header--edit-item-button">
              Edit category
            </button>
          </div>
          <button
            className="items__header--add-new-button"
            onClick={() => navigate("/admin/categories/add-category")}
          >
            Add new
          </button>
        </div>
        <AdminCategoryListSort updateFilter={updateFilter} />
        <AdminCategoryList setMaxResults={setMaxResults} filters={filters} />
        {maxResults > 16 ? (
          <Pagination
            maxPages={Math.ceil(maxResults / 16)}
            updateFilter={updateFilter}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AdminCategoriesPage;
