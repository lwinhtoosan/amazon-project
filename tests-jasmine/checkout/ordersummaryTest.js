import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
    let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    let productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    //Use beforeEach to run the same code before each test running
    //this method allow to share code for not no duplicate
    beforeEach( () => {
        document.querySelector('.test-order-summary'). innerHTML = 
        `<div class="js-order-summary"></div>
         <div class="js-checkout-header"></div>
         <div class="js-payment-summary"></div>`

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: '1',
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: '2',
                }
            ])
        });
        loadFromStorage();
        renderOrderSummary();
    })

    //For the code that run at the end of each test
    afterEach( () => {
        document.querySelector('.test-order-summary'). innerHTML = "";
    })

    it('display the cart', () => {

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(
                document.querySelector(`.js-product-quantity-${productId1}`).innerText
              )
                .toContain('Quantity : 2');
        expect(
                document.querySelector(`.js-product-quantity-${productId2}`).innerText
              )
                .toContain('Quantity : 1');

    });

    it('remove from cart', () => {

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

    })
})