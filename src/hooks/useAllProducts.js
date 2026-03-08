import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api/allProductList.api";
import { calculateDiscountedProductsPrice } from "../utils/priceCalculator";

const useAllProducts = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllProduct = async () => {
    setError(null);
    try {
      setLoading(true);
      const response = await fetchAllProducts();
      setProduct(calculateDiscountedProductsPrice(response.data.data));
    } catch (err) {
      setError("Failed To Load Product");
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
