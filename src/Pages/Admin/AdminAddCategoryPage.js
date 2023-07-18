import React, { useState } from "react";
import Input from "../Components/Input";
import axiosInstance from "../../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function AdminAddCategoryPage({ category }) {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [attrs, setAttrs] = useState(category?.attrs || []);

  const [keyToAdd, setKeyToAdd] = useState("");
  const [valuesToAdd, setValuesToAdd] = useState({});

  const [fieldErrors, setFieldErrors] = useState({
    name: undefined,
    description: undefined,
    keyToAdd: undefined,
  });

  const navigate = useNavigate();

  const updateFieldErrors = (filterName, value) => {
    setFieldErrors((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleChangeValuesToAdd = (e) => {
    const attributeKey = e.target.id;

    if (fieldErrors[attributeKey]) {
      updateFieldErrors(attributeKey, undefined);
    }

    const updatedValuesToAdd = {
      ...valuesToAdd,
      [attributeKey]: e.target.value,
    };

    setValuesToAdd(updatedValuesToAdd);
  };

  const handleAddValue = (e) => {
    const attributeToUpdateKey = e.target.id;

    const attributeToUpdate = attrs.filter(
      (attr) => attr.key === attributeToUpdateKey
    );

    const valueAlreadyExists = attributeToUpdate[0].value.includes(
      valuesToAdd[attributeToUpdateKey]
    );

    if (valueAlreadyExists) {
      updateFieldErrors(attributeToUpdateKey, "Value already exists");
    } else if (
      valuesToAdd[attributeToUpdateKey] === undefined ||
      valuesToAdd[attributeToUpdateKey].trim().length === 0
    ) {
      updateFieldErrors(attributeToUpdateKey, "Value can't be empty");
    } else {
      const updatedAttrs = attrs.map((attr, index) => {
        if (attr.key === attributeToUpdateKey) {
          return {
            key: attrs[index].key,
            value: [...attrs[index].value, valuesToAdd[attr.key]],
          };
        }

        return attr;
      });

      setAttrs(updatedAttrs);
    }
  };

  const handleClickDeleteValue = (e) => {
    const attributeToUpdateKey = e.target.id;
    const valueToRemove = e.target.value;
    const updatedAttrs = attrs.map((attr) => {
      if (attr.key === attributeToUpdateKey) {
        const updatedValues = attr.value.filter(
          (value) => value !== valueToRemove
        );

        return { key: attr.key, value: updatedValues };
      }
      return attr;
    });
    setAttrs(updatedAttrs);
  };

  const handleClickAddKey = (e) => {
    if (keyToAdd.trim() === "") {
      updateFieldErrors("keyToAdd", "Key can't be empty");
    } else {
      const keyAlreadyExists = attrs.map((attr) => attr.key).includes(keyToAdd);
      if (keyAlreadyExists) {
        updateFieldErrors("keyToAdd", "Key already exists");
      } else {
        setAttrs([...attrs, { key: keyToAdd, value: [] }]);
        const updatedValuesToAdd = {
          ...valuesToAdd,
          [keyToAdd]: "",
        };
        setValuesToAdd(updatedValuesToAdd);
        setKeyToAdd("");
      }
    }
  };

  const handleClickDeleteKey = (e) => {
    const keyToDelete = e.target.id;
    const updatedAttrs = attrs.filter((attr) => attr.key !== keyToDelete);

    setValuesToAdd({ ...valuesToAdd, [keyToDelete]: undefined });
    setAttrs(updatedAttrs);
  };

  const handleClickSaveCategory = async (e) => {
    try {
      if (name.trim() === "" || description.trim() === "") {
        if (name.trim() === "")
          updateFieldErrors("name", "Name can't be empty");
        if (description.trim() === "")
          updateFieldErrors("description", "Description can't be empty");
      } else {
        let response;
        if (category) {
          response = await axiosInstance.patch(
            `${API_URL}/api/categories/${category._id}`,
            {
              name,
              description,
              attrs,
            }
          );
        } else {
          response = await axiosInstance.post(`${API_URL}/api/categories/`, {
            name,
            description,
            attrs,
          });
        }
        navigate("/admin/categories/");
      }
    } catch (err) {
      const { errors } = err.response.data;
      errors.forEach((error) => updateFieldErrors(error.field, error.message));
    }
  };

  const handleClickDeleteCategory = async (e) => {
    try {
      await axiosInstance.delete(`${API_URL}/api/categories/${category._id}`);

      navigate("/admin/categories");
    } catch (err) {}
  };

  return (
    <div className="add-edit-category-page">
      <h1 className="title">
        {category ? `Update ${category.name} category` : "Add a new category"}
      </h1>
      <div className="category-form">
        {category && (
          <div className="delete-category" onClick={handleClickDeleteCategory}>
            Delete category
          </div>
        )}
        <Input
          label={"Name"}
          onChange={(e) => {
            if (fieldErrors.name) updateFieldErrors("name", undefined);
            setName(e.target.value);
          }}
          value={name}
          fieldError={fieldErrors.name}
        />
        <Input
          label={"Description"}
          type={"textarea"}
          height={15}
          onChange={(e) => {
            if (fieldErrors.description)
              updateFieldErrors("description", undefined);
            setDescription(e.target.value);
          }}
          value={description}
          fieldError={fieldErrors.description}
        />
        <div className="category-form__attributes mb-2">
          <h2 className="category-form__attributes--title">Attributes</h2>
          {attrs.map((attribute, index) => (
            <div
              className="category-form__attributes--attribute"
              key={attribute.key}
            >
              <div className="category-form__attributes--attribute-name ">
                <h3>{attribute.key}</h3>
                <button
                  className="delete-key-button"
                  id={attribute.key}
                  onClick={handleClickDeleteKey}
                >
                  x
                </button>
              </div>
              {attribute.value.map((value) => (
                <div
                  className="category-form__attributes--attribute-value "
                  key={value}
                >
                  {value}
                  <button
                    className="delete-value-button"
                    id={attribute.key}
                    onClick={handleClickDeleteValue}
                    value={value}
                  >
                    x
                  </button>
                </div>
              ))}
              <form
                className="category-form__attributes--attribute-add-value"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  label={"value"}
                  id={attribute.key}
                  value={valuesToAdd[attribute.key]}
                  onChange={handleChangeValuesToAdd}
                  placeholder={`Add value for ${attribute.key}`}
                  fieldError={fieldErrors[attribute.key]}
                />
                <button
                  className="add-value-button"
                  id={attribute.key}
                  onClick={handleAddValue}
                >
                  Add value{" "}
                </button>
              </form>
            </div>
          ))}
          <form
            className="category-form__attributes--add-key"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              label={"Key"}
              value={keyToAdd}
              onChange={(e) => {
                if (fieldErrors.keyToAdd) {
                  updateFieldErrors("keyToAdd", undefined);
                }
                setKeyToAdd(e.target.value);
              }}
              fieldError={fieldErrors.keyToAdd}
            />
            <button className="add-key-button" onClick={handleClickAddKey}>
              Add key
            </button>
          </form>
        </div>
        <button
          className="category-form__button"
          onClick={handleClickSaveCategory}
        >
          Save category
        </button>
      </div>
    </div>
  );
}

export default AdminAddCategoryPage;
