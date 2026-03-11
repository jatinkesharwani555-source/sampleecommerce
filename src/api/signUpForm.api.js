import axiosInstance from "./axiosInstance";

export const submitSignupForm = (userData) => {
  return axiosInstance.post("/signup", userData, {
    headers: {"Content-Type" : "multipart/form-data"}
  });
};