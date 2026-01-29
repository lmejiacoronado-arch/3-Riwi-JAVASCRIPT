import { projectService } from "../../services/services.js";

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

export function menuLogic() {
    const btnAdd = document.querySelector(".menu-container")
    const pedido = []
    btnAdd.addEventListener('click', async (e) => {
        if(e.target.tagName == 'BUTTON') {
        const objeto = await projectService.getMenuId(e.target.dataset.id);
        const encontrar = pedido.some((select)=> select.id == objeto.id);

        if (!encontrar) {
            pedido.push(objeto)
        }
        
    }
    localStorage.setItem("carr", JSON.stringify(pedido))
    })   
}