import axiosInstance from "./axiosInstance";

export const fetchBestSellerProducts = () =>
  axiosInstance.get("/best-seller-products");
