import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../CSS/DetailedProduct.module.css";
import HomePageOptions from "../../Pages/JSX/HomePageOptions";
import ProductList from "./SimilarProductList";
import useProductDetails from "../../../hooks/useDetailedProduct";
import LoadingSpinner from "../../LoadingSpinner";
import useCart from "../../../hooks/useCart";

const DetailedProduct = ({ loggedIn, role }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    product,
    selectedImage,
    setSelectedImage,
    loading,
    error,
    cartLoading,
    cartError,
    addToCart,
  } = useProductDetails(id, navigate);

  const { cartItems, fetchCart } = useCart();

  const isInCart = cartItems.some(
    (item) => item.productId?._id === product?._id
  );

  const handleAddToCart = async () => {
    if(!loggedIn) {
      navigate("/login");
      return;
    }
    await addToCart();
    fetchCart();
  };

  if (loading) return <LoadingSpinner text="Loading" />
  if (error) return <p className={styles["main-error"]}>{error}</p>;
  if (!product) return null;

  return (
    <div className={styles["product-main-cnt"]}>
      <div className={styles["product-cnt"]}>
        <div className={styles.section1}>
          <div className={styles.part1}>
            <div className={styles["all-img-cnt"]}>
              {product.productImage?.map((img, i) => (
                <div
                  key={i}
                  className={styles["single-img-cnt"]}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt="" />
                </div>
              ))}
            </div>

            <div className={styles["img-cnt"]}>
              <Link to={`/product/image-preview/${product._id}/${encodeURIComponent(selectedImage)}`}>
                <img
                  src={selectedImage}
                  className={styles.image}
                  alt=""
                />
              </Link>
            </div>
          </div>

          <div className={styles.part2}>
            <h2>{product.productMiniDesc}</h2>
            <p className={styles.price}>
              ₹{product.discountedPrice}
              <span>₹{product.productPrice}</span>
            </p>
            <p className={styles.discount}>{product.productDiscount}% OFF</p>
            <p>{product.productDesc}</p>

            <div className={styles["btn-cnt"]}>
              {isInCart ? (
                <Link to="/product-cart">Go To Cart</Link>
              ) : (
                <button onClick={handleAddToCart} disabled={cartLoading}>
                  {cartLoading ? "Adding..." : "Add To Cart"}
                </button>
              )}

              <Link to={`/buy/${product._id}`}>Buy Now</Link>
            </div>

            {/* ✅ Admin Links */}
            {loggedIn && role === "admin" && (
              <div className={styles["edit-del-cnt"]}>
                <Link className={styles.editBtn} to={`/admin/edit-product/${product._id}`}>
                  Edit Product
                </Link>

                <Link className={styles.deleteBtn} to={`/admin/delete-product/${product._id}`}>
                  Delete Product
                </Link>
              </div>
            )}

            {cartError && <p className={styles["main-error"]}>{cartError}</p>}
          </div>
        </div>

        <div className={styles.section2}>
          <HomePageOptions />
          <ProductList
            ProductCategory={product.productCategory}
            productId={product._id}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
