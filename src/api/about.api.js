import axiosInstance from "./axiosInstance";

export const fetchAboutApi = () =>
  axiosInstance.get("/aboutPage");
