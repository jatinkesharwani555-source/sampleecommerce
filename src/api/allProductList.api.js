import axiosInstance from "./axiosInstance";

export const fetchAllProducts = () =>
  axiosInstance.get("/home");
