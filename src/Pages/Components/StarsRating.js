import React from "react";
import { ReactComponent as Star } from "./../../img/svg/star.svg";

function StarsRating({ numberOfStars, setNumberOfStars, edit }) {
  // return (

  // );

  if (edit) {
    return (
      <div className="stars-rating-toggle ">
        <Star
          className={`stars-rating-toggle__star-5 ${
            numberOfStars === 5 ? "filled" : ""
          }`}
          onClick={() => setNumberOfStars(5)}
        />
        <Star
          className={`stars-rating-toggle__star-4 ${
            numberOfStars >= 4 ? "filled" : ""
          }`}
          onClick={() => setNumberOfStars(4)}
        />
        <Star
          className={`stars-rating-toggle__star-3 ${
            numberOfStars >= 3 ? "filled" : ""
          }`}
          onClick={() => setNumberOfStars(3)}
        />
        <Star
          className={`stars-rating-toggle__star-2 ${
            numberOfStars >= 2 ? "filled" : ""
          }`}
          onClick={() => setNumberOfStars(2)}
        />
        <Star
          className={`stars-rating-toggle__star-1 ${
            numberOfStars >= 1 ? "filled" : ""
          }`}
          onClick={() => setNumberOfStars(1)}
        />
      </div>
    );
  } else {
    return (
      <div id="star-gold">
        {"★".repeat(numberOfStars)}
        {"☆".repeat(5 - numberOfStars)}
      </div>
    );
  }
}

export default StarsRating;
