import { useEffect, useState } from "react";
import styles from "../CSS/SearchProductsList.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchProducts } from "../../../api/searchProducts.api";
import LoadingSpinner from "../../LoadingSpinner";
import { calculateDiscountedProductsPrice } from "../../../utils/priceCalculator";
import ProductList from "./ProductList";
import useAllProducts from "../../../hooks/useAllProducts";
import { fetchAllProducts } from "../../../api/allProductList.api";

const SearchProductsList = ({ loggedIn, role }) => {

  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [serverError, setserverError] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = searchParams.get("search") || "";

  const fetchProducts = async () => {
    setserverError(null);
    try {
      setLoading(true);
      if (search) {
        const response = await searchProducts(search);
        setProducts(response.data.data);
      } else {
        const response = await fetchAllProducts();
        setProducts(response.data.data);
      }
    } catch (err) {
      setserverError(err.response?.data?.message || "SOMETHING WENT WRONG");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  if (loading) return <LoadingSpinner text="Fetching Products" />;

  if (serverError) return <p className={styles["main-error"]}>{serverError}</p>;

  return (
    <div className={styles["searchProducts-main-cnt"]} id="home">
      <div className={styles["searchProducts-container"]}>

        <h1 className={styles.heading}>
          {search ? `Results for ${search}` : "Most Popular Products"}
        </h1>

        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No products found 😔</h2>
            <p>Try searching something else.</p>

            {/* 🔥 Home Button */}
            <button
              className={styles.homeBtn}
              onClick={() => navigate("/")}
            >
              ⬅ Back to Home
            </button>
          </div>
        ) : (
          <ProductList products={products} loggedIn={loggedIn} role={role} showAdminActions={true} />
        )}
      </div>
    </div>
  );
};

export default SearchProductsList;