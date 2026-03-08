import axiosInstance from "./axiosInstance";

export const submitChangePasswordFormApi = (userData) => {
  return axiosInstance.post("/change-password", userData);
};