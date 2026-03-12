import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api/allProductList.api";

const useAllProducts = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllProduct = async () => {
    setError(null);
    try {
      setLoading(true);
      const response = await fetchAllProducts();
      setProduct(response.data.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed To Load Product")
      setError(err.response?.data?.message || "Failed To Load Product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return {
    product, loading, error, setProduct, fetchAllProduct
  }
}

export default useAllProducts
