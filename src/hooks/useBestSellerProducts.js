import { useEffect, useState } from "react";
import { fetchBestSellerProducts } from "../api/bestSellerProducts.api";
import { calculateDiscountedProductsPrice } from "../utils/priceCalculator";

const useBestSellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setServerError(null);
    try {
      setLoading(true);
      const response = await fetchBestSellerProducts();
      setProducts(calculateDiscountedProductsPrice(response.data.data));
    } catch (err) {
      setServerError(err.response?.data?.message || "Something Went Wrong");
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
