export const calculateDiscountedPrice = (price, discount) => {
  if (!price || price <= 0) return 0;
  if (!discount || discount < 0) return Number(price);

  const discounted = Number(price) - (Number(price) * Number(discount)) / 100;
  return Number(discounted.toFixed(2)); // Round off to 2 decimal points
};