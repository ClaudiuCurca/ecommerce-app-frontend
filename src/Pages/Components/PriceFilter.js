import React, { useCallback, useRef, useState } from "react";
import { debounce } from "lodash";
import RangeSlider from "./RangeSlider";

function PriceFilter({ updateFilter, MAXPRODPRICE }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAXPRODPRICE);

  const latestValues = useRef({ minPrice: 0, maxPrice: MAXPRODPRICE });

  const debouncedUpdateFilter = useCallback(
    debounce((minPrice, maxPrice) => {
      updateFilter("price[gte]", minPrice);
      updateFilter("price[lte]", maxPrice);
    }, 1000),
    []
  );

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    latestValues.current.minPrice = e.target.value;
    debouncedUpdateFilter(
      latestValues.current.minPrice,
      latestValues.current.maxPrice
    );
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    latestValues.current.maxPrice = e.target.value;
    debouncedUpdateFilter(
      latestValues.current.minPrice,
      latestValues.current.maxPrice
    );
  };

  return (
    <div className="filters__price">
      <h3 className="filters__price title">Price range</h3>
      <div className="filters__price min-max-price">
        <div className="min-max-price__min">
          Min{" "}
          <input
            className="min-max-price__input min-price-input"
            onChange={handleMinPriceChange}
            value={minPrice}
          ></input>
        </div>
        -
        <div className="min-max-price__max">
          Max{" "}
          <input
            className="min-max-price__input max-price-input"
            onChange={handleMaxPriceChange}
            value={maxPrice}
          ></input>
        </div>
      </div>
      <RangeSlider
        minValue={minPrice}
        maxValue={maxPrice}
        maxRange={MAXPRODPRICE}
        setMinValue={setMinPrice}
        setMaxValue={setMaxPrice}
        latestValues={latestValues}
        debouncedUpdateFilter={debouncedUpdateFilter}
      />
    </div>
  );
}

export default PriceFilter;
