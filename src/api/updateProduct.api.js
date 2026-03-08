import axiosInstance from "./axiosInstance";

export const updateProductApi = (id, formData) => {
  return axiosInstance.put(`/admin/update-product/${id}`, formData);
};