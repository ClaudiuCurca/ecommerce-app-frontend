import React from "react";
import { ReactComponent as ShoppingCart } from "./../../img/svg/shopping-cart.svg";
import SpinningCircle from "./SpinningCircle";
import LoadingText from "./LoadingText";

function ProductCardsLoading({ numberOfLoadingCards }) {
  return (
    <div className="product-list">
      {Array.from({ length: numberOfLoadingCards }, (_, i) => i + 1).map(
        (i) => (
          <div className="card-loading" key={i}>
            <div className="card-loading__header">
              <div className="card-loading__header__loading-image">
                <SpinningCircle />
              </div>
              <h3 className="card-loading__header__title">
                <LoadingText />
              </h3>
            </div>
            <div className="card-loading__body">
              <div className="card-loading__body__attributes">
                {" "}
                <LoadingText />{" "}
              </div>
              <div className="card-loading__body__attributes">
                <LoadingText />
              </div>
              <div className="card-loading__body__attributes">
                <LoadingText />
              </div>

              <div className="card-loading__body__stock">
                <LoadingText />
              </div>

              <div className="card-loading__body__footer"></div>
            </div>
            <button
              className={`btn-add-to-cart btn-add-to-cart--disabled`}
              disabled
            >
              <span>Add to cart</span>
              <ShoppingCart className="btn-add-to-cart__cart-svg" />
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default ProductCardsLoading;
