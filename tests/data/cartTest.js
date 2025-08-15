import { addToCart, cart, loadFromStorage, removeQuantity} from "../../data/cart.js";

describe('test suite: add to cart test', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    })
    it('exicting product', () => {
        // document.querySelector('.test-order-summary').innerHTML = 
        // `<select class='js-product-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'></select>`
        spyOn(localStorage, 'getItem').and.callFake( () => {
            return JSON.stringify(
                    [
                        {
                            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            quantity: 2,
                            deliveryOptionId: '1',
                        }
                    ]
                )
            });
            loadFromStorage();
            addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

            expect(cart.length).toEqual(1);
            expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart[0].quantity).toEqual(3);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
                [
                        {
                            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            quantity: 3,
                            deliveryOptionId: '1',
                        }
                    ]
            ));
        });

    it('add new product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
                    [
                        {
                            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            quantity: 1,
                            deliveryOptionId: '1',
                        }
                    ]
        ))
    })
})

describe('test suite: remove quantity', () => {
    let productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    let productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
                spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([
                            {
                                productId: productId1,
                                quantity: 2,
                                deliveryOptionId: '1',
                            },
                            {
                                productId: productId2,
                                quantity: 1,
                                deliveryOptionId: '2',
                            }
                        ])
                    });
                    loadFromStorage();
                });

            it('remove a product id',() => {
                    removeQuantity(productId1);
                    expect(cart.length).toEqual(1);
                    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
                    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
                                    [
                            {
                                productId: productId2,
                                quantity: 1,
                                deliveryOptionId: '2',
                            }
                        ]
                    ))
            });

            it('remove not existing productId', () => {
                    removeQuantity('does-not-exist');
                    expect(cart.length).toEqual(2);
                    expect(cart[0].productId).toEqual(productId1);
                    expect(cart[1].productId).toEqual(productId2);
                    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
                    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
                        [
                            {
                                productId: productId1,
                                quantity: 2,
                                deliveryOptionId: '1',
                            },
                            {
                                productId: productId2,
                                quantity: 1,
                                deliveryOptionId: '2',
                            }
                        ]
                    ));
            })
})