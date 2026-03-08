import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styles from './CreateProduct.module.css';
import { productEditValidation } from '../../utils/productEdit.utils';
import LoadingSpinner from '../LoadingSpinner';
import {updateProductApi} from '../../api/updateProduct.api';
import useProduct from '../../hooks/useProduct';

const EditProduct = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [files, setFiles] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [validationError, setValidationError] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  // HandleChange Function 
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // HandleChange Function For File 
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  }

  // Fetch Product 
const {product, loading, error, setProduct} = useProduct(id);

  // HandleSubmit Function 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    if (!productEditValidation(product, setValidationError, files)) return;
    try {
      setSubmitLoading(true);
      const formData = new FormData();
      formData.append("miniDesc", product.productMiniDesc);
      formData.append("description", product.productDesc);
      formData.append("price", Number(product.productPrice));
      formData.append("discount", Number(product.productDiscount));
      formData.append("category", product.productCategory);
      formData.append("sellerType", product.sellerType);
      files.forEach(file => {
        formData.append("productImage", file);
      });

      const response = await updateProductApi(id, formData);

      if (!response.data.success) {
        setServerError(response.data.message || "Something Went Wrong");
        return;
      }
      navigate("/admin/manage-products");

    } catch (err) {
      setServerError(err.response?.data?.message || "Something Went Wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

if(loading) return <LoadingSpinner />;

  return (
    <>
      <div className={styles['create-product-main-cnt']}>
        <div className={styles['create-product-container']}>
          <h4 className={styles['add-product-heading']}>Please Edit Product</h4>
          {serverError && <p className={styles['main-error']}>{serverError}</p>}
          <form className={styles['product-form']} onSubmit={handleSubmit} encType='multipart/form-data'>

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productMiniDesc">Product Mini Desc : </label>
              <input type="text" name='productMiniDesc' placeholder='Enter Product Mini Desc Here...' className={`${styles['form-input']} ${styles['form-productMiniDesc']}`} value={product.productMiniDesc} onChange={handleChange} />
            </div>
            {validationError.productMiniDesc && <p className={styles['error']}>{validationError.productMiniDesc}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productDesc">Description : </label>
              <input type="text" name='productDesc' placeholder='Enter Product Description Here...' className={`${styles['form-input']} ${styles['form-productDesc']}`} value={product.productDesc} onChange={handleChange} />
            </div>
            {validationError.productDesc && <p className={styles['error']}>{validationError.productDesc}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productPrice">Price : </label>
              <input type="number" name='productPrice' placeholder='Enter Product Price Here...' className={`${styles['form-input']} ${styles['form-productPrice']}`} value={product.productPrice} onChange={handleChange} />
            </div>
            {validationError.productPrice && <p className={styles['error']}>{validationError.productPrice}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productDiscount">Discount : </label>
              <input type="number" name='productDiscount' placeholder='Enter Discount Here...' className={`${styles['form-input']} ${styles['form-productDiscount']}`} value={product.productDiscount} onChange={handleChange} />
            </div>
            {validationError.productDiscount && <p className={styles['error']}>{validationError.productDiscount}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productCategory">Category :</label>

              <select id="productCategory" name="productCategory" className={`${styles['form-input']} ${styles['form-productCategory']}`} value={product.productCategory} onChange={handleChange} required>
                <option value="">-- Select Category --</option>
                <option value="Category1">Category1</option>
                <option value="Category2">Category2</option>
                <option value="Category3">Category3</option>
                <option value="Category4">Category4</option>
              </select>
            </div>
            {validationError.productCategory && <p className={styles['error']}>{validationError.productCategory}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']}>Seller Type :</label>

              <div className={styles['radio-group']}>
                <label className={styles['radio-label']}>
                  <input type="radio" name="sellerType" value="BestSeller" checked={product.sellerType === "BestSeller"} onChange={handleChange} />
                  BestSeller
                </label>

                <label className={styles['radio-label']}>
                  <input type="radio" name="sellerType" value="Normal" checked={product.sellerType === "Normal"} onChange={handleChange} />
                  Normal
                </label>
              </div>
            </div>
            {validationError.sellerType && <p className={styles['error']}>{validationError.sellerType}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productImage">Image: </label>
              <input type="file" name='productImage' multiple accept='image/*' onChange={handleFileChange} />
            </div>
            {validationError.productImage && <p className={styles['error']}>{validationError.productImage}</p>}
            <button className={styles['form-submit-btn']} disabled={submitLoading}>{submitLoading ? "Updating..." : "Update Product"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProduct