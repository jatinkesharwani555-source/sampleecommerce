import axiosInstance from "./axiosInstance";

export const submitContactForm = (FormData) => {
  return axiosInstance.post("/contact", FormData);
};