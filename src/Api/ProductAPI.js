import axios from "axios";
import { API_URL } from "../config";

export const createQueryString = (filters) => {
  const queryParams = Object.entries(filters)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`);

  return queryParams.length > 0 ? `${queryParams.join("&")}` : "";
};

export const fetchProducts = async (queryString) => {
  try {
    // console.log(queryString);
    const response = await axios.get(`${API_URL}/api/products?${queryString}`);
    return response.data;
  } catch (error) {
    // Handle error
    throw new Error(error);
  }
};
