import React from "react";

function RangeSlider({
  minValue,
  maxValue,
  maxRange,
  setMaxValue,
  setMinValue,
  latestValues,
  debouncedUpdateFilter,
}) {
  const handleMinValueChange = (e) => {
    if (e.target.value * 1 > maxValue) {
      setMaxValue(e.target.value * 1 + 1);
      latestValues.current.minPrice = e.target.value * 1 + 1;
      debouncedUpdateFilter(
        latestValues.current.minPrice,
        latestValues.current.maxPrice
      );
    }
    setMinValue(e.target.value);
    latestValues.current.minPrice = e.target.value;
    debouncedUpdateFilter(
      latestValues.current.minPrice,
      latestValues.current.maxPrice
    );
  };

  const handleMaxValueChange = (e) => {
    if (e.target.value * 1 < minValue) {
      setMinValue(e.target.value - 1);
      latestValues.current.minPrice = e.target.value - 1;
      debouncedUpdateFilter(
        latestValues.current.minPrice,
        latestValues.current.maxPrice
      );
    }
    setMaxValue(e.target.value);
    latestValues.current.maxPrice = e.target.value;
    debouncedUpdateFilter(
      latestValues.current.minPrice,
      latestValues.current.maxPrice
    );
  };

  return (
    <div className="slider">
      <input
        type="range"
        className="slider__min"
        min={0}
        max={maxRange}
        value={minValue}
        onChange={handleMinValueChange}
      ></input>
      <input
        type="range"
        className="slider__max"
        min={0}
        max={maxRange}
        value={maxValue}
        onChange={handleMaxValueChange}
      ></input>
      <div
        className="slider__range"
        style={{
          left: `${(minValue / maxRange) * 100}%`,
          width: `${((maxValue - minValue) / maxRange) * 100}%`,
        }}
      ></div>
    </div>
  );
}

export default RangeSlider;
