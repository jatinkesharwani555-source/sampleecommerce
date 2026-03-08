import styles from '../CSS/ProductList.module.css';
import ProductList from './ProductList';
import useAllProducts from '../../../hooks/useAllProducts';
import LoadingSpinner from '../../LoadingSpinner';

const AllProductList = () => {

  const { product, loading, serverError } = useAllProducts();

  if (loading) return <LoadingSpinner text='Loading' />
  if (serverError) return <p className={styles['main-error']}>{serverError}</p>

  return (
    <>
      <ProductList products={product} heading={"All Collections"} />
    </>
  )
}

export default AllProductList
