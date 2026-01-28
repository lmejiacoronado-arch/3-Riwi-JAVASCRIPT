import { store } from "../state/store.js";
import { render } from "../core/render.js";
import { loginView, loginLogic } from "../views/login.js"
import { registerLogic, registerView } from "../views/register.js";
import { projectService } from "../services/services.js";

export function router() {
    let hash = window.location.hash;
    
    const user = store.user;
    if (!user && (hash !== '#/login' && hash !== '#/register')) {
        window.location.hash = '#/login'; 
        return;
    }
    if (user && hash === '#/login') {
        window.location.hash = '#/menu'; 
        return;
    }

    switch (hash) {

        case '#/login':
            render(loginView());
            loginLogic();
            break;

        case '#/register':
            render(registerView())
            registerLogic()
            break;

        case '#/menu':
            render(registerView())
            registerLogic()
            break;

        default:
            render(loginView());
            loginLogic();
            break;

        
    }
}