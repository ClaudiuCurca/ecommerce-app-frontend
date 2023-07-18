import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../config";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

//TODO: when the cookie will expire fix it (send to login screen and say 'your session has expired')
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
