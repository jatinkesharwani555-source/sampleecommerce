import styles from "../CSS/ProductList.module.css";
import useBestSellerProducts from "../../../hooks/useBestSellerProducts";
import ProductList from "./ProductList";
import LoadingSpinner from "../../LoadingSpinner";

const BestSellerProducts = () => {
  const { products, loading, serverError } = useBestSellerProducts();

  if (loading) return <LoadingSpinner text="Loading" />
  if (serverError) return <p className={styles["main-error"]}>{serverError}</p>;

  return (
    <>
      <ProductList products={products} heading={"Our Best Selling Products"} />
    </>
  );
};

export default BestSellerProducts;
