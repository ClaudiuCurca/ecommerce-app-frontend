import React, { useState } from "react";
import Input from "../Components/Input";
import AdminProductList from "./Components/AdminProductList";
import Pagination from "../Components/Pagination";
import AdminProductListSort from "./Components/AdminProductListSort";
import { useNavigate } from "react-router-dom";

function AdminProductsPage() {
  const [productToEdit, setProductToEdit] = useState("");

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
          <h1 className="items__header--title">Products</h1>
          <div className="items__header--edit-item">
            <Input
              placeholder={"Product ID"}
              value={productToEdit}
              onChange={(e) => setProductToEdit(e.target.value)}
            ></Input>
            <button
              className="items__header--edit-item-button"
              onClick={() => navigate(`/admin/products/${productToEdit}`)}
            >
              Edit product
            </button>
          </div>
          <button
            className="items__header--add-new-button"
            onClick={() => navigate("/admin/products/add-product")}
          >
            Add new
          </button>
        </div>
        <AdminProductListSort updateFilter={updateFilter} />
        <AdminProductList setMaxResults={setMaxResults} filters={filters} />
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

export default AdminProductsPage;
