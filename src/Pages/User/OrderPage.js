import React, { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosConfig";
import { useParams } from "react-router-dom";
import { ReactComponent as EditIcon } from "./../../img/svg/edit.svg";
import Input from "./../Components/Input";
import Modal from "../Components/Modal";
import { API_URL } from "../../config";

function OrderPage() {
  const params = useParams();
  const [order, setOrder] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/orders/${params.orderId}`
        );
        // console.log(response.data.data);
        setContactName(response.data.data.deliveryAddress.contactName);
        setContactPhoneNumber(
          response.data.data.deliveryAddress.contactPhoneNumber
        );
        setDeliveryLocation(
          response.data.data.deliveryAddress.deliveryLocation
        );

        setOrder(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrder();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        contactName.length === 0 ||
        contactPhoneNumber.length === 0 ||
        deliveryLocation.length === 0
      ) {
        setError("All fields are required");
        setTimeout(() => {
          setError(undefined);
        }, 3000);
      } else {
        await axiosInstance.patch(
          `${API_URL}/api/orders/${order._id}/updateDeliveryAddress`,
          {
            contactName,
            contactPhoneNumber,
            deliveryLocation,
          }
        );
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!order) {
    return <></>;
  }

  let modalEditAddres = <></>;
  if (order.status === "confirmed") {
    modalEditAddres = (
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div
          className="order-page__change-address-modal--alert"
          style={{ display: `${error === undefined ? "none" : ""}` }}
        >
          {error}
        </div>
        <form
          className="order-page__change-address-modal"
          onSubmit={handleSubmit}
        >
          {" "}
          <Input
            label={"Contact name"}
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            id={"contactName"}
            maxLength={25}
          />
          <Input
            label={"Contact phone number"}
            value={contactPhoneNumber}
            onChange={(e) => setContactPhoneNumber(e.target.value)}
            id={"contactPhoneNumber"}
            maxLength={15}
            type={"number"}
          />
          <Input
            label={"Delivery address"}
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            id={"deliveryLocation"}
            maxLength={250}
            type={"textarea"}
            height={10}
          />
          <button className="order-page__change-address-modal--button">
            Save new address
          </button>
        </form>
      </Modal>
    );
  }

  return (
    <div className="order-page">
      {modalEditAddres}
      <div className="order">
        <header className="order__header">
          <div className="order__header--id-and-placed-at">
            <div className="column">
              <h3 className="order__header--order-id">
                <strong>Order</strong> #{order._id}{" "}
              </h3>
              <div className="order__header--status mb-4">
                <strong>Status:</strong> {order.status}{" "}
              </div>
            </div>
            <div className="column">
              Placed: {new Date(order.createdAt).toLocaleTimeString()}{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="order__header--estimated-delivery">
            {order.status !== "fullfilled" ? (
              <p>
                <strong>Estimated delivery time: </strong> 2 days
              </p>
            ) : (
              <p>
                <strong>Delivered at: </strong>
                {new Date(order.deliveredAt).toLocaleTimeString()}{" "}
                {new Date(order.deliveredAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="order__header--delivery-address">
            <p>Name: {order.deliveryAddress.contactName}</p>
            <p>Phone number: {order.deliveryAddress.contactPhoneNumber}</p>
            <div>
              Delivery location: {order.deliveryAddress.deliveryLocation}
            </div>
            {order.status === "confirmed" ? (
              <div className="edit-icon" onClick={() => setShowModal(true)}>
                <EditIcon></EditIcon>
              </div>
            ) : (
              <></>
            )}
          </div>
        </header>
        <div className="order__body">
          <div className="order__body--items">
            {order.items.map((item) => {
              return (
                <div className="order__body--items-item" key={item._id}>
                  <img
                    src={item.image}
                    alt="not found"
                    className="order__body--items-item-image"
                  ></img>
                  <div className="order__body--items-item-name-and-price">
                    <p>
                      {item.name} - {item.price}$
                    </p>
                  </div>
                  <div className="order__body--items-item-count">
                    x{item.quantity}
                  </div>
                  <div className="order__body--items-item-total-price">
                    {item.quantity * item.price}$
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="order__footer">
          <div className="order__footer--payment-method">
            <strong>Payment:</strong>{" "}
            {order.paymentMethod === "cashAtDelivery"
              ? "Cash at delivery"
              : "Card"}
          </div>
          <div className="order__footer--total-price">
            <strong>Total: </strong> {order.totalPrice}$
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
