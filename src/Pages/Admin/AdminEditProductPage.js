import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosConfig";
import AdminAddProductPage from "./AdminAddProductPage";
import { API_URL } from "../../config";

function AdminEditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/api/products/${params.productId}`
        );
        setProduct(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  if (!product) {
    return (
      <h2 className="flex-center mt-8">Product with this id doesn't exist</h2>
    );
  }

  return <AdminAddProductPage product={product} />;
}

export default AdminEditProductPage;
