import { Producto, createProducto } from "../store/store.js";
export function administrarView()
{
    const formAdministrar = document.createElement("form");
    formAdministrar.classList.add("formAdministrar");

    formAdministrar.innerHTML =
    
    `
        
    <label for="">
        nombre: <input required id="pnombre" type="text">
    </label>


    <label for="">
        precio: <input id="pprecio" required type="number">
    </label>



    <label for="">
        cantidad: <input id="pcantidad" required type="number">
    </label>

    <button >agregar producto</button>


    `
    const pname = formAdministrar.querySelector("#pnombre");
    const pprecio = formAdministrar.querySelector("#pprecio");
    const pcantidad = formAdministrar.querySelector("#pcantidad");

    formAdministrar.addEventListener("submit", async (e)=>{
        e.preventDefault();

        try {
            await agregarNuevoProducto(pname.value,pprecio.value,pcantidad.value)
            formAdministrar.reset();
            alert("Producto agregado correctamente");
        } catch (error) {
            console.error(error);
            alert("Error al agregar el producto");
        }
    })
    return formAdministrar
}

async function agregarNuevoProducto(nombre, precio, cantidad){
    console.log("Before: ", location.hash);
    const newProducto = new Producto(nombre,precio,cantidad);
    await createProducto(newProducto);
    console.log("After: ", location.hash);
}