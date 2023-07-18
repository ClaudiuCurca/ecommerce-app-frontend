import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminAddCategoryPage from "./AdminAddCategoryPage";
import { API_URL } from "../../config";

function AdminEditCategoryPage() {
  const [category, setCategory] = useState([]);
  const params = useParams();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/categories/${params.categoryName}`
        );
        console.log(response);
        setCategory(response.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

  if (category?.length < 1) {
    return <div></div>;
  }

  return <AdminAddCategoryPage category={category} />;
}

export default AdminEditCategoryPage;
