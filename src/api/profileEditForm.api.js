import axiosInstance from "./axiosInstance";

export const submitProfileEditFormApi = (userData) => {
  return axiosInstance.post("/edit-profile", userData, {
    headers: {"Content-Type" : "multipart/form-data"}
  });
};