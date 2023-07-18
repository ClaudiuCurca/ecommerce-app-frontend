import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import axios from "axios";
import axiosInstance from "../../Api/axiosConfig";
import ProductFormAttributes from "./Components/ProductFormAttributes";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

// attributesTable

function AdminAddProductPage({ product }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [attributes, setAttributes] = useState([]); // attributes are meant to be shown in the form

  const [images, setImages] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [attributesTable, setAttributesTable] = useState(undefined); // attributesTable are meant to be sent
  const [price, setPrice] = useState(product?.price || 0);
  const [count, setCount] = useState(product?.count || 0);

  const [fieldErrors, setFieldErrors] = useState({
    name: undefined,
    description: undefined,
    attributes: undefined,
    price: undefined,
    count: undefined,
  });
  const [attributesTableErrors, setAttributesTableErrors] = useState({});

  const navigate = useNavigate();

  const updateFieldErrors = (filterName, value) => {
    setFieldErrors((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const updateAttributesErrors = (filterName, value) => {
    setAttributesTableErrors((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories`);

        setCategories(response.data.data);

        if (product) {
          const productCategoryIndex = response.data.data.findIndex(
            (category) => category.name === product.category
          );

          setCategory(response.data.data[productCategoryIndex].name);
          setSelectedCategoryIndex(productCategoryIndex);

          setAttributes(response.data.data[productCategoryIndex].attrs);

          const attrs = response.data.data[productCategoryIndex].attrs.map(
            (attribute) => {
              return { key: attribute.key, value: "" };
            }
          );

          const attrsTable = product.attrs.map((attribute) => {
            return { key: attribute.key, value: attribute.value };
          });

          setAttributesTable(Object.values({ ...attrs, ...attrsTable }));
        } else {
          setCategory(response.data.data[0].name);
          setAttributes(response.data.data[0].attrs);
          const attrs = response.data.data[0].attrs.map((attribute) => {
            return { key: attribute.key, value: "" };
          });
          setAttributesTable(attrs);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(categories[e.target.value].name);
    setSelectedCategoryIndex(e.target.value);
    setAttributes(categories[e.target.value].attrs);
    const attrs = categories[e.target.value].attrs.map((attribute) => {
      return { key: attribute.key, value: "" };
    });

    if (product && product.category === categories[e.target.value].name) {
      const attrsTable = product.attrs.map((attribute) => {
        return { key: attribute.key, value: attribute.value };
      });

      setAttributesTable(Object.values({ ...attrs, ...attrsTable }));
    } else {
      setAttributesTable(attrs);
    }
  };

  const handleClickAddProduct = async (e) => {
    try {
      const attributesErrors = attributesTable
        .filter((attr) => {
          return attr.value.trim().length === 0;
        })
        .map((attr) => attr.key);

      if (
        name.trim().length === 0 ||
        description.trim().length === 0 ||
        price.length === 0 ||
        count.length === 0 ||
        attributesErrors.length > 0
      ) {
        // check if any field is empty or if there are errors in attributes
        if (name.trim().length === 0)
          updateFieldErrors("name", "Name is required");

        if (description.trim().length === 0)
          updateFieldErrors("description", "Description is required");

        if (price.length === 0) updateFieldErrors("price", "Price is required");

        if (count.length === 0) updateFieldErrors("count", "Count is required");

        if (attributesErrors.length > 0) {
          attributesErrors.forEach((attr) =>
            updateAttributesErrors(attr, "attribute can't be empty")
          );
        }
      } else {
        const formData = new FormData();

        if (images) {
          for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
          }
        }
        formData.append("name", name);
        formData.append("description", description);
        formData.append("count", count);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("attributesTable", JSON.stringify(attributesTable));

        let response;
        if (product) {
          response = await axiosInstance.patch(
            `${API_URL}/api/products/${product._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          response = await axiosInstance.post(
            `${API_URL}/api/products`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        // console.log(response);
        navigate("/admin/products");
      }
    } catch (err) {
      if (err.response.data.errors[0].field === "name") {
        updateFieldErrors("name", err.response.data.errors[0].message);
      }
    }
  };

  const handleClickDeleteProduct = async (e) => {
    try {
      const response = await axiosInstance.delete(
        `${API_URL}/api/products/${product._id}`
      );
      console.log(response);
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  };

  if (categories.length === 0) return <div>You have no category</div>;

  return (
    <div className="add-edit-product-page">
      <h1 className="product-form__title mb-4">
        {product ? "Edit product" : "Add new product"}
      </h1>
      <div className="product-form">
        <div className="delete-product" onClick={handleClickDeleteProduct}>
          Delete product
        </div>

        <div className="product-form__images mb-2">
          <label htmlFor="images">
            Choose images (first selected will be cover)
          </label>
          <input
            type="file"
            id="images"
            accept="image/png, image/jpeg"
            max={3}
            multiple
            name="images"
            onChange={(e) => setImages(e.target.files)}
          />
        </div>

        <div className="product-form__name">
          <Input
            label={"Name"}
            value={name}
            onChange={(e) => {
              if (fieldErrors.name) updateFieldErrors("name", undefined);
              setName(e.target.value);
            }}
            fieldError={fieldErrors.name}
          />
        </div>

        <Input
          type={"textarea"}
          height={10}
          label={"Description"}
          value={description}
          fieldError={fieldErrors.description}
          onChange={(e) => {
            if (fieldErrors.description)
              updateFieldErrors("description", undefined);
            setDescription(e.target.value);
          }}
        />

        <div className="product-form__category mb-2">
          <div>
            <label className="mr-1">Category</label>
            <select
              className="product-form__category--select"
              value={selectedCategoryIndex}
              onChange={handleCategoryChange}
            >
              {categories.map((category, index) => (
                <option key={category._id} value={index}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="product-form__category--add-new"
            onClick={() => navigate("/admin/categories/add-category")}
          >
            Add new category
          </button>
        </div>

        <ProductFormAttributes
          attributes={attributes}
          setAttributes={setAttributes}
          attributesTable={attributesTable}
          setAttributesTable={setAttributesTable}
          attributesTableErrors={attributesTableErrors}
          updateAttributesErrors={updateAttributesErrors}
        />

        <div className="product-form__price-and-count mb-2">
          <Input
            type={"number"}
            label={"price ($)"}
            value={price}
            onChange={(e) => {
              if (fieldErrors.price) updateFieldErrors("price", undefined);
              setPrice(e.target.value);
            }}
            fieldError={fieldErrors.price}
          />
          <Input
            type={"number"}
            label={"count"}
            value={count}
            onChange={(e) => {
              if (fieldErrors.count) updateFieldErrors("count", undefined);
              setCount(e.target.value);
            }}
            fieldError={fieldErrors.count}
          />
        </div>

        <button
          className="product-form__add-new-product"
          onClick={handleClickAddProduct}
        >
          {product ? "Update Product" : "Add new product"}
        </button>
      </div>
    </div>
  );
}

export default AdminAddProductPage;
