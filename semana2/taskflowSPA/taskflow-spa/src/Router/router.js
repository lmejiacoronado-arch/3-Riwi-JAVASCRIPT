import navBar  from "../components/navbar.js";
import {home}   from "../views/home.js";
import {singIn, initLogIn, homeUsuario} from "../views/login.js";
import { newTask, initNewTask } from "../views/newTask.js";
import {listTask, checkbox }from "../views/tasks.js";
import { estado } from "../state/store.js";

const main = document.querySelector("#main");

function render(views) {
    const nav = homeUsuario !== "" ? navBar() : "";  
    main.innerHTML = `
        ${nav}
        <section>
            ${views}
        </section>
    `;
}

function router() {
    const route = location.hash;
    if (route !== "#login" && estado.homeUsuario === ""){
        location.hash = "#login";
        return;
    }
    switch (route) {
        case '#login':
            render(singIn());
            initLogIn();
            break;
        case '#home':
            render(home());
            break;
        case '#tasks':
            render(listTask());
            checkbox();
            break;
        case '#newTask':
            render(newTask());
            initNewTask();
            break;
        default:
            location.hash = "#login";
            break
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);