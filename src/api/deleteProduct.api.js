import axiosInstance from "./axiosInstance";

export const deleteProductApi = (id) => {
  return axiosInstance.delete(`/admin/delete-product/${id}`);
};