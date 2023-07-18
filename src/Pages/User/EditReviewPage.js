import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Components/Input";
import axios from "axios";
import PageNotFound from "./../PageNotFound";
import StarsRating from "../Components/StarsRating";
import axiosInstance from "../../Api/axiosConfig";
import { API_URL } from "../../config";

function EditReviewPage({ userInfo }) {
  const params = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(null);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const getReview = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/reviews/${params.reviewId}`
        );
        // console.log(response.data.data);
        setReview(response.data.data); // idk why this happens only when env is production
        setReviewText(response.data.data.review);
        setReviewRating(response.data.data.rating);
      } catch (err) {
        console.log(err);
      }
    };

    getReview();
  }, []);

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
    if (error) {
      setError(undefined);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!reviewText.trim().length) {
        setError("You can't submit an empty review");
      } else {
        const response = await axiosInstance.patch(
          `${API_URL}/api/reviews/${review._id}`,
          {
            rating: reviewRating,
            review: reviewText,
          }
        );
        // console.log(response);

        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //loading
  if (review === null) {
    return <div></div>;
  }

  // checking if the review writer is actually the logged in user
  if (review && review.user._id !== userInfo._id) {
    return <PageNotFound />;
  }

  return (
    <div className="edit-review-page">
      <h1 className="edit-review-page__title">Edit review</h1>
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
        <button className="edit-review-page__form-button">Save review</button>
      </form>
    </div>
  );
}

export default EditReviewPage;
