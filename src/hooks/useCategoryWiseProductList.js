import { useEffect, useState } from 'react'
import { calculateDiscountedProductsPrice } from '../utils/priceCalculator';
import { fetchCategoryWiseProductsApi } from '../api/categoryWiseProducts.api';

const useCategoryWiseProductList = (category) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState();

  const fetchCategoryWiseProducts = async () => {
    setServerError(null);
    if (!category) return;
    try {
      setLoading(true);
      const response = await fetchCategoryWiseProductsApi(category);
      setProduct(calculateDiscountedProductsPrice(response.data.data.products));
    } catch (err) {
      setServerError(err.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategoryWiseProducts();
  }, [category]);

  return {
    product, loading, serverError
  }
}

export default useCategoryWiseProductList
