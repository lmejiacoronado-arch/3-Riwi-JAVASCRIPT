// Esta función genera el HTML de la cuadrícula
export function menuView(products) {
    const cards = products.map(item => `
        <article class="card">
            <div class="card-image">
                <span class="badge">${item.category.toUpperCase()}</span>
                <img src="https://via.placeholder.com/300" alt="${item.name}">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h2 class="card-title">${item.name}</h2>
                    <span class="card-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="card-description">Delicious ${item.category} option.</p>
                <button class="btn-add" data-id="${item.id}">Add to order</button>
            </div>
        </article>
    `).join('');

    return `
        <div class="menu-container">
            <h1>Our Menu</h1>
            <div class="product-grid">
                ${cards}
            </div>
        </div>
    `;
}