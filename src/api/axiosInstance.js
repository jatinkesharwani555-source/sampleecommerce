import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.kesharwanimart.in/api",
  withCredentials: true,
});

export default axiosInstance;
