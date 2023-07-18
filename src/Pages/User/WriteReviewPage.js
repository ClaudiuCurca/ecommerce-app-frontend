import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarsRating from "../Components/StarsRating";
import Input from "../Components/Input";
import axiosInstance from "../../Api/axiosConfig";
import { API_URL } from "../../config";

function WriteReviewPage() {
  const [reviewRating, setReviewRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState(undefined);

  const navigate = useNavigate();
  const params = useParams();
  console.log(params.productId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (reviewText.length === 0) {
        setError("Review can't be empty");
      } else {
        await axiosInstance.post(
          `${API_URL}/api/reviews/product/${params.productId}/createReview`,
          { rating: reviewRating, review: reviewText }
        );
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  return (
    <div className="edit-review-page">
      <h1 className="edit-review-page__title">Write review</h1>
      <form className="edit-review-page__form" onSubmit={handleSubmit}>
        <div className="edit-review-page__form-rating">
          <StarsRating
            numberOfStars={reviewRating}
            setNumberOfStars={setReviewRating}
            edit={true}
          />
        </div>
        <Input
          type={"textarea"}
          label={"Review"}
          value={reviewText}
          maxLength={1000}
          onChange={handleReviewTextChange}
          fieldError={error}
        />
        <button className="edit-review-page__form-button">Send review</button>
      </form>
    </div>
  );
}

export default WriteReviewPage;
