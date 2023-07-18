import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as ShoppingCart } from "./../../img/svg/shopping-cart.svg";
import { addProductToCart } from "../../store";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(
      addProductToCart({
        productId: product._id,
        productQuantity: 1,
        productName: product.name,
        productImage: product.imageCover,
        productMaxCount: product.count,
        productPrice: product.price,
      })
    );
  };

  return (
    <div className="card">
      <div
        className="card__header"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        {
          //TODO: make this work
          product.imageCover ? (
            <img
              src={product.imageCover}
              alt="not found"
              className="card__header__image"
            ></img>
          ) : (
            <img alt="not found" className="card__header__image"></img>
          )
        }
        <h3 className="card__header__title">{product.name}</h3>
      </div>
      <div
        className="card__body"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <div className="card__body__attributes">
          {product.attrs.slice(0, 5).map((attribute) => (
            <div
              key={attribute._id}
              className="card__body__attributes--attribute"
            >
              <span className="card__body__attributes--attribute-key">
                {attribute.key}
              </span>{" "}
              :{" "}
              <span className="card__body__attributes--attribute-value">
                {attribute.value}
              </span>
            </div>
          ))}
        </div>
        <div className="card__body__stock">
          {product.count > 10 ? (
            <div className="card__body__stock--in-stock">In stock</div>
          ) : product.count !== 0 ? (
            <div className="card__body__stock--few-left">
              Only {product.count} left
            </div>
          ) : (
            <div className="card__body__stock--out-of-stock">Out of stock</div>
          )}
        </div>

        <div className="card__body__footer">
          <div className="card__body__footer__price">{product.price}$</div>
          <div className="card__body__footer__rating">
            {product.rating.toFixed(2)} <span className="star">★</span> (
            {product.reviewsNumber})
          </div>
        </div>
      </div>
      <button
        className={`btn-add-to-cart btn-add-to-cart${
          product.count === 0 ? "--disabled" : "--enabled"
        }`}
        disabled={product.count === 0}
        onClick={handleClick}
      >
        <span>Add to cart</span>
        <ShoppingCart className="btn-add-to-cart__cart-svg" />
      </button>
    </div>
  );
}

export default ProductCard;
