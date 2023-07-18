import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as ArrowUp } from "./../../img/svg/up-arrow.svg";
import { addProductToCart } from "../../store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function PromoCarousel({ products }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [productShow, setProductShow] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  let initialTouchX = null;

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 601);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTouchStart = (event) => {
    initialTouchX = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (initialTouchX === null) {
      return;
    }

    const currentTouchX = event.touches[0].clientX;
    const deltaX = currentTouchX - initialTouchX;

    const swipeThreshold = 2;

    if (deltaX > swipeThreshold) {
      console.log("go to previous");

      if (productShow > 0) {
        setProductShow(productShow - 1);
      } else {
        setProductShow(products.length - 1);
      }
    } else if (deltaX < -swipeThreshold) {
      console.log("go to next");

      if (productShow < products.length - 1) {
        setProductShow(productShow + 1);
      } else {
        setProductShow(0);
      }
    }

    initialTouchX = null;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (productShow < products.length - 1) {
        setProductShow(productShow + 1);
      } else {
        setProductShow(0);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [productShow, products.length]);

  const handleClickGoLeft = () => {
    if (productShow > 0) {
      setProductShow(productShow - 1);
    } else {
      setProductShow(products.length - 1);
    }
  };

  const handleClickGoRight = () => {
    if (productShow < products.length - 1) {
      setProductShow(productShow + 1);
    } else {
      setProductShow(0);
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ touchAction: "pan-y" }}
      className="promo__carousel"
    >
      {products.map((product) => {
        return (
          <div
            key={product._id}
            className="promo__carousel--product"
            style={{ transform: `translateX(-${productShow * 100}%)` }}
          >
            <img
              alt=""
              src={product.imageCover}
              className="promo__carousel--product-image-cover"
              onClick={() => navigate(`/product/${product._id}`)}
            ></img>

            <div className="promo__carousel--product-category">
              New in {product.category}
            </div>
            <div className="promo__carousel--product-header">
              <h2
                className="promo__carousel--product-header-name"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                {product.name}
              </h2>
              <div className="promo__carousel--product-header-rating">
                {product.reviewsNumber > 0 && (
                  <>
                    {product.rating} <span id="star-gold">★</span> (
                    {product.reviewsNumber})
                  </>
                )}
              </div>
            </div>
            <div className="promo__carousel--product-attributes">
              {isSmallScreen
                ? product.attrs.slice(0, 4).map((attr) => {
                    return (
                      <div key={attr.key}>
                        <strong>{attr.key}:</strong> {attr.value}
                      </div>
                    );
                  })
                : product.attrs.slice(0, 24).map((attr) => {
                    return (
                      <div key={attr.key}>
                        <strong>{attr.key}:</strong> {attr.value}
                      </div>
                    );
                  })}
            </div>
            <div className="promo__carousel--product-price-and-cart">
              <div className="promo__carousel--product-price-and-cart-price">
                {product.price} $
              </div>
              <button
                className="promo__carousel--product-price-and-cart-cart"
                onClick={() => {
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
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        );
      })}

      <button className="promo__carousel--go-left" onClick={handleClickGoLeft}>
        <ArrowUp id="arrow-left-big" />
      </button>

      <button
        className="promo__carousel--go-right"
        onClick={handleClickGoRight}
      >
        <ArrowUp id="arrow-right-big" />
      </button>
      <div className="promo__carousel--pagination">
        {[...Array(products.length).keys()].map((page) => {
          return (
            <div
              key={page}
              className={`promo__carousel--pagination-page ${
                productShow === page ? "active" : ""
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default PromoCarousel;
