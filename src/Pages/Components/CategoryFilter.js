import React, { useEffect, useState } from "react";
import { fetchCategoryNames } from "../../Api/CategoryAPI";
import SpinningCircle from "./SpinningCircle";

function CategoryFilter({ updateFilter }) {
  const [categoryNames, setCategoryNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [category, setCategory] = useState("");

  const handleClick = (e) => {
    if (category === e.target.value) {
      e.target.checked = false;
      setCategory("");
      updateFilter("category", undefined);
    } else {
      setCategory(e.target.value);
      updateFilter("category", e.target.value);
    }
  };

  useEffect(() => {
    const getCategoryNames = async () => {
      try {
        setIsLoading(true);

        const fetchedCategoryNames = await fetchCategoryNames();
        setCategoryNames(fetchedCategoryNames.data);

        setIsLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };

    getCategoryNames();
  }, []);

  if (isLoading) {
    return (
      <div className="categories-loading">
        <SpinningCircle />
      </div>
    );
  }

  return (
    <div className="filters__category">
      <h3 className="filters__category title">Category</h3>
      <fieldset className="filters__category category-names">
        {categoryNames.map((categoryName) => {
          return (
            <div
              key={categoryName.id}
              className="category-names__category-name"
            >
              <input
                type="radio"
                name="category"
                id={categoryName.name}
                value={categoryName.name}
                onClick={handleClick}
              ></input>
              <label htmlFor={categoryName.name}> {categoryName.name}</label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}

export default CategoryFilter;
