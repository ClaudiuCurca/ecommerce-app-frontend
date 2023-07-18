import React, { useEffect, useState } from "react";
import { createQueryString } from "../../../Api/ProductAPI";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

function AdminCategoryList({ filters, setMaxResults }) {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const queryString = createQueryString(filters);

        const response = await axios.get(
          `${API_URL}/api/categories?${queryString}`
        );
        // console.log(response.data.data);
        setCategories(response.data.data);
        setMaxResults(response.data.maxResults);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [filters]);

  if (categories.length === 0) {
    return <div></div>;
  }

  return (
    <div className="items__item-list">
      {categories.map((category) => {
        return (
          <div
            className="items__item-list--item"
            key={category._id}
            onClick={() => navigate(`/admin/categories/${category.name}`)}
          >
            <div className="name">{category.name}</div>
            <div className="added">
              {new Date(category.createdAt).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default AdminCategoryList;
