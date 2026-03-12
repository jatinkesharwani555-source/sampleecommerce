import { useEffect, useState } from 'react'
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
      setProduct(response.data.data.products);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed To Load CategoryWise Products")
      setError(err.response?.data?.message || "Failed To Load CategoryWise Products");
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
