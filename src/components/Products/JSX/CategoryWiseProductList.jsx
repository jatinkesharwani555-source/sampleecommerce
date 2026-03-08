import styles from '../CSS/CategoryWiseProductList.module.css';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../../../constants/categories.constants';
import useCategoryWiseProductList from '../../../hooks/useCategoryWiseProductList';
import ProductList from './ProductList';
import LoadingSpinner from '../../LoadingSpinner';

const CategoryWiseProductList = ({ loggedIn, role }) => {

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || CATEGORIES[0];

  const { product, loading, serverError } = useCategoryWiseProductList(category);

  if (loading) return <LoadingSpinner text='Fetching Products'/>
  if (serverError) return <p className={styles['main-error']}>{serverError}</p>

  return (
    <>
      <div className={styles['productList-main-cnt']}>
        <div className={styles['productList-container']}>
          <div className={styles['categories']}>
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat}
                to={`/product-list?category=${cat}`}
                className={category === cat ? styles.activeCategory : styles.inactiveCategory}
              >
                {cat}
              </NavLink>
            ))}
          </div>
          <ProductList products={product} heading={category} loggedIn={loggedIn} role={role} />
        </div>
      </div>
    </>
  )
}

export default CategoryWiseProductList
