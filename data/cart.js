export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
];

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


export function removeQuantity(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })
  cart = newCart;
}