export const cart = [];

export function addToCart(productId) {
  let matchingItem;
  let selectedQty = document.querySelector(
      `.js-product-quantity-selector-${productId}`
    ).value;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += Number(selectedQty);
    } else {
      cart.push({
        productId,
        quantity: Number(selectedQty),
      });
    }
}