import { loginView, loginLogic } from '../views/login.js';
import { store } from '../state/store.js';

export function router() {
    const hash = window.location.hash;
    const app = document.querySelector("#app");

    if (hash === "#projects" && !store.user) {
        return ""
    }

}


// export function router() {
//     const hash = window.location.hash;
//     const root = document.querySelector('#root');

//     // Si no hay hash o es #/login, mostramos el login
//     if (hash === '#/login' || hash === '') {
//         root.innerHTML = loginView();
//         loginLogic();
//     } 
//     // Si intenta ir a proyectos pero no hemos creado la vista...
//     else if (hash === '#/projects') {
//         root.innerHTML = "<h1>Próximamente: Lista de Proyectos</h1>";
//         // Aquí es donde iría la lógica cuando la creemos
//     }
// }