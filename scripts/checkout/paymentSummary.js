import { getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryId } from "../../data/deliveryOption.js";
import { cart, calculateCartQuantity } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
export function renderPaymentSummary() {
    let productPriceCent = 0;
    let deliveryPriceCent = 0;
    const cartQuantity = calculateCartQuantity();
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const deliveryOptionId = cartItem.deliveryOptionId;
        const product = getProduct(productId)
        const deliveryOption = getDeliveryId(deliveryOptionId)

        productPriceCent += product.priceCents*cartItem.quantity
        deliveryPriceCent+= deliveryOption.priceCents
})
        const totalBeforeTaxCent = productPriceCent+deliveryPriceCent;
        const taxCent            = totalBeforeTaxCent*0.1;
        const totalCent          = totalBeforeTaxCent+taxCent;

        const paymentSummaryHTML = 
        `
        <div class="payment-summary-title">Payment Summery</div>
          <div class="payment-summary-row">
            <div class="product-label">items (${cartQuantity}):</div>
            <div class="product-cost">$${formatCurrency(productPriceCent)}</div>
          </div>
          <div class="payment-summary-row">
            <div class="product-label">Shipping & handling:</div>
            <div class="product-cost">$${formatCurrency(deliveryPriceCent)}</div>
          </div>
          <div class="payment-summary-row ">
            <div class="product-label">Total before tax:</div>
            <div class="product-cost sub-total-row">$${formatCurrency(totalBeforeTaxCent)}</div>
          </div>
          <div class="payment-summary-row">
            <div class="product-label">Estimated tax(10 %):</div>
            <div class="product-cost">$${formatCurrency(taxCent)}</div>
          </div>
          <div class="payment-summary-row total-row-div">
            <div class="order-total-label">Order total:</div>
            <div class="total-cost">$${formatCurrency(totalCent)}</div>
          </div>
          <button class="place-your-order-btn button-primary">Place your order</button>`

     document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;
}