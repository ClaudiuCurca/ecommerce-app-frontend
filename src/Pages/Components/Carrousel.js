import React, { useRef, useState } from "react";
import { ReactComponent as ArrowUp } from "./../../img/svg/up-arrow.svg";

function Carousel({ images }) {
  const [imageShow, setImageShow] = useState(0);

  const containerRef = useRef(null);
  let initialTouchX = null;

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

      if (imageShow > 0) {
        setImageShow(imageShow - 1);
      } else {
        setImageShow(images.length - 1);
      }
    } else if (deltaX < -swipeThreshold) {
      console.log("go to next");

      if (imageShow < images.length - 1) {
        setImageShow(imageShow + 1);
      } else {
        setImageShow(0);
      }
    }

    initialTouchX = null;
  };

  const handleClickGoLeft = () => {
    if (imageShow > 0) {
      setImageShow(imageShow - 1);
    }
  };

  const handleClickGoRight = () => {
    if (imageShow < images.length - 1) {
      setImageShow(imageShow + 1);
    }
  };

  return (
    <div
      className="carousel"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ touchAction: "pan-y" }}
    >
      <div className="carousel__images">
        {" "}
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt="not found"
              key={index}
              className={`carousel__images--image `}
              style={{ transform: `translateX(-${imageShow * 100}%)` }}
            ></img>
          );
        })}
      </div>

      <button className="carousel__go-left" onClick={handleClickGoLeft}>
        <ArrowUp id="arrow-left-big" />
      </button>

      <button className="carousel__go-right" onClick={handleClickGoRight}>
        <ArrowUp id="arrow-right-big" />
      </button>

      <div className="carousel__pagination">
        {images.map((image, index) => (
          <div
            className={`carousel__pagination--page ${
              imageShow === index ? "active" : ""
            } `}
            key={`image${index}`}
            value={index}
            style={{
              width: images.length >= 6 ? "5%" : "10%",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
