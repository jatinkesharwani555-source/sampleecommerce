import axiosInstance from "./axiosInstance";

export const getProductById = (id) =>
  axiosInstance.get(`/product/${id}`);
