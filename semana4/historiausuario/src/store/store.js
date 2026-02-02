//------------------------------------
//Estado global
export const store = {
    users : [],
    productos : [],
    user_actual : null
}

//-----------------------------------
export class Producto{
    constructor(nombre,precio,cantidad){
        this.nombre = nombre,
        this.precio = precio,
        this.cantidad = cantidad
    }
}

export class Usuario{
    constructor(nombre,email,password){
        this.nombre = nombre,
        this.email = email,
        this.password = password,
        this.rol = "visitante",
        this.compras = []
    }
}

//----------------------------------
// Consumo de API JSON-Server

const API_URL = "http://localhost:3000";

//usuarios


export async function getUsuarios(){
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {throw new Error("no fue posible cargar los usuarios")}
    const users = await response.json();

    return users}

export async function createUsuario(user) {

    const response = await fetch(`${API_URL}/users`, {
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(user)
    })

    if (!response.ok) {throw new Error("no fue posible crear nuevo usuario")}

    const nuevoUser = await response.json();
    store.users.push(nuevoUser)}

//--------------------------------------------

//productos


export async function getProductos(){
    const response = await fetch(`${API_URL}/productos`);

    if (!response.ok) {throw new Error("no fue posible obtener los productos")}
    const productos = await response.json();

    return productos}

export async function createProducto(producto) {

    const response = await fetch(`${API_URL}/productos`, {
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(producto)
    })

    if (!response.ok) {throw new Error("no fue posible crear el producto")}

    const nuevoProducto = await response.json();
    store.productos.push(nuevoProducto)}

export async function updateProducto(id,productoModificado) {

    const response = await fetch(`${API_URL}/productos/${id}`, {
        method : "PUT",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(productoModificado)
    })

    if (!response.ok) {throw new Error("no fue posible actualizar el producto")}

    const nuevoProducto = await response.json();

    const index = store.productos.findIndex(producto => producto.id == id);
    store.productos[index] = nuevoProducto;}


export async function deleteProducto(id) {
    const response = await fetch(`${API_URL}/productos/${id}`, {
        method : "DELETE"
    })
    
    if (!response.ok) {throw new Error("no fue posible eliminar el producto")}

    eliminarStoreProducto(id)
    
}

function eliminarStoreProducto(id){
    store.productos = store.productos.filter( producto => producto.id != id)}

//-------------------------------------------------
// control de sesion y login

export function iniciarSesion(email){

    const user = findUser(email);
    store.user_actual = user,
    localStorage.setItem("user_actual", JSON.stringify(store.user_actual));
    console.log(user)

}

export function cerrarSesion(){

    store.user_actual = null;
    localStorage.removeItem("user_actual")
}

export function findUser(email){
    for (const user of store.users)
    {
        if (user.email === email) {return  user};
    }
    return null
}

//-------------------------------------------------
// localstorage

function cargarLocalStorage(){
    const user = JSON.parse(localStorage.getItem("user_actual"));
    store.user_actual = user;
}

//------------------------------------------------

export async function iniciarDatos() {

    cargarLocalStorage();
    store.users = await getUsuarios();
    store.productos = await getProductos();
    
}
//-------------------------------------------------