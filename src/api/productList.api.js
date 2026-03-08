import axiosInstance from "./axiosInstance";

export const fetchProductListApi = (param) => {
  return axiosInstance.get("/product-list", {
    params: { ...param }
  });
}