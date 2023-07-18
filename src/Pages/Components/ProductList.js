import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { createQueryString, fetchProducts } from "../../Api/ProductAPI";
import { useNavigate, useParams } from "react-router-dom";
import ProductCardsLoading from "./ProductCardsLoading";

const RESULTSPERPAGE = 16;

function ProductList({ filters, setMaxPages, categoryName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const queryString = createQueryString(filters);

      try {
        setIsLoading(true);

        const fetchedProducts = await fetchProducts(queryString);
        setMaxPages(Math.ceil(fetchedProducts.maxResults / RESULTSPERPAGE));
        setProducts(fetchedProducts.data);

        setIsLoading(false);

        // update URL

        // navigate(`?${queryString}`);
      } catch (error) {
        throw new Error(error);
      }
    };

    getProducts();
  }, [filters, categoryName]);

  if (isLoading) {
    return <ProductCardsLoading numberOfLoadingCards={16} />;
  }

  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        No products found with such criteria
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} navigate={navigate} />
      ))}
    </div>
  );
}

export default ProductList;
