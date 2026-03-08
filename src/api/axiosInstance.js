import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sampleecommercebackend-2.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
