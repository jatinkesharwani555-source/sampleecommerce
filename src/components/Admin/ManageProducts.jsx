import { Link } from 'react-router-dom';
import styles from "./ManageProducts.module.css";
import useAllProducts from '../../hooks/useAllProducts';

const ManageProducts = () => {
const {product, loading, error} = useAllProducts();

  if (loading) return <p className={styles['loading']}>Loading...</p>
  if (error) return <p className={styles['main-error']}>{error}</p>

  return (
    <>
      <div className={styles['page-main-cnt']}>
        <div className={styles['page-container']}>
          <h1 className={styles['page-heading']}>All Collections</h1>
          <div className={styles['product-cnt']}>
            {product && product.map(product => (
              <div className={styles['product-card']} key={product._id}>
                <Link to={`/product/${product._id}`} className={styles['product-cnt-link']}>
                  <div className={styles['product-header']}>
                    <img className={styles['image']} src={`http://localhost:3000/uploads/${product.productImage[0]}`} alt="Product Image" />
                  </div>
                  <div className={styles['product-body']}>
                    <p className={styles['mini-desc']}>{product.productMiniDesc}</p>
                    <p className={styles['price']}>&#8377;{product.discountedPrice} <span className={styles['strikethrough']}>&#8377;{product.productPrice}</span></p>
                    <p className={styles['discount']}>{product.productDiscount}% Off</p>
                  </div>
                </Link>
                <div className={styles['btn-cnt']}>
                  <Link className={styles.editDeleteBtn} to={`/admin/edit-product/${product._id}`}>Edit</Link>
                  <Link className={styles.editDeleteBtn} to={`/admin/delete-product/${product._id}`}>Delete</Link>
                </div>
              </div >
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


export default ManageProducts
