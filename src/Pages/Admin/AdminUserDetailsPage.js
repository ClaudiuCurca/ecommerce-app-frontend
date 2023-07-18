import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as TrashBin } from "./../../img/svg/bin.svg";
import { ReactComponent as ThumbUpFilled } from "./../../img/svg/thumb-up-filled.svg";
import axiosInstance from "../../Api/axiosConfig";
import axios from "axios";
import StarsRating from "../Components/StarsRating";
import { API_URL } from "../../config";

function AdminUserDetailsPage() {
  const [user, setUser] = useState();
  const [userReviews, setUserReviews] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/users/admin/${params.userId}`
        );
        // console.log(response);
        setUser(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserReviews = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/reviews/user/${params.userId}`
        );
        // console.log(response);
        setUserReviews(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserReviews();
  }, []);

  const handleClickDeleteReview = async (e) => {
    try {
      const reviewIdToDelete = e.currentTarget.dataset.reviewId;
      const response = await axiosInstance.delete(
        `${API_URL}/api/reviews/${reviewIdToDelete}`
      );

      // console.log(response);
      const updatedUserReviews = userReviews.filter(
        (review) => review._id !== reviewIdToDelete
      );
      // console.log(updatedUserReviews);
      setUserReviews(updatedUserReviews);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDeleteUser = async (e) => {
    try {
      await axiosInstance.delete(
        `${API_URL}/api/users/admin/${user._id}/delete`
      );

      navigate("/admin/users");
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <h2 className="flex-center mt-8">User with this id doesn't exist</h2>
    );
  }

  let reviews = <div>User has no reviews</div>;
  if (userReviews.length > 0) {
    reviews = (
      <>
        {" "}
        {userReviews.map((review) => (
          <div className="my-profile__reviews-review" key={review._id}>
            <div className="my-profile__reviews-review-edit">
              <TrashBin
                onClick={handleClickDeleteReview}
                data-review-id={review._id}
              />
            </div>

            <h3
              className="my-profile__reviews-review-product-title"
              onClick={() => navigate(`/product/${review.product}`)}
            >
              {review.productName}
            </h3>
            <div className="my-profile__reviews-review-rating mb-1">
              <StarsRating numberOfStars={review.rating} edit={false} />
            </div>
            <p className="my-profile__reviews-review-review">{review.review}</p>
            <div className="my-profile__reviews-review-likes">
              <div>{review.likes}</div>
              <ThumbUpFilled className="my-profile__reviews-review-likes-svg" />
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="user-details-page">
      <div className="user">
        <div className="delete-user" onClick={handleClickDeleteUser}>
          Delete user
        </div>
        <div className="user__header mb-4">
          <div className="user__header--photo">
            <img
              className="user__header--photo-photo"
              src={user.photo}
              alt="not found"
            ></img>
          </div>
          <h2 className="user__header--name"> {user.name}</h2>
        </div>
        <div className="user__body">
          <p className="user__header--email mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="user__header--isAdmin mb-2">
            <strong>Admin:</strong> {user.isAdmin ? "true" : "false"}
          </p>

          <div className="user__body--reviews mb-2">
            <h2 className="mb-2">Reviews</h2>
            {reviews}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserDetailsPage;
