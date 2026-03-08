import axiosInstance from "./axiosInstance";

export const getCart = () => axiosInstance.get("/cart/get");

export const updateCartItem = (data) =>
  axiosInstance.put("/cart/update", data);

export const removeCartItem = (productId) =>
  axiosInstance.delete(`/cart/remove/${productId}`);
