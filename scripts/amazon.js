import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productHTML = "";
updateCartQuantity();
products.forEach((product) => {
  productHTML += `
    <div class="product-container">
                    <div class="product-image-container">
                        <img class="product-image"
                             src='${product.image}'>
                    </div>
                    <div class="product-name limit-text-to-2-lines ">
                        ${product.name}
                    </div>
                    <div class="product-rate-container">
                        <img class="product-rating-star" src="${product.getStarUrl()}">
                        <div class="product-rating-point">${
                          product.rating.count
                        }</div>
                    </div>
                    <div class="price-text">"${product.getPriceCents()}"</div>
                    <div class="product-quantity-container">
                        <select class="js-product-quantity-selector-${
                          product.id
                        }">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div class="product-spacer"></div>
                    <div class="added-to-cart js-added-to-cart-${product.id}">
                        <img class="added-to-cart-img" src="/images/checkmark.png">
                        Added
                    </div>
                    <button class="add-to-cart-btn button-primary js-add-to-cart-btn"
                    data-product-id="${product.id}">Add to Cart</button>
                </div>`;
});

document.querySelector(".product-grid").innerHTML = productHTML;
const addedMessageTimeout= {};

function updateCartQuantity() {
  const cartQuantity =calculateCartQuantity();
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

    addToCart(productId);
    updateCartQuantity()

    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
    addedMessage.classList.add('added-appear')
    
    const previousTimeoutId = addedMessageTimeout[productId];
    if (previousTimeoutId) {
        clearTimeout(previousTimeoutId)
    }
    const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-appear');
        },2000)
    addedMessageTimeout[productId] = timeoutId;
  });
});
