import axiosInstance from "./axiosInstance";

export const authCheck = () =>
  axiosInstance.get("/auth-check");
