/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import axios from "axios";
const baseUrl =  import.meta.env["VITE_API_URL"] ||"https://api-dev.proprly.tech";

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
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
