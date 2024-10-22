/* eslint-disable prettier/prettier */
import axios from "axios";
const baseUrl = "https://api-dev.proprly.tech";

const getToken = () => {
  const loginUser = localStorage.getItem("user");
  if (loginUser) {
    return JSON.parse(loginUser).token;
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
    // Do something before request is sent

    config.headers["Authorization"] = "Bearer " + getToken();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
