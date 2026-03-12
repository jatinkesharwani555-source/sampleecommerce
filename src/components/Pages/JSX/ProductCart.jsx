import { Link } from "react-router-dom";
import style from "../CSS/ProductCart.module.css";
import useCart from "../../../hooks/useCart.js";
import { SHIPPING_FEE } from "../../../constants/cart.constants";
import LoadingSpinner from "../../LoadingSpinner.jsx";
import { useEffect } from "react";

const ProductCart = () => {

  const {
    cartItems,
    fetchCart,
    updateCartItem,
    removeCartItem,
    subTotal,
    total,
    error,
    loading,
  } = useCart();

  // For SEO 
  useEffect(() => {
    document.title = "Cart | Kesharwani Mart";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) return <LoadingSpinner text="Loading Cart Items" />;
  if (error) return <p className={style["main-error"]}>{error}</p>;

  return (
    <div className={style["cart-main-cnt"]}>
      <div className={style["cart-cnt"]}>
        <div className={style["section1"]}>
          <h1 className={style["page-heading"]}>YOUR CART</h1>

          {cartItems.length === 0 && (
            <p className={style["empty-cart"]}>Your cart is empty</p>
          )}

          {cartItems.map((item) => (
            <div key={item._id} className={style["cart-item"]}>
              <div className={style["product-details"]}>
                <Link to={`/product/${item.productId._id}`}>
                  <div className={style["part1-image"]}>
                    <img
                      src={item.productId.productImage?.[0] || "/default-product-image.jpg"}
                      alt={item.productId.productMiniDesc}
                      className={style["product-img"]}
                    />
                  </div>
                </Link>

                <div className={style["part2-product-info"]}>
                  <h3>{item.productId.productMiniDesc}</h3>
                  <p>₹{item.productId.productPrice}</p>

                  <div className={style["buttons"]}>
                    <div className={style["quantity-box"]}>
                      <button
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartItem({
                            productId: item.productId._id,
                            type: "decrement",
                          }).then(fetchCart)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateCartItem({
                            productId: item.productId._id,
                            type: "increment",
                          }).then(fetchCart)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className={style["remove-btn"]}
                      onClick={() =>
                        removeCartItem(item.productId._id).then(fetchCart)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <p className={style["item-total"]}>
                ₹{item.productId.productPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {
        cartItems.length > 0 && (
          <div className={style["section2"]}>
            <h2 className={style["heading"]}>CART TOTALS</h2>

            <div className={style["price-grouping"]}>
              <div className={style["price"]}>
                <p className={style["quote"]}>SubTotal</p>
                <p className={style["money"]}>₹{subTotal}.00</p>
              </div>

              <div className={style["price"]}>
                <p className={style["quote"]}>Shipping Fee</p>
                <p className={style["money"]}>₹{SHIPPING_FEE}.00</p>
              </div>

              <div className={`${style["price"]} ${style["total-price"]}`}>
                <p className={style["quote"]}>Total</p>
                <p className={style["money"]}>₹{total}.00</p>
              </div>
            </div>

            <div className={style["proceed-btn-cnt"]}>
              <Link to="/" className={style["proceed-btn"]}>
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default ProductCart;
