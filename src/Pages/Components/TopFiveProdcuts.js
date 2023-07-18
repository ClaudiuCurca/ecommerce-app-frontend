import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductCardsLoading from "./ProductCardsLoading";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function TopFiveProdcuts({ category }) {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/products?category=${category}&sort=-sales&limit=5`
        );
        // console.log(response.data.data);
        setProducts(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  if (!products) {
    return (
      <div className="top-five">
        <h2 className="top-five__title">{category}</h2>
        <div className="top-five__products">
          <ProductCardsLoading numberOfLoadingCards={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="top-five">
      <h2 className="top-five__title">
        Top sales in {category}{" "}
        <button
          className="top-five__title--see-all"
          onClick={() => navigate(`/category/${category}`)}
        >
          {" "}
          See all {category}{" "}
        </button>
      </h2>
      <div className="top-five__products">
        {products.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
}

export default TopFiveProdcuts;
