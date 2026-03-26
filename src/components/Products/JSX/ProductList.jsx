import { Link } from 'react-router-dom';
import styles from '../CSS/ProductList.module.css';

const ProductList = ({ products, heading, loggedIn, role, showAdminActions = false }) => {
  return (
    <div className={styles['page-main-cnt']}>
      <div className={styles['page-container']}>
        {heading && <h1 className={styles['page-heading']}>{heading}</h1>}
        <div className={styles['product-cnt']}>
          {products && products.map(product => (
            <div className={styles['product-card']} key={product._id}>
              <Link className={styles['product-cnt-link']} to={`/product/${product._id}`}>
                <div className={styles['product-header']}>
                  <img className={styles['image']} src={product.productImage[0]} alt="Product Image" loading='lazy' />
                </div>
                <div className={styles['product-body']}>
                  <p className={styles['mini-desc']}>{product.productMiniDesc}</p>
                  <p className={styles['price']}>&#8377;{product.productPriceAfterDiscount} <span className={styles['strikethrough']}>&#8377;{product.productPrice}</span></p>
                  <p className={styles['discount']}>{product.productDiscount}% Off</p>
                </div>
              </Link>

              {/* Admin Controls */}
              {showAdminActions && loggedIn && role === "admin" && (
                <div className={styles["edit-del-cnt"]}>
                  <Link to={`/admin/edit-product/${product._id}`}>
                    Edit
                  </Link>
                  <Link to={`/admin/delete-product/${product._id}`}>
                    Delete
                  </Link>
                </div>
              )}
            </div >
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductList
