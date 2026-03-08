export const productEditValidation = (product, setValidationError, files = []) => {
  const { productMiniDesc = "", productDesc = "", productPrice, productDiscount, productCategory, sellerType } = product;
  let newErrors = {};

  if (!productMiniDesc.trim()) newErrors.productMiniDesc = "Product Name Is Required";
  if (!productDesc.trim()) newErrors.productDesc = "Product Description Is Required";
  if (!productPrice || Number(productPrice) <= 0) newErrors.productPrice = "Valid Product Price Is Required";
  if (productDiscount === "" || Number(productDiscount) < 0) newErrors.productDiscount = "Product Discount Is Required";
  if (!productCategory) newErrors.productCategory = "Product Category Is Required";
  if (!sellerType) newErrors.sellerType = "Seller Type Option Is Required";

  setValidationError(newErrors);
  return Object.keys(newErrors).length === 0;
};