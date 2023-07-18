import React, { useEffect, useState } from "react";
import Review from "./Review";
import axios from "axios";
import { createQueryString } from "../../Api/ProductAPI";
import SpinningCircle from "./SpinningCircle";
import { API_URL } from "../../config";

function ProductReviewList({ userInfo, filters, setMaxResults, productId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      const queryString = createQueryString(filters);
      try {
        const response = await axios.get(
          `${API_URL}/api/reviews/product/${productId}?${queryString}`
        );

        setMaxResults(response.data.maxResults);

        setReviews(response.data.data);
        // console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getReviews();
  }, [filters]);

  if (!reviews) {
    return <SpinningCircle />;
  }

  if (reviews.length === 0) {
    return <div>There are no reviews yet</div>;
  }

  return (
    <>
      {reviews.map((review) => (
        <Review userInfo={userInfo} review={review} key={review._id} />
      ))}
      <div className="product-reviews__create-review"></div>
    </>
  );
}

export default ProductReviewList;
