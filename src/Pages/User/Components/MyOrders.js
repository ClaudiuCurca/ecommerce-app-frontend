import React from "react";
import { useNavigate } from "react-router-dom";

function MyOrders({ orders, display }) {
  const navigate = useNavigate();

  let content;
  if (orders.length < 1) {
    content = <h3>You have no orders</h3>;
  } else {
    content = (
      <>
        {orders.map((order) => {
          return (
            <div
              className="my-profile__orders--order"
              key={order._id}
              onClick={() => navigate(`/my-orders/${order._id}`)}
            >
              <div className="my-profile__orders--order-id">
                <strong>Order</strong> #{order._id}
              </div>
              <div className="my-profile__orders--order-status">
                <strong>Status:</strong> {order.status}
              </div>

              <div className="my-profile__orders--order-delivery-location">
                Delivery location: {order.deliveryAddress.deliveryLocation}
              </div>
              <div className="my-profile__orders--order-phone-number">
                Phone number: {order.deliveryAddress.contactPhoneNumber}
              </div>

              {order.items.map((item) => {
                return (
                  <div
                    className="my-profile__orders--order-product"
                    key={item._id}
                  >
                    <strong>{item.quantity}x </strong>
                    {item.name} - {item.price}$
                  </div>
                );
              })}

              <div className="my-profile__orders--order-payment-method">
                Payment method:{" "}
                {order.paymentMethod === "cashAtDelivery"
                  ? "Cash at delivery"
                  : "Card"}
              </div>
              <div className="my-profile__orders--order-created-at">
                Placed: {new Date(order.createdAt).toLocaleTimeString()}{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="my-profile__orders--order-total-price">
                Total price: {order.totalPrice} $
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div
      className="my-profile__orders"
      style={{ display: `${display !== "orders" ? "none" : ""}` }}
    >
      {content}
    </div>
  );
}

export default MyOrders;
