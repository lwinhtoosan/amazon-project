export let cart = JSON.parse(localStorage.getItem('cart')) || [];


function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart))
}

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
    saveToStorage();
}


export function removeQuantity(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })
  cart = newCart;
  saveToStorage();
}