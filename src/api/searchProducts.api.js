import axiosInstance from "./axiosInstance";

export const searchProducts = (search) => {
  return axiosInstance.get(`/search-products?search=${search}`);
};