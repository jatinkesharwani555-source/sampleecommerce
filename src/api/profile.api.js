import axiosInstance from "./axiosInstance";

export const getPresentUserApi = () =>
  axiosInstance.get("/profile");
