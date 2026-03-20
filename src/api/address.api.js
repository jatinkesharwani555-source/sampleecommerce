import axiosInstance from "./axiosInstance";

export const getUserAddresses = () =>
  axiosInstance.get("/fetch-addresses");
