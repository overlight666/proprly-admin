/* eslint-disable prettier/prettier */
import axios from "axios";
const baseUrl = "https://api-dev.proprly.tech";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return null;
  }
};

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  //   withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
