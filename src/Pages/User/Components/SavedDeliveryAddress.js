import React from "react";
import axiosInstance from "../../../Api/axiosConfig";
import { API_URL } from "../../../config";

function SavedDeliveryAddress({ address }) {
  const handleClick = async (e) => {
    try {
      await axiosInstance.delete(
        `${API_URL}/api/users/deleteaddress/${address._id}`
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="delivery-address">
      <p>
        <strong>Contact name: </strong>
        {address.contactName}
      </p>
      <p>
        <strong>Contact phone number: </strong>
        {address.contactPhoneNumber}
      </p>
      <p>
        <strong>Delivery location: </strong>
        {address.deliveryLocation}
      </p>
      <span className="delete-address" onClick={handleClick}>
        x
      </span>
    </div>
  );
}

export default SavedDeliveryAddress;
