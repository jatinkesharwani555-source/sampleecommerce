import axiosInstance from "./axiosInstance";

export const getLoggingOutApi = () =>
  axiosInstance.get("/logout");
