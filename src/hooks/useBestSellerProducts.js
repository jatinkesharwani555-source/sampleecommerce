import { useEffect, useState } from "react";
import { fetchBestSellerProducts } from "../api/bestSellerProducts.api";

const useBestSellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setServerError(null);
    try {
      setLoading(true);
      const response = await fetchBestSellerProducts();
      setProducts(response.data.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed To Load BestSeller Products")
      setError(err.response?.data?.message || "Failed To Load BestSeller Products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, serverError };
};

export default useBestSellerProducts;
