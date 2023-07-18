import React, { useState } from "react";

function RatingFilter({ updateFilter }) {
  const [rating, setRating] = useState(0);

  const handleClick = (e) => {
    if (e.target.value * 1 === rating * 1) {
      e.target.checked = false;
      setRating(0);
      updateFilter("rating[gte]", undefined);
    } else {
      setRating(e.target.value);
      updateFilter("rating[gte]", e.target.value * 1);
    }
  };

  return (
    <div className="filters__rating">
      <h3 className="filters__rating title">Minumum rating</h3>
      <fieldset>
        <div className="stars--5">
          <input
            type="radio"
            id="5-stars"
            value={5}
            name="star-rating"
            onClick={handleClick}
          ></input>
          <label htmlFor="5-stars">
            <span className="star"> ★★★★★ </span>(5)
          </label>
        </div>
        <div className="stars--4">
          <input
            type="radio"
            id="4-stars"
            value={4}
            name="star-rating"
            onClick={handleClick}
          ></input>
          <label htmlFor="4-stars">
            <span className="star"> ★★★★☆ </span>(4)
          </label>
        </div>
        <div className="stars--3">
          <input
            type="radio"
            id="3-stars"
            value={3}
            name="star-rating"
            onClick={handleClick}
          ></input>
          <label htmlFor="3-stars">
            <span className="star"> ★★★☆☆ </span>(3)
          </label>
        </div>
        <div className="stars--2">
          <input
            type="radio"
            id="2-stars"
            value={2}
            name="star-rating"
            onClick={handleClick}
          ></input>
          <label htmlFor="2-stars">
            <span className="star"> ★★☆☆☆ </span>(2)
          </label>
        </div>
        <div className="stars--1">
          <input
            type="radio"
            id="1-stars"
            value={1}
            name="star-rating"
            onClick={handleClick}
          ></input>
          <label htmlFor="1-stars">
            <span className="star"> ★☆☆☆☆ </span>(1)
          </label>
        </div>
      </fieldset>
      <div className="filters__rating stars"></div>
    </div>
  );
}

export default RatingFilter;
