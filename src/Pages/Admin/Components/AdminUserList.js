import React, { useEffect, useState } from "react";
import { createQueryString } from "../../../Api/ProductAPI";
import axiosInstance from "./../../../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

function AdminUserList({ filters, setMaxResults }) {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const queryString = createQueryString(filters);

        const response = await axiosInstance.get(
          `${API_URL}/api/users?${queryString}`
        );
        // console.log(response.data.data);
        setUsers(response.data.data);
        setMaxResults(response.data.maxResults);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [filters]);

  if (users.length === 0) {
    return <div></div>;
  }

  return (
    <div className="items__item-list">
      {users.map((user) => {
        return (
          <div
            className="items__item-list--item"
            key={user._id}
            onClick={() => navigate(`/admin/users/${user._id}`)}
          >
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
            <div className="isAdmin">{user.isAdmin ? "true" : "false"}</div>
            <div className="added">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminUserList;
