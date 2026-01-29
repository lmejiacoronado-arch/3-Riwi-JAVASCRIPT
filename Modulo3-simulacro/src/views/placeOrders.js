export function placeOrdersView() {
    const card = JSON.parse(localStorage.getItem("carr")) || [];

    const loquesemuestra = card.map(item => `
        <div class="cart-item">
            <img src="https://via.placeholder.com/65" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-top">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="cart-item-detail">${item.category}</p>
                <div class="cart-item-controls">
                    <div class="cart-quantity-box">
                        <button class="qty-btn" data-id="${item.id}">-</button>
                        <span class="qty-number">1</span>
                        <button class="qty-btn" data-id="${item.id}">+</button>
                    </div>
                    <button class="cart-remove-link" data-id="${item.id}">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    return `
    <div class="cart-card">
        <div class="cart-header">
            <h2>Your Order <span class="cart-badge">${card.length}</span></h2>
            <button class="cart-clear-all">Clear all</button>
        </div>

        <div class="cart-scroll-area">
            ${loquesemuestra}
        </div>

        <div class="cart-summary">
            <div class="cart-summary-line">
                <span>Subtotal</span>
                <span>$12.98</span>
            </div>
            <div class="cart-summary-line">
                <span>Tax (8%)</span>
                <span>$1.04</span>
            </div>
            <div class="cart-total-line">
                <span>Total</span>
                <span class="cart-total-amount">$14.02</span>
            </div>
        </div>

        <button class="cart-confirm-btn">Confirm Order &rarr;</button>
    </div>
    `;
}

export function placeOrdersLogic() {
    const card = document.querySelector(".card")

}
// export function placeOrdersView() {
//     const card = JSON.parse(localStorage.getItem("carr"))

//     const loquesemuestra = card.map(item => `
//             <div class="order-items">
//                 <div class="item bg-red-200 ">
//                     <img src="https://via.placeholder.com/60" alt="${item.name}" class="item-img">
//                         <div class="item-info">
//                             <div class="item-top">
//                                 <p class="item-name" ${item.name}></p>
//                                 <span class="item-price" ${item.price}></span>
//                                 <span class="item-category ${item.category}></span>
//                             </div>
//                             <div class="item-controls">
//                                 <div class="quantity flex w-20">
//                                     <button>-</button>
//                                     <span>1</span>
//                                     <button>+</button>
//                                 </div>
//                                 <button class="remove-btn">Remove</button>
//                             </div>
//                         </div>
//                 </div>

//             </div>

//         `
//     ).join('');
//     return `
//        <div class="card p-5">  
//             <div class="header">
//                 <h2>Your Order <span class="badge">2</span></h2>
//                 <button class="clear-btn">Clear all</button>
//             </div>

//         ${loquesemuestra}
//         </div>
//             <div class="summary">
//                 <div class="summary-line">
//                     <span>Subtotal</span>
//                     <span>$12.98</span>
//                 </div>
//                 <div class="summary-line">
//                     <span>Tax (8%)</span>
//                     <span>$1.04</span>
//                 </div>
//                 <div class="total-line">
//                     <span>Total</span>
//                     <span class="total-amount">$14.02</span>
//                 </div>
//             </div>

//             <button class="confirm-btn">Confirm Order &rarr;</button>
//         </div>
//             `
// }

