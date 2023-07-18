import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "./Components/Carrousel";
import ProductReviews from "./Components/ProductReviews";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../store";
import { API_URL } from "../config";

function ProductDetailsPage({ userInfo }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/products/${params.productId}`
        );
        // console.log(response.data.data);
        setProduct(response.data.data);

        if (userInfo) {
          setAlreadyReviewed(
            userInfo.productsReviewed.includes(params.productId)
          );
        }
      } catch (err) {
        console.log(err.response.data.error);
        if (
          err.response.data.error.name === "CastError" ||
          err.response.data.error.statusCode === 404
        ) {
          setProduct("Product with this id does not exist");
        }
      }
    };

    getProduct();
  }, []);

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

  if (!product) {
    return <div></div>;
  } else if (product === "Product with this id does not exist") {
    return (
      <h2 className="flex-center" style={{ marginTop: "10rem" }}>
        Product with this id does not exist
      </h2>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product">
        <button
          className="product__category"
          onClick={() => navigate(`/category/${product.category}`)}
        >
          {product.category}
        </button>
        <div className="product__header">
          <div className="product__header--photo-carousel">
            <Carousel images={[product.imageCover, ...product.images]} />
          </div>
          <div className="product__header--info">
            <div className="product__header--info-price-and-rating ">
              <h1 className="price ">{product.price} $ </h1>
              <div className="rating">
                {product.reviewsNumber > 0 ? (
                  <>
                    <div className="rating__stars">
                      {product.rating.toFixed(2)} <span id="star-gold">★</span>
                    </div>
                    <div> {product.reviewsNumber} reviews</div>
                  </>
                ) : (
                  <div>No reviews yet</div>
                )}
              </div>
            </div>

            <div className="product__header--info-stock-and-cart">
              <div className="stock">
                {product.count > 10 ? (
                  "In Stock"
                ) : product.count > 1 ? (
                  <p className="stock--few">Only {product.count} left</p>
                ) : (
                  <p className="stock-out">Out of stock</p>
                )}
              </div>
              {product.count > 0 ? (
                <button className="add-to-cart-button" onClick={handleClick}>
                  Add to cart
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="product__body">
          <h1 className="product__body--title"> {product.name} </h1>

          <h2 className="mb-2">Attributes</h2>
          <div className="product__body--attributes">
            {" "}
            {product.attrs.map((attribute) => {
              return (
                <div
                  className="product__body--attributes-attribute"
                  key={attribute._id}
                >
                  <span className="attribute-key">{attribute.key}: </span>{" "}
                  {attribute.value}
                </div>
              );
            })}{" "}
          </div>
          <h2>Description</h2>
          <p className="product__body--description">{product.description}</p>
          <div className="product__body--reviews-title">
            <h2>Reviews</h2>{" "}
            {userInfo ? (
              alreadyReviewed === true ? (
                <div>You already reviewed this product</div>
              ) : (
                <button
                  className="product__body--reviews-title-add-review"
                  onClick={() =>
                    navigate(`/product/${product._id}/write-review`)
                  }
                >
                  Add review
                </button>
              )
            ) : (
              <div>Log in to write a review</div>
            )}
          </div>
          <ProductReviews productId={product._id} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
