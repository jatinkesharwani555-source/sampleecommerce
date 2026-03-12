import { useState, useEffect } from "react";
import { getProductById } from "../api/productApi";

const useProduct = (id) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getProductById(id);
      setProduct(response.data.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed To Load Product")
      setError(err.response?.data?.message || "Failed To Load Product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return {
    product, loading, error, setProduct, fetchProduct
  }
}

export default useProduct
