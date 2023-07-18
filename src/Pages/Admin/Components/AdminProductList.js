import axios from "axios";
import React, { useEffect, useState } from "react";
import { createQueryString } from "../../../Api/ProductAPI";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

function AdminProductList({ setMaxResults, filters }) {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const queryString = createQueryString(filters);

        const response = await axios.get(
          `${API_URL}/api/products?${queryString}`
        );

        setProducts(response.data.data);
        setMaxResults(response.data.maxResults);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [filters]);

  if (products.length === 0) {
    return <div></div>;
  }

  return (
    <div className="items__item-list">
      {products.map((product) => {
        return (
          <div
            className="items__item-list--item"
            key={product._id}
            onClick={() => navigate(`/admin/products/${product._id}`)}
          >
            <div className="name">{product.name}</div>
            <div className="category">{product.category}</div>
            <div className="price"> {product.price} $</div>
            <div className="rating">
              {product.rating} <span id="star-gold">★</span> (
              {product.reviewsNumber}){" "}
            </div>
            <div className="count">x {product.count}</div>
            <div className="sales">x {product.sales}</div>
            <div className="added">
              {" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminProductList;
