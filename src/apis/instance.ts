import axios from "axios";
const baseUrl = "https://api-dev.proprly.tech";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  //   withCredentials: false,
});

export default api;
