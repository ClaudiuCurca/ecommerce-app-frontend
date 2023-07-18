import React, { useEffect, useState } from "react";
import { fetchCategoryAttributes } from "../../Api/CategoryAPI";
import SpinningCircle from "./SpinningCircle";

function AttributesFilter({ updateFilter, categoryName }) {
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [attributes, setAttributes] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategoryNames = async () => {
      try {
        setIsLoading(true);

        const fetchedCategoryAttributes = await fetchCategoryAttributes(
          categoryName
        );
        setCategoryAttributes(fetchedCategoryAttributes);

        setIsLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };

    getCategoryNames();
  }, []);

  const updateAttributesFilter = (e, key, value) => {
    if (e.target.checked) {
      if (attributes[key]) {
        setAttributes({ ...attributes, [key]: [...attributes[key], value] });
      } else {
        setAttributes({ ...attributes, [key]: [value] });
      }
    } else if (e.target.checked === false) {
      // console.log(attributes[key]);
      if (attributes[key].length === 1) {
        setAttributes({ ...attributes, [key]: undefined });
      } else {
        // console.log(attributes[key]);
        setAttributes({
          ...attributes,
          [key]: attributes[key].filter(
            (valueToCheck) => valueToCheck !== value
          ),
        });
      }
    }
  };

  const generateAttributesQueryString = (attributes) => {
    const AttributesQueryString = Object.entries(attributes)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}${value.join("")}`);

    return AttributesQueryString.length > 0
      ? `${AttributesQueryString.join(",")}`
      : "";
  };

  const handleChange = (e) => {
    // console.log(attributes);
    const key = e.target.value.split(",")[0].replace(" ", "%20");
    const value = e.target.value.split(",")[1].replace(" ", "%20");

    updateAttributesFilter(e, key, value);
  };

  // due to the async nature of state updates in react i had to update the main filter after
  // the attributes have changed
  useEffect(() => {
    const attributesQueryString = generateAttributesQueryString(attributes);

    if (attributesQueryString.length > 0) {
      updateFilter("attributes", attributesQueryString);
    } else {
      updateFilter("attributes", undefined);
    }
  }, [attributes]);

  if (isLoading) {
    return (
      <div className="filters__attributes loading">
        <h3 className="filters__attributes title">Attributes</h3>
        <SpinningCircle></SpinningCircle>
      </div>
    );
  }

  return (
    <div className="filters__attributes">
      <h3 className="filters__attributes title">Attributes</h3>
      <div className="filters__attributes attributes-table">
        {categoryAttributes.attrs.map((attribute) => {
          return (
            <div className="attribute" key={attribute._id}>
              <div className="attribute__attribute-key">{attribute.key}</div>
              <fieldset>
                {attribute.value.map((value) => {
                  return (
                    <div className="attribute__attribute-values" key={value}>
                      <input
                        type="checkbox"
                        key={value}
                        onChange={handleChange}
                        value={[attribute.key, `-${value}`]}
                      ></input>
                      <label htmlFor={value}> {value}</label>
                    </div>
                  );
                })}
              </fieldset>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AttributesFilter;
