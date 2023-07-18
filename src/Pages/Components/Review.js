import React, { useState } from "react";
import StarsRating from "./StarsRating";
import { ReactComponent as ThumbUpFilled } from "./../../img/svg/thumb-up-filled.svg";
import { ReactComponent as ThumbUpEmpty } from "./../../img/svg/thumb-up.svg";
import axiosInstance from "./../../Api/axiosConfig";
import { API_URL } from "../../config";

function Review({ review, userInfo }) {
  const [liked, setLiked] = useState(
    userInfo ? review.whoLiked.includes(userInfo._id) : null
  );
  const [likes, setLikes] = useState(review.likes);
  console.log(review);

  const handleLikeReviewClick = async (e) => {
    // console.log(e.currentTarget.dataset.reviewId);
    try {
      axiosInstance.post(
        `${API_URL}/api/reviews/${e.currentTarget.dataset.reviewId}/like`
      );
      setLiked(!liked);
      setLikes(likes + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlikeReviewClick = async (e) => {
    // console.log(e.currentTarget.dataset.reviewId);
    try {
      axiosInstance.delete(
        `${API_URL}/api/reviews/${e.currentTarget.dataset.reviewId}/like`
      );
      setLiked(!liked);
      setLikes(likes - 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="review">
      <div className="review__user">
        <img
          className="review__user--photo"
          src={review.user.photo}
          alt="not found"
        ></img>
        <div className="review__user--name">{review.user.name} </div>
        <div className="review__user--date">
          {new Date(review.createdAt).toLocaleDateString()}{" "}
        </div>
      </div>

      <div className="review__review">
        <div>
          <div className="review__review--rating">
            <StarsRating numberOfStars={review.rating} />
          </div>
          <p className="review__review--text"> {review.review} </p>
        </div>
        {userInfo && userInfo._id !== review.user._id ? (
          <>
            {liked ? (
              <div className="review__review--likes">
                {likes}
                <ThumbUpFilled
                  className="thumb-up thumb-up--interactive"
                  data-review-id={review._id}
                  onClick={handleUnlikeReviewClick}
                />
              </div>
            ) : (
              <div className="review__review--likes">
                {likes}
                <ThumbUpEmpty
                  className="thumb-up thumb-up--interactive"
                  data-review-id={review._id}
                  onClick={handleLikeReviewClick}
                />
              </div>
            )}
          </>
        ) : (
          <div className="review__review--likes">
            {review.likes} <ThumbUpFilled className="thumb-up" />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
