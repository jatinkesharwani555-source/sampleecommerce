import axiosInstance from "./axiosInstance";

export const submitProductForm = (FormData) => {
  return axiosInstance.post("/admin/create-product", FormData);
};