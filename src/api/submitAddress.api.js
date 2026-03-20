import axiosInstance from "./axiosInstance";

export const submitAddressForm = (data) => {
  return axiosInstance.post("/add-address", data);
};