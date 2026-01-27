import { store } from "../state/store.js";

export function homeView() {
    return `
    <h1>Dashboard</h1>
    <p>Bienvenido al panel de control, <strong>${store.user.email}</strong></p> 
    `;
}