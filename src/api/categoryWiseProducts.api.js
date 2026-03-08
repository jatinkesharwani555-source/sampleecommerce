import axiosInstance from "./axiosInstance";

export const fetchCategoryWiseProductsApi = (category) => {
  return axiosInstance.get("/get-products-by-category", {
    params: { category }
  });
}