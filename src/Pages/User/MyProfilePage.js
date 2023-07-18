import React, { useEffect, useState } from "react";
import MyProfile from "./Components/MyProfile";
import MyReviews from "./Components/MyReviews";
import axios from "axios";
import MyOrders from "./Components/MyOrders";
import axiosInstance from "../../Api/axiosConfig";
import { API_URL } from "../../config";

function MyProfilePage({ userInfo }) {
  const [display, setDispay] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getMyReviews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${API_URL}/api/reviews/user/${userInfo._id}`
        );
        setReviews(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getMyReviews();
  }, [userInfo]);

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `${API_URL}/api/orders/user/${userInfo._id}`
        );
        setOrders(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getMyOrders();
  }, [userInfo]);

  if (isLoading) {
    return <div> loading</div>; //TODO:
  }

  return (
    <div className="my-profile">
      <nav className="my-profile__nav">
        <button
          className={`my-profile__nav--button  ${
            display === "profile" ? "selected" : ""
          }`}
          onClick={() => setDispay("profile")}
        >
          My profile
        </button>
        <div className="dividing-line"></div>
        <button
          className={`my-profile__nav--button  ${
            display === "reviews" ? "selected" : ""
          }`}
          onClick={() => setDispay("reviews")}
        >
          My reviews
        </button>
        <div className="dividing-line"></div>
        <button
          className={`my-profile__nav--button  ${
            display === "orders" ? "selected" : ""
          }`}
          onClick={() => setDispay("orders")}
        >
          My orders
        </button>
      </nav>
      <MyProfile userInfo={userInfo} display={display}></MyProfile>
      <MyReviews reviews={reviews} display={display}></MyReviews>
      <MyOrders orders={orders} display={display} />
    </div>
  );
}

export default MyProfilePage;
