import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './CreateProduct.module.css';
import { submitProductForm } from '../../api/productForm.api';
import { productValidation } from '../../utils/productValidation.utils';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    miniDesc: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    sellerType: "Normal"
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // Calculate Discounted Price 
  const discountedPrice =
    product.price && product.discount
      ? (Number(product.price) - (Number(product.price) * Number(product.discount)) / 100).toFixed(2)
      : "";

  // HandleSubmit Function 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    if (!productValidation(product, setError, files)) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("miniDesc", product.miniDesc);
      formData.append("description", product.description);
      formData.append("price", Number(product.price));
      formData.append("discount", Number(product.discount));
      formData.append("category", product.category);
      formData.append("sellerType", product.sellerType);
      files.forEach(file => {
        formData.append("productImage", file);
      });

      const response = await submitProductForm(formData);
      if (!response.data.success) {
        setServerError(response?.data?.message || "Something Went Wrong");
        return;
      }
      navigate("/");

    } catch (err) {
      setServerError(err.response?.data?.message || "Something Went Wrongggg");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles['create-product-main-cnt']}>
        <div className={styles['create-product-container']}>
          <h4 className={styles['add-product-heading']}>Please Add Product</h4>
          {serverError && <p className={styles['main-error']}>{serverError}</p>}
          <form className={styles['product-form']} onSubmit={handleSubmit} encType='multipart/form-data'>

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productMiniDesc">Product Mini Desc : </label>
              <input type="text" name='miniDesc' placeholder='Enter Product Mini Desc Here...' className={`${styles['form-input']} ${styles['form-productMiniDesc']}`} value={product.miniDesc} onChange={handleChange} />
            </div>
            {error.productMiniDesc && <p className={styles['error']}>{error.productMiniDesc}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productDesc">Description : </label>
              <input type="text" name='description' placeholder='Enter Product Description Here...' className={`${styles['form-input']} ${styles['form-productDesc']}`} value={product.description} onChange={handleChange} />
            </div>
            {error.productDesc && <p className={styles['error']}>{error.productDesc}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productPrice">Price : </label>
              <input type="number" name='price' placeholder='Enter Product Price Here...' className={`${styles['form-input']} ${styles['form-productPrice']}`} value={product.price} onChange={handleChange} />
            </div>
            {error.productPrice && <p className={styles['error']}>{error.productPrice}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productDiscount">Discount : </label>
              <input type="number" name='discount' placeholder='Enter Discount Here...' className={`${styles['form-input']} ${styles['form-productDiscount']}`} value={product.discount} onChange={handleChange} />
            </div>
            {error.productDiscount && <p className={styles['error']}>{error.productDiscount}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="discountedPrice">Discounted Price :</label>
              <input type="number" name="discountedPrice" className={`${styles['form-input']}`} value={discountedPrice} readOnly placeholder="Auto Calculated" />
            </div>
            {error.discountedPrice && <p className={styles['error']}>{error.discountedPrice}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productCategory">Category :</label>

              <select id="productCategory" name="category" className={`${styles['form-input']} ${styles['form-productCategory']}`} value={product.category} onChange={handleChange} required>
                <option value="">-- Select Category --</option>
                <option value="Category1">Category1</option>
                <option value="Category2">Category2</option>
                <option value="Category3">Category3</option>
                <option value="Category4">Category4</option>
              </select>
            </div>
            {error.productCategory && <p className={styles['error']}>{error.productCategory}</p>}

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
            {error.sellerType && <p className={styles['error']}>{error.sellerType}</p>}

            <div className={styles['input-wrapper']}>
              <label className={styles['label']} htmlFor="productImage">Image: </label>
              <input type="file" name='productImage' multiple accept='image/*' onChange={handleFileChange} />
            </div>
            {error.productImage && <p className={styles['error']}>{error.productImage}</p>}
            <button className={styles['form-submit-btn']} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateProduct