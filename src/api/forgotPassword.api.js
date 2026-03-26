import axiosInstance from "./axiosInstance";

export const forgotPasswordApi = (email) => {
  return axiosInstance.post("/forgot-password", email);
};