import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Components/Input";
import axiosInstance from "../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../store";
import SpinningCircle from "./Components/SpinningCircle";
import { API_URL } from "../config";

function CheckoutPage({ userInfo }) {
  let cartItems = useSelector((state) => state.cart);
  const cartTotal = cartItems.reduce(
    (partialSum, item) => partialSum + item.productQuantity * item.productPrice,
    0
  );

  cartItems = cartItems.map((item) => {
    return { productId: item.productId, productQuantity: item.productQuantity };
  });

  const [useSavedAddress, setUseSavedAddress] = useState(null);
  const [contactName, setContactName] = useState(userInfo.name);
  const [contactPhoneNumber, setContactPhoneNumber] = useState(
    userInfo.phoneNumber
  );
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashAtDelivery");
  const [sendingOrder, setSendingOrder] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickSavedAddress = (e) => {
    setContactName(e.currentTarget.dataset.contactName);
    setContactPhoneNumber(e.currentTarget.dataset.contactPhoneNumber);
    setDeliveryLocation(e.currentTarget.dataset.deliveryLocation);
    setUseSavedAddress(e.currentTarget.dataset.addressId);
  };

  const handleClickForm = (e) => {
    setUseSavedAddress(null);
  };

  const handleClickSendOrder = async (e) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/api/orders/createOrder`,
        {
          paymentMethod,
          deliveryAddress: {
            contactName,
            contactPhoneNumber,
            deliveryLocation,
          },
          cartItems,
        }
      );
      setSendingOrder(true);

      setTimeout(() => {
        const productId = response.data.data._id;
        dispatch(emptyCart());

        navigate(`/my-orders/${productId}`);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout">Your cart has no items</div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout">
        <h3 className="mb-2">Delivery address</h3>
        <div className="checkout__delivery-address mb-2">
          <div
            className={`checkout__delivery-address--form ${
              useSavedAddress === null ? "" : "inactive"
            }`}
            onClick={handleClickForm}
          >
            <div>
              <Input
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                label={"Name"}
                maxLength={20}
              ></Input>
            </div>
            <div>
              <Input
                id="contactPhoneNumber"
                value={contactPhoneNumber}
                onChange={(e) => setContactPhoneNumber(e.target.value)}
                label={"Phone Number"}
                type={"number"}
                maxLength={15}
              ></Input>{" "}
            </div>
            <div>
              <Input
                id="deliveryLocation"
                type={"textarea"}
                height={7}
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                label={"Delivery location"}
              ></Input>
            </div>
          </div>
          {userInfo.savedAddresses?.length > 0 ? (
            <>
              {" "}
              <div
                className={`checkout__delivery-address--saved ${
                  useSavedAddress !== null ? "" : "inactive"
                }`}
              >
                <h4>Or use a saved address </h4>
                {userInfo.savedAddresses.map((address) => {
                  return (
                    <div
                      className={`saved-address ${
                        useSavedAddress === address._id ? "active" : ""
                      }`}
                      key={address._id}
                      data-address-id={address._id}
                      data-contact-name={address.contactName}
                      data-contact-phone-number={address.contactPhoneNumber}
                      data-delivery-location={address.deliveryLocation}
                      onClick={handleClickSavedAddress}
                    >
                      <div className="saved-address-name">
                        <strong>Name:</strong> {address.contactName}
                      </div>
                      <div className="saved-address-phoneNumber">
                        <strong>Phone number:</strong>{" "}
                        {address.contactPhoneNumber}
                      </div>
                      <div className="saved-address-deliveryLocation">
                        <strong>Delivery location:</strong>{" "}
                        {address.deliveryLocation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <h3 className="mb-2">Payment method</h3>
        <div className="checkout__payment-method mb-2">
          <div className="mr-1">Select method:</div>
          <select
            name="paymentMethod"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
            }}
          >
            <option value={"cashAtDelivery"}>Cash at delivery</option>
            <option disabled value={"card"}>
              Card (not yet implemented)
            </option>
          </select>
        </div>
        <div className="checkout__footer">
          {sendingOrder === false ? (
            <>
              {" "}
              <h2 className="checkout__footer--total mb-2">
                Total: {cartTotal}${" "}
              </h2>
              <button
                className="checkout__footer--send-order-button"
                onClick={handleClickSendOrder}
              >
                Send order
              </button>
            </>
          ) : (
            <>
              <button
                className="checkout__footer--sending-order"
                onClick={handleClickSendOrder}
              >
                <span className="mr-1">Sending order</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
