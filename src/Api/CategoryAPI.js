import axios from "axios";
import { API_URL } from "../config";

export const fetchCategoryNames = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/categories/?select=name,description`
    );

    return response.data;
  } catch (error) {
    // Handle error
    throw new Error(error);
  }
};

export const fetchCategoryAttributes = async (categoryName) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/categories/${categoryName}`
    );

    return response.data.data[0];
  } catch (error) {
    // Handle error
    throw new Error(error);
  }
};
