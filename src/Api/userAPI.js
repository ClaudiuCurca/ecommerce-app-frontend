import Cookies from "js-cookie";
import axiosInstance from "./axiosConfig";
import axios from "axios";
import { API_URL } from "../config";

export const getMyInfo = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/users/getmyinfo`);
    // console.log(response.data);
    sessionStorage.setItem("userInfo", JSON.stringify(response.data.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/users/login`, {
    email,
    password,
  });

  const { token } = response.data;

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  // TODO: look at this expires
  Cookies.set("token", token, { expires: expirationDate });
  getMyInfo();
};

export const signUp = async (name, email, password, passwordConfirm) => {
  const response = await axios.post(`${API_URL}/api/users/signup`, {
    name,
    email,
    password,
    passwordConfirm,
  });

  // so far redundant
  return response.data;
};

export const logout = () => {
  try {
    sessionStorage.removeItem("userInfo");
    Cookies.remove("token");
    window.location.reload();
  } catch (err) {
    throw new Error(err);
  }
};
