import { useEffect, useState } from "react";
import { getProductById } from "../api/productApi";
import { addToCartApi } from "../api/addToCart.api";
import { calculateDiscountedPrice } from "../utils/priceCalculator";

const useProductDetails = (id, navigate) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartError, setCartError] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await getProductById(id);

      const discountedPrice = calculateDiscountedPrice(
        data.data.productPrice,
        data.data.productDiscount
      );

      setProduct({ ...data.data, discountedPrice });
      setSelectedImage(data.data.productImage?.[0]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if(!product) return;
    try {
      setCartLoading(true);
      await addToCartApi({ productId: product._id, quantity: 1 });
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }
      setCartError(err.response?.data?.message || "Add to cart failed");
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return {
    product,
    selectedImage,
    setSelectedImage,
    loading,
    error,
    cartLoading,
    cartError,
    addToCart,
  };
};

export default useProductDetails;
