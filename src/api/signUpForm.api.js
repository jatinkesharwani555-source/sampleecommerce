import axiosInstance from "./axiosInstance";

export const submitSignupForm = (userData) => {
  return axiosInstance.post("/signup", userData);
};