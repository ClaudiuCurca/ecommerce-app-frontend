import React, { useState } from "react";
import Input from "../Components/Input";
import AdminOrderListSort from "./Components/AdminOrderListSort";
import AdminOrderList from "./Components/AdminOrderList";
import Pagination from "../Components/Pagination";
import { useNavigate } from "react-router-dom";

function AdminOrdersPage() {
  const [maxResults, setMaxResults] = useState(undefined);
  const [orderIdToFind, setOrderIdToFind] = useState("");
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
          <h1 className="items__header--title">Orders</h1>
          <div className="items__header--edit-item">
            <Input
              placeholder={"Order ID"}
              value={orderIdToFind}
              onChange={(e) => setOrderIdToFind(e.target.value)}
            ></Input>
            <button
              className="items__header--edit-item-button"
              onClick={() => navigate(`/admin/orders/${orderIdToFind}`)}
            >
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
