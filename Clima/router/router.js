import { render } from "../render.js";
import { LoginView, LoginLogic } from "../views/login.js";
import { homeView } from "../views/home.js";


export function router() {
    const hash = location.hash || '#login';

    switch (hash) {
        case '#login':
            render(LoginView());
            LoginLogic();
            break;

        case '#home':
            render(homeView);
            break;
    }
}