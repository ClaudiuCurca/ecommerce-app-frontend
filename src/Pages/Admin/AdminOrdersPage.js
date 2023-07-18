import React, { useState } from "react";
import Input from "../Components/Input";
import AdminOrderListSort from "./Components/AdminOrderListSort";
import AdminOrderList from "./Components/AdminOrderList";
import Pagination from "../Components/Pagination";

function AdminOrdersPage() {
  const [maxResults, setMaxResults] = useState(undefined);
  const [filters, setFilters] = useState({
    page: undefined,
    sort: undefined,
  });

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
          <h1 className="items__header--title">Orders</h1>
          <div className="items__header--edit-item">
            <Input placeholder={"Order ID"}></Input>
            <button className="items__header--edit-item-button">
              Edit Order
            </button>
          </div>
        </div>
        <AdminOrderListSort updateFilter={updateFilter} />
        <AdminOrderList setMaxResults={setMaxResults} filters={filters} />
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
export default AdminOrdersPage;
