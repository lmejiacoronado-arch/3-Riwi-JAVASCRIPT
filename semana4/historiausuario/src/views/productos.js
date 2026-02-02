import { store } from "../store/store.js";
import { productosCard } from "../components/productosCard.js";
export function productosView(){

    const productosView = document.createElement("div");
    productosView.innerHTML =

    `
        <h1> soy la lista de productos </h1>


        <div id="productosContenedor"></div>
    
    `

    const divContenedor = productosView.querySelector("#productosContenedor");
    
    
    crearCartas(divContenedor)
    return productosView


}

function crearCartas(divi){
    for (const producto of store.productos)
    {   console.log(producto)
        const card = productosCard(producto);
        console.log(card)
        divi.appendChild(card)
    }
}