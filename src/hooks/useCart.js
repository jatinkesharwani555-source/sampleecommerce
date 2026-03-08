import { useEffect, useState } from "react";
import { getCart, updateCartItem, removeCartItem } from "../api/cartApi";
import { calculateSubTotal } from "../utils/priceCalculator";
import { SHIPPING_FEE } from "../constants/cart.constants";

const useCart = (navigate) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      setCartItems(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      else setError("FAILED TO LOAD CART");
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
