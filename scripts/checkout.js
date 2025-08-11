import { cart, removeQuantity, calculateCartQuantity,updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';
updateCartQuantity();
cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product
        }
        
    });
    cartSummaryHTML +=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">Delivery date: Tuesday, June 21</div>
                    <div class="cart-item-details-grid">
                    <img
                        class="product-image"
                        src="${matchingProduct.image}"
                    />
                    <div class="cart-item-details">
                        <div class="product-name">
                        ${matchingProduct.name}
                        </div>
                        <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                        <div class="product-quantity">
                        <span>Quantity : <span class="quantity-value js-quantity-value-${matchingProduct.id}">${cartItem.quantity}</span></span>
                        <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">Update</span>
                        <input class="quantity-input js-quantity-input data-product-id="${matchingProduct.id}">
                        <span class="save-link js-save-link  link-primary" data-product-id="${matchingProduct.id}">save</span>
                        <span class="delete-quantity-link link-secondary js-delete-link" data-product-id=${matchingProduct.id}>Delete</span>
                        </div>
                    </div>

                    <div class="delivery-options">
                    <div class="delivery-option-title">Choose a delivery option</div>
                    <div class="delivery-option">
                        <input
                        type="radio"
                        checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}"
                        />
                        <div>
                        <div class="delivery-option-date">Monday, August 18</div>
                        <div class="delivery-option-shipping">FREE Shipping</div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input
                        type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}"
                        />
                        <div>
                        <div class="delivery-option-date">Tuesday, August 12</div>
                        <div class="delivery-option-shipping">$4.99 Shipping</div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input
                        type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}"
                        />
                        <div>
                        <div class="delivery-option-date">Friday, August 8</div>
                        <div class="delivery-option-shipping">$8 Shipping</div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>`;
})
document.querySelector('.js-order-summary')
 .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId
        removeQuantity(productId)

        const container =  document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();
        updateCartQuantity();
    });
  })

//displaying total quantity at header
function updateCartQuantity() {
    const  cartQuantity = calculateCartQuantity();
        document.querySelector('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} items`
}

document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            let productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity')
            container.classList.add('save-link-update')
            container.classList.add('is-editing-quantity-value')
            container.classList.add('is-editing-update-quantity-link')
        })
    })

document.querySelectorAll('.js-save-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            const newQuantity = Number(container.querySelector('.js-quantity-input').value);
            updateQuantity(productId,newQuantity)

            
            container.classList.remove('save-link-update');
            container.classList.remove('is-editing-quantity');
            container.classList.remove('is-editing-update-quantity-link');
            container.classList.remove('is-editing-quantity-value')

            document.querySelector(`.js-quantity-value-${productId}`).innerHTML = newQuantity;
            updateCartQuantity();
        })
    })