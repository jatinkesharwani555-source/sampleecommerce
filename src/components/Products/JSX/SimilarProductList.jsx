import { useEffect, useState } from 'react'
import styles from '../../Pages/CSS/HomePage.module.css';
import { Link } from 'react-router-dom';
import { calculateDiscountedProductsPrice } from '../../../utils/priceCalculator';
import { fetchProductListApi } from '../../../api/productList.api';
import ProductList from './ProductList';
import LoadingSpinner from '../../LoadingSpinner';

const SimilarProductList = ({ productCategory, productId }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState();

  const fetchApi = async () => {
    setServerError(null);
    try {
      setLoading(true);
      const params = {};
      if (productCategory) params.category = productCategory;
      if (productId) params.id = productId;

      const response = await fetchProductListApi(params);
      setProduct(calculateDiscountedProductsPrice(response.data.data));
    } catch (err) {
      setServerError(err.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [productCategory, productId]);

  if (loading) return <LoadingSpinner text='Fetching Products' />
  if (serverError) return <p className={styles['main-error']}>{serverError}</p>

  return (
    <>
      <ProductList products={product} heading={"Similar Products"} />
    </>
  )
}

export default SimilarProductList