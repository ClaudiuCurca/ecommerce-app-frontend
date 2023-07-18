import React, { useState } from "react";
import axiosInstance from "../../../Api/axiosConfig";
import { API_URL } from "../../../config";

function AddDeliveryAddress({ setError }) {
  const [contactName, setContactName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const handleClick = async (e) => {
    try {
      if (!contactName || !contactPhoneNumber || !deliveryLocation) {
        setError("All fields must be completed");
        setTimeout(() => {
          setError(undefined);
        }, 3000);
      } else {
        const response = await axiosInstance.patch(
          `${API_URL}/api/users/addaddress`,
          {
            contactName,
            contactPhoneNumber,
            deliveryLocation,
          }
        );
        // console.log(response.data);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.errors[0].message);
      setTimeout(() => {
        setError(undefined);
      }, 3000);
    }
  };

  return (
    <form className="delivery-address">
      <p>
        <label htmlFor="contactName">
          <strong>Contact name: </strong>
        </label>
        <input
          id="contactName"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        ></input>
      </p>
      <p>
        <label htmlFor="contactPhoneNumber">
          <strong>Phone number: </strong>
        </label>
        <input
          type="number"
          id="contactPhoneNumber"
          value={contactPhoneNumber}
          onChange={(e) => setContactPhoneNumber(e.target.value)}
        ></input>
      </p>
      <p>
        <label htmlFor="deliveryLocation">
          <strong>Delivery location: </strong>
        </label>
        <input
          id="deliveryLocation"
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
        ></input>
      </p>
      <span className="save-address" onClick={handleClick}>
        ✔
      </span>
    </form>
  );
}

export default AddDeliveryAddress;
