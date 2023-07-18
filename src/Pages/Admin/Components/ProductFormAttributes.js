import React, { useState } from "react";
import Input from "../../Components/Input";

function ProductFormAttributes({
  attributes,
  setAttributes,
  attributesTable,
  setAttributesTable,
  attributesTableErrors,
  updateAttributesErrors,
}) {
  const [attributeToAdd, setAttributeToAdd] = useState(""); // these are serialized to be sent
  const [attributeToAddError, setAttributeToAddError] = useState(undefined);

  const handleClickAddAttribute = (e) => {
    if (attributeToAdd === "") {
      setAttributeToAddError("Attribute key can't be empty");
    } else {
      const attributeAlreadyExists = attributes.filter(
        (attribute) => attribute.key === attributeToAdd
      );

      if (attributeAlreadyExists.length > 0) {
        setAttributeToAddError("Attribute key already exists");
      } else {
        const updatedAttributes = [
          ...attributes,
          { key: attributeToAdd, value: [], id: attributeToAdd },
        ];

        setAttributes(updatedAttributes);

        const updatedAttributesTable = [
          ...attributesTable,
          { key: attributeToAdd, value: "" },
        ];
        setAttributesTable(updatedAttributesTable);
      }
    }
  };

  const handleClickDeleteAttribute = (e) => {
    const indexToRemove = e.target.value;

    const updatedAttributes = attributes.filter((attribute, index) => {
      return index !== indexToRemove * 1;
    });
    setAttributes(updatedAttributes);

    const updatedAttributesTable = attributesTable.filter((attr, index) => {
      return index !== indexToRemove * 1;
    });
    setAttributesTable(updatedAttributesTable);
  };

  const handleAttributeValueChange = (e) => {
    updateAttributesErrors(e.target.id, undefined);

    const attributeToBeUpdatedKey = e.target.id;
    const newValue = e.target.value;

    const updatedAttributesTable = attributesTable.map((attr) => {
      if (attr.key === attributeToBeUpdatedKey) {
        return { ...attr, value: newValue };
      }
      return attr;
    });

    setAttributesTable(updatedAttributesTable);
  };

  return (
    <div className="product-form__attributes mb-4">
      <h2 className="product-form__attributes--title">Attributes</h2>
      {attributes.map((attribute, index) => (
        <div
          className="product-form__attributes--attribute"
          key={attribute.key}
        >
          <Input
            id={attribute.key}
            label={attribute.key}
            list={`${attribute.key}list`}
            value={attributesTable[index].value}
            onChange={handleAttributeValueChange}
            fieldError={attributesTableErrors[attribute.key]}
          />
          <datalist id={`${attribute.key}list`}>
            {attribute.value.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </datalist>
          <button
            className="product-form__attributes--attribute-delete"
            value={index}
            onClick={handleClickDeleteAttribute}
          >
            X
          </button>
        </div>
      ))}

      <form
        className="product-form__attributes--add-attribute"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          label={"key"}
          value={attributeToAdd}
          onChange={(e) => {
            if (attributeToAddError) setAttributeToAddError(undefined);
            setAttributeToAdd(e.target.value);
          }}
          fieldError={attributeToAddError}
        ></Input>
        <button
          className="product-form__attributes--add-attribute-add-button"
          onClick={handleClickAddAttribute}
        >
          Add attribute
        </button>
      </form>
    </div>
  );
}

export default ProductFormAttributes;
