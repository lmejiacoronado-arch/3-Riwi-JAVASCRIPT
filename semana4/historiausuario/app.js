import { iniciarDatos, store } from "./src/store/store.js";
import { loginView } from "./src/views/login.js";
import { router } from "./src/router/router.js";


await iniciarDatos();
console.log(store)


export const app = document.getElementById("app");


app.appendChild(loginView());
console.log("hola")
location.hash = "#/home"
router();
window.addEventListener("hashchange", router);
window.addEventListener('beforeunload', () => {
    console.log('PAGE RELOADING!');
    console.trace();
});

