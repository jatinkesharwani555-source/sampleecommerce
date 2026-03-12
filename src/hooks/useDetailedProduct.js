import { useEffect, useState } from "react";
import { getProductById } from "../api/productApi";
import { addToCartApi } from "../api/addToCart.api";

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
      const response = await getProductById(id);

      setProduct(response.data.data);
      setSelectedImage(response.data.data.productImage?.[0]);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed To Load Detailed Product")
      setError(err.response?.data?.message || "Failed To Load Detailed Product");
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
