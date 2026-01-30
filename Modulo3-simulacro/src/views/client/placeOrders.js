export function placeOrdersView() {
    const card = JSON.parse(localStorage.getItem("carr")) || [];

   

    const cardsita = card.map(item => `
        <div class="cart-item">
            <img src="${item.img}" class="cart-item-img">
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

     let count = card.length

    return `
    <div class="cart-card">
        <div class="cart-header">
            <h2>Your Order <span class="cart-badge">${count}</span></h2>
            <button class="cart-clear-all">Clear all</button>
        </div>

        <div class="cart-scroll-area">
            ${cardsita}
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

export async function placeOrdersLogic() {
    const card = document.querySelector(".cart-card")
    const pedidoActual = JSON.parse(localStorage.getItem("carr")) || []

    card.addEventListener('click', async (e) => {
        // Aumentar
        if (e.target.textContent == '+') {
            const contador = parseInt(e.target.previousElementSibling.textContent)
            e.target.previousElementSibling.textContent = contador + 1;
        }
        // Disminuir
        if (e.target.textContent == '-' && e.target.nextElementSibling.textContent > 1) {
            const contador = parseInt(e.target.nextElementSibling.textContent)
            e.target.nextElementSibling.textContent = contador - 1;
        }
        //Eliminar
        if (e.target.textContent.toLowerCase() == 'remove') {
            const encontrar = pedidoActual.findIndex((select)=> select.id == e.target.dataset.id);
            pedidoActual.splice(encontrar,1)
            
            
            
            localStorage.setItem("carr", JSON.stringify(pedidoActual))
            
        
            e.target.closest('.cart-item').remove()
            console.log(pedidoActual)
        }

    })
}