import React, { useState } from "react";
import { ReactComponent as ArrowUp } from "./../../img/svg/up-arrow.svg";

const arrowHidden = {
  opacity: 0,
};
const arrowShown = { opacity: 1 };
const arrowRotateDown = { transform: "rotate(180deg)" };

function SortBy({ updateFilter }) {
  const [sortBy, setSortBy] = useState(""); //TODO: these should come as props
  const [arrowController, setArrowController] = useState(arrowHidden);

  const handleChange = (e) => {
    setSortBy(e.target.value);
    updateFilter("sort", e.target.value);
    setArrowController(arrowShown);
  };

  const handleClick = (e) => {
    if (e.target.value === sortBy) {
      setArrowController(arrowRotateDown);
      updateFilter("sort", `-${e.target.value}`);
      setSortBy(`-${e.target.value}`);
    } else if (sortBy === `-${e.target.value}`) {
      setSortBy("");
      updateFilter("sort", undefined);
      setArrowController(arrowHidden);
      e.target.checked = false;
    }
  };

  // should have done this using .map() with a sortableBy array. This would make it more scalable
  return (
    <div className="filters__sort-by">
      <h3 className="filters__sort-by title">
        <ArrowUp className="arrow-up" style={arrowController} /> Sort by
      </h3>
      <div className="sort">
        <fieldset>
          <div className="price">
            <input
              type="radio"
              id="by-price"
              name="sort-by"
              value={"price"}
              onChange={handleChange}
              onClick={handleClick}
            ></input>
            <label htmlFor="by-price">Price</label>
          </div>
          <div className="rating">
            <input
              type="radio"
              id="rating"
              name="sort-by"
              value={"rating"}
              onChange={handleChange}
              onClick={handleClick}
            ></input>
            <label htmlFor="rating">Rating</label>
          </div>
          <div className="popularity">
            <input
              type="radio"
              id="popularity"
              name="sort-by"
              value={"reviewsNumber"}
              onChange={handleChange}
              onClick={handleClick}
            ></input>
            <label htmlFor="popularity">Popularity</label>
          </div>
          <div className="newest">
            <input
              type="radio"
              id="newest"
              name="sort-by"
              value={"createdAt"}
              onChange={handleChange}
              onClick={handleClick}
            ></input>
            <label htmlFor="newest">Newest</label>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default SortBy;
