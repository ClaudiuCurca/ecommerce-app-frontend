import React, { useState } from "react";
import Input from "../Components/Input";
import Pagination from "../Components/Pagination";
import AdminUserListSort from "./Components/AdminUserListSort";
import AdminUserList from "./Components/AdminUserList";
import { useNavigate } from "react-router-dom";

function AdminUsersPage() {
  const [maxResults, setMaxResults] = useState(undefined);
  const [userIdToFind, setUserIdToFind] = useState("");
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
          <h1 className="items__header--title">Users</h1>
          <div className="items__header--edit-item">
            <Input
              placeholder={"User ID"}
              value={userIdToFind}
              onChange={(e) => setUserIdToFind(e.target.value)}
            ></Input>
            <button
              className="items__header--edit-item-button"
              onClick={() => navigate(`/admin/users/${userIdToFind}`)}
            >
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
