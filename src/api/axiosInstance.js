import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "https://api.kesharwanimart.in/api",
  withCredentials: true,
});

export default axiosInstance;
