export function productosCard(producto){

    const card = document.createElement("div");
    card.innerHTML = 
    
    `
        <h2> producto: ${producto.nombre} </h2>
        <h2> precio: ${producto.precio} </h2>
        <h2> cantidad: ${producto.cantidad} </h2>
    `
    return card;

}