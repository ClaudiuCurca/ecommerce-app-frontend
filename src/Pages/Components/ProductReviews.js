import React, { useEffect, useState } from "react";

import Pagination from "./Pagination";
import ProductReviewList from "./ProductReviewList";

const RESULTS_PER_PAGE = 10;

function ProductReviews({ productId, userInfo }) {
  const [filters, setFilters] = useState({
    page: undefined,
    sort: "createdAt",
  });
  const [maxResults, setMaxResults] = useState(0);

  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div className="product-reviews">
      {maxResults > 0 ? (
        <div className="product-reviews__sort-by">
          Sort by{" "}
          <button
            onClick={() => updateFilter("sort", "createdAt")}
            className={`${filters.sort === "createdAt" ? "active" : ""}`}
          >
            Oldest
          </button>
          <button
            onClick={() => updateFilter("sort", "-createdAt")}
            className={`${filters.sort === "-createdAt" ? "active" : ""}`}
          >
            Newest
          </button>
          <button
            onClick={() => updateFilter("sort", "likes")}
            className={`${filters.sort === "likes" ? "active" : ""}`}
          >
            Likes 🠕
          </button>
          <button
            onClick={() => updateFilter("sort", "-likes")}
            className={`${filters.sort === "-likes" ? "active" : ""}`}
          >
            Likes 🠗
          </button>
        </div>
      ) : (
        <></>
      )}
      <ProductReviewList
        userInfo={userInfo}
        setMaxResults={setMaxResults}
        productId={productId}
        filters={filters}
      />

      {maxResults > RESULTS_PER_PAGE ? (
        <Pagination
          maxPages={Math.ceil(maxResults / RESULTS_PER_PAGE)}
          updateFilter={updateFilter}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductReviews;
