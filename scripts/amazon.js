
let productHTML = "";
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
                        <img class="product-rating-star" src="/images/ratings/rating-${product.rating.stars*10}.png">
                        <div class="product-rating-point">${product.rating.count}</div>
                    </div>
                    <div class="price-text">$${(product.priceCents / 100).toFixed(2)}</div>
                    <div class="product-quantity-container">
                        <select>
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
                    <div class="added-to-cart">
                        <img class="added-to-cart-img" src="/images/checkmark.png">
                        Added
                    </div>
                    <button class="add-to-cart-btn button-primary js-add-to-cart-btn"
                    data-product-id="${product.id}">Add to Cart</button>
                </div>`;
}
)
document.querySelector('.product-grid')
.innerHTML = productHTML;

document.querySelectorAll('.js-add-to-cart-btn')
.forEach((button) => {
    button.addEventListener('click', () => {
        let productId =  button.dataset.productId;

        let matchingItem;
        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        })
        if (matchingItem) {
            matchingItem.quantity +=1;
            
        } else {
            cart.push( {
            productId: productId,
            quantity: 1
        })
        }
        
        let cartQuantity = 0;
        cart.forEach((item) => {
          cartQuantity  +=item.quantity
        })
        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
        console.log(cart)
    })
})