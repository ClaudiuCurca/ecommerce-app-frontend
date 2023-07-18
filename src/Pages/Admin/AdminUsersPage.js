import React, { useState } from "react";
import Input from "../Components/Input";
import Pagination from "../Components/Pagination";
import AdminUserListSort from "./Components/AdminUserListSort";
import AdminUserList from "./Components/AdminUserList";

function AdminUsersPage() {
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
          <h1 className="items__header--title">Users</h1>
          <div className="items__header--edit-item">
            <Input placeholder={"User ID"}></Input>
            <button className="items__header--edit-item-button">
              Find user
            </button>
          </div>
        </div>
        <AdminUserListSort updateFilter={updateFilter} />
        <AdminUserList setMaxResults={setMaxResults} filters={filters} />
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
export default AdminUsersPage;
