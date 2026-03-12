import { useEffect, useState } from "react";
import { getCart, updateCartItem, removeCartItem } from "../api/cartApi";
import { calculateSubTotal } from "../utils/priceCalculator";
import { SHIPPING_FEE } from "../constants/cart.constants";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      setCartItems(res.data.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed To Load Cart")
      setError(err.response?.data?.message || "Failed To Load Cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subTotal = calculateSubTotal(cartItems);
  const total = subTotal + SHIPPING_FEE;

  return {
    cartItems,
    fetchCart,
    updateCartItem,
    removeCartItem,
    subTotal,
    total,
    loading,
    error,
  };
};

export default useCart;
