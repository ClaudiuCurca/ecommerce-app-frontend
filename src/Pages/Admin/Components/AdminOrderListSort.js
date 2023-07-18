import React, { useState } from "react";
import { ReactComponent as Arrow } from "./../../../img/svg/up-arrow.svg";

const arrowUp = { opacity: 1 };
const arrowDown = { transform: "rotate(180deg)", opacity: 1 };

function AdminOrderListSort({ updateFilter }) {
  const [sortBy, setSortBy] = useState("-createdAt");

  const handleClick = (e) => {
    // console.log(e.target.value);
    if (sortBy === e.target.value) {
      setSortBy(`-${e.target.value}`);
      updateFilter("sort", `-${e.target.value}`);
    } else if (sortBy === `-${e.target.value}`) {
      setSortBy(undefined);
      updateFilter("sort", undefined);
    } else {
      setSortBy(e.target.value);
      updateFilter("sort", e.target.value);
    }
  };

  return (
    <div className="items__item-list--header mb-1">
      {[
        "_id",
        "status",
        "isPaid",
        "isDelivered",
        "paymentMethod",
        "totalPrice",
        "createdAt",
      ].map((fieldName) => (
        <button
          className={`${fieldName}`}
          value={fieldName}
          onClick={handleClick}
          key={fieldName}
        >
          {fieldName}
          <Arrow
            className="arrow"
            style={
              sortBy === fieldName
                ? arrowUp
                : sortBy === `-${fieldName}`
                ? arrowDown
                : {}
            }
          />
        </button>
      ))}
    </div>
  );
}

export default AdminOrderListSort;
