import React from "react";
import StarsRating from "../../Components/StarsRating";
import { ReactComponent as ThumbUpFilled } from "./../../../img/svg/thumb-up-filled.svg";
import { ReactComponent as EditIcon } from "./../../../img/svg/edit.svg";
import { ReactComponent as TrashBin } from "./../../../img/svg/bin.svg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Api/axiosConfig";
import { API_URL } from "../../../config";

function MyReviews({ reviews, display }) {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    try {
      // console.log(e.currentTarget.dataset.reviewId);
      await axiosInstance.delete(
        `${API_URL}/api/reviews/${e.currentTarget.dataset.reviewId}`
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="my-profile__reviews"
      style={{ display: `${display !== "reviews" ? "none" : ""}` }}
    >
      {reviews.length > 0 ? (
        <>
          {reviews.map((review) => {
            return (
              <div className="my-profile__reviews-review" key={review._id}>
                <div className="my-profile__reviews-review-edit">
                  <EditIcon
                    onClick={() => navigate(`/edit-review/${review._id}`)}
                  />
                  <TrashBin onClick={handleClick} data-review-id={review._id} />
                </div>

                <h3 className="my-profile__reviews-review-product-title">
                  {review.productName}
                </h3>
                <div className="my-profile__reviews-review-rating mb-1">
                  <StarsRating numberOfStars={review.rating} edit={false} />
                </div>
                <p className="my-profile__reviews-review-review">
                  {review.review}
                </p>
                <div className="my-profile__reviews-review-likes">
                  <div>{review.likes}</div>
                  <ThumbUpFilled className="my-profile__reviews-review-likes-svg" />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <h3>You have no reviews</h3>
      )}
    </div>
  );
}

export default MyReviews;
