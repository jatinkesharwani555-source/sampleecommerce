export const calculateSubTotal = (cartItems) => {
  return cartItems.reduce(
    (acc, item) => acc + item.productId.productPriceAfterDiscount * item.quantity,
    0
  );
};


export const calculateDiscountedPrice = (price, discount) => {
  return Math.round(price - (price * discount) / 100);
};


export const calculateDiscountedProductsPrice = (products = []) => {
  return products.map((product) => {
    const originalPrice = product.productPrice;
    const discount = product.productDiscount;

    const discountedPrice = Math.round(
      originalPrice - (originalPrice * discount) / 100
    );

    return {
      ...product,
      discountedPrice,
    };
  });
};
