import axiosInstance from "./axiosInstance";

export const submitProfileEditFormApi = (userData) => {
  return axiosInstance.post("/edit-profile", userData);
};