export const productValidation = (product, setError, files = []) => {
  const { miniDesc = "", description = "", price, discount,discountedPrice, category, sellerType } = product;
  let newErrors = {};

  if (!miniDesc.trim()) newErrors.productMiniDesc = "Product Name Is Required";
  if (!description.trim()) newErrors.productDesc = "Product Description Is Required";
  if (!price || Number(price) <= 0) newErrors.productPrice = "Valid Product Price Is Required";
  if (discount === "" || Number(discount) < 0) newErrors.productDiscount = "Product Discount Is Required";
  if (discountedPrice > Number(price)) newErrors.discountedPrice = "Discounted Price cannot exceed original Price";
  if (discountedPrice < 0) newErrors.discountedPrice = "Discounted Price cannot be negative";
  if (!category) newErrors.productCategory = "Product Category Is Required";
  if (!sellerType) newErrors.sellerType = "Seller Type Option Is Required";
  if (files.length === 0) newErrors.productImage = "Atleat One Product Image Is Required";

  setError(newErrors);
  return Object.keys(newErrors).length === 0;
};