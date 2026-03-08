import { useState, useEffect } from "react";
import { getProductById } from "../api/productApi";
import { calculateDiscountedPrice } from "../utils/priceCalculator";

const useProduct = (id) => {
  const [product, setProduct] = useState({});
  const [discountedPrice, setDiscountedPrice] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getProductById(id);
      setProduct(response.data.data);
      setDiscountedPrice(calculateDiscountedPrice(response.data.data.productPrice, response.data.data.productDiscount));
    } catch (err) {
      setError("Failed To Load Product");
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
    product, discountedPrice, loading, error, setProduct, fetchProduct
  }
}

export default useProduct
