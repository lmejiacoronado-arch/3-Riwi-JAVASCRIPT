import { store } from "../state/store.js";
import { render } from "../render.js";
import { loginView, loginLogic } from "../views/login.js";
import { homeView } from "../views/home.js";


export function router() {
    let hash = window.location.hash;
    if (!hash || hash === '#' || hash === '#login') hash = '#/login';
    if (hash === '#home') hash = '#/home';

    const user = store.user;
    if (!user && hash !== '#/login') {
        window.location.hash = '#/login'; 
        return;
    }
    if (user && hash === '#/login') {
        window.location.hash = '#/home'; 
        return;
    }

    switch (hash) {

        case '#/login':
            render(loginView());
            loginLogic();
            break;

        case '#/home':
            render(homeView());
            break;

        default:
            render("<h2>404 - Not Found</h2>");
    }
}