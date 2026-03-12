import { useState, useEffect } from 'react'
import { deleteProductApi } from '../../api/deleteProduct.api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './DeleteProduct.module.css';
import LoadingSpinner from '../LoadingSpinner';
import useProduct from '../../hooks/useProduct';

const DeleteProduct = () => {
  const [serverError, setServerError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch Product 
  const { product, loading, error } = useProduct(id);

  const handleDelete = async () => {
    setServerError(null);
    try {
      setDeleteLoading(true);
      const response = await deleteProductApi(id);

      navigate("/admin/manage-products")
    } catch (err) {
      setServerError("Failed To Delete Product");
    } finally {
      setDeleteLoading(false);
    }
  }

  // For SEO 
  useEffect(() => {
    document.title = "Sign Up | Kesharwani Mart";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) return <LoadingSpinner text='Fetching Product' />;

  return (
    <div className={styles['page-cnt']}>
      <h4>Are You Sure To Delete This Product?</h4>

      {serverError && <p>{serverError}</p>}

      {product && (
        <Link to={`/product/${product._id}`}>
          <img src={product?.productImage?.[0] || "/default-product-image.jpg"} alt="Product Image" />
          <div className={styles["product-info"]}>
            <p><strong>Name:</strong> {product.productMiniDesc}</p>
            <p><strong>Price:</strong> ₹{product.productPrice}</p>
            <p><strong>Discount:</strong> ₹{product.productDiscount}</p>
            <p><strong>Discounted Price:</strong> ₹{product.productPriceAfterDiscount}</p>
            <p><strong>Category:</strong> {product.productCategory}</p>
          </div>
        </Link>
      )}
      <button onClick={() => navigate("/admin/manage-products")}>
        Cancel
      </button>
      <button onClick={handleDelete} disabled={deleteLoading}>
        {deleteLoading ? "Deleting..." : "Delete Product"}
      </button>
    </div>
  )
}

export default DeleteProduct
