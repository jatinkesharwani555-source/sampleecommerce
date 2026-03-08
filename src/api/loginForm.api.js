import axiosInstance from "./axiosInstance";

export const submitLoginForm = (userData) => {
  return axiosInstance.post("/login", userData);
};