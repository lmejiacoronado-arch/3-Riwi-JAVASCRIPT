import { store } from "../store/store.js";
export function navbar(){
    const navbar = document.createElement("nav");
    
    if (store.user_actual)
    {
        if (store.user_actual.rol == "admin")
    {

    navbar.innerHTML =
    `
        <ul>
            <li> <a href="#/home"> Inicio </li>
            <li> <a href="#/administrar">Administrar Productos </li>
            <li> <a href="#/productos"> productos </li>
            <li> <a href="#/logout"> Cerrar sesion </li>
        </ul>
    `
    }

    if (store.user_actual.rol == "visitante")
    {

    navbar.innerHTML =
    `
        <ul>
            <li> <a href="#/home"> Inicio </li>
            <li> <a href="#/carrito"> carrito </li>
            <li> <a href="#/productos"> productos </li>
            <li> <a href="#/logout"> Cerrar sesion </li>
        </ul>

    `
    }

    }

    return navbar
}