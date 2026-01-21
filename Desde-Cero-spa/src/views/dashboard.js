import { store } from "../state/store.js"

export function dashboardView(){
    return `
    <h1>Dashboard</h1>
    <p>Bienvenido al panel de control ${store.user} </p>    
    `
}