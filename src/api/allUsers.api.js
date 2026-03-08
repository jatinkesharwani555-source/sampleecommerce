import axiosInstance from "./axiosInstance";

export const getAllUsersApi = () =>
  axiosInstance.get("/admin/all-users");
