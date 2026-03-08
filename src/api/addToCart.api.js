import axiosInstance from "./axiosInstance";

export const addToCartApi = (payload) =>
  axiosInstance.post("/cart/add", payload);
