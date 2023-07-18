import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantityToProduct,
  removeProductFromCart,
  removeQuantityFromProduct,
} from "../store";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const cartTotal = cartItems.reduce(
    (partialSum, item) => partialSum + item.productQuantity * item.productPrice,
    0
  );

  const handleClickRemoveFromCart = (e) => {
    const productIdToRemove = e.target.value;
    dispatch(removeProductFromCart(productIdToRemove));
  };

  const handleClickAddQuantity = (e) => {
    dispatch(addQuantityToProduct(e.target.value));
  };

  const handleClickRemoveQuantity = (e) => {
    dispatch(removeQuantityFromProduct(e.target.value));
  };

  return (
    <div className="cart-page">
      <div className="cart">
        {cartItems.length > 0 ? (
          <>
            {" "}
            <h1 className="cart__title">My Cart</h1>
            <div className="cart__items mb-4">
              {cartItems.map((cartItem) => (
                <div key={cartItem.productId} className="cart__item">
                  <img
                    src={cartItem.productImage}
                    alt="not found"
                    className="cart__item-image"
                  ></img>
                  <div className="cart__item-name">{cartItem.productName}</div>
                  <div className="cart__item-price">
                    {" "}
                    {cartItem.productPrice}${" "}
                  </div>
                  <div className="cart__item-count">
                    <div>Quantity</div>
                    <div>
                      <button
                        className="cart__item-count--minus"
                        value={cartItem.productId}
                        onClick={handleClickRemoveQuantity}
                      >
                        −
                      </button>{" "}
                      {cartItem.productQuantity}
                      <button
                        className="cart__item-count--plus"
                        value={cartItem.productId}
                        onClick={handleClickAddQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart__item-total-price">
                    {" "}
                    {cartItem.productPrice * cartItem.productQuantity}$
                  </div>
                  <button
                    className="cart__item-remove"
                    onClick={handleClickRemoveFromCart}
                    value={cartItem.productId}
                  >
                    Remove from cart
                  </button>
                </div>
              ))}
              <div className="cart__footer">
                <h2 className="cart__footer--total-price">
                  {" "}
                  Cart total: {cartTotal}${" "}
                </h2>
                <button
                  className="cart__footer--go-to-checkout"
                  onClick={() => navigate("/cart/checkout")}
                >
                  Go to Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <h2 className="cart__title">Your cart is empty</h2>
        )}
      </div>
    </div>
  );
}

export default CartPage;
