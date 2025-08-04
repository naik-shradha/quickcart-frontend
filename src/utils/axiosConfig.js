// src/utils/axiosConfig.js
import axios from "axios";
import store from "../redux/store";
import { toast } from "react-toastify";


const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔐 Attaching token:", token);
    } else {
      console.warn("⚠️ No token found in Redux store");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
    } else if (error.response.status >= 500) {
      toast.error("Server error. Please try again later.");
    }
    return Promise.reject(error);
  }
);


export default instance;
