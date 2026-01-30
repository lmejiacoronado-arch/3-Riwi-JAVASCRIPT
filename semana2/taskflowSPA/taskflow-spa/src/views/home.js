import { estado } from "../views/login.js";

export function home() {
    return `
    <h1>HOME</h1>
    <p>Hola ${estado.homeUsuario}</p>
    <button><a href="#tasks">tasks</a></button>
    `;
}
