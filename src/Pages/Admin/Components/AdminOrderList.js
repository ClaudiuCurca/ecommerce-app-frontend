import React, { useEffect, useState } from "react";
import { createQueryString } from "../../../Api/ProductAPI";
import axiosInstance from "./../../../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

function AdminOrderList({ filters, setMaxResults }) {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const queryString = createQueryString(filters);

        const response = await axiosInstance.get(
          `${API_URL}/api/orders?${queryString}`
        );
        // console.log(response.data.data);
        setOrders(response.data.data);
        setMaxResults(response.data.maxResults);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [filters]);

  if (orders.length === 0) {
    return <div></div>;
  }

  return (
    <div className="items__item-list">
      {orders.map((order) => {
        return (
          <div
            className="items__item-list--item"
            key={order._id}
            onClick={() => navigate(`/admin/orders/${order._id}`)}
          >
            <div className="id">{order._id}</div>
            <div className="status">{order.status}</div>
            <div className="isPaid">{order.isPaid ? "true" : "false"}</div>
            <div className="isDelivered">
              {order.isDelivered ? "true" : "false"}
            </div>
            <div className="paymentMethod"> {order.paymentMethod} </div>
            <div className="price"> {order.totalPrice} $</div>

            <div className="added">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default AdminOrderList;
