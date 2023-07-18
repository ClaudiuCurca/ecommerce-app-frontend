import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowUp } from "./../../img/svg/up-arrow.svg";
import { addProductToCart } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpinningCircle from "./SpinningCircle";
import PromoCarousel from "./PromoCarousel";
import { API_URL } from "../../config";

function Promo() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/products?sort=-createdAt&limit=4`
        );
        // console.log(response.data.data);
        setProducts(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="promo" style={{ height: "60rem" }}>
        <SpinningCircle />
      </div>
    );
  }

  return (
    <div className="promo">
      <PromoCarousel products={products} />
    </div>
  );
}

export default Promo;
