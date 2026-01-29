import { store } from "../state/store.js";
import { render } from "../core/render.js";
import { loginView, loginLogic } from "../views/login.js"
import { registerView, registerLogic, } from "../views/register.js";
import { menuLogic, menuView } from "../views/client.js/menu.js";
import { projectService } from "../services/services.js";
import { placeOrdersLogic, placeOrdersView } from "../views/placeOrders.js";

export async function router() {
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
            const products = await projectService.getMenu()
            if (user.role == "Client") {
                render(menuView(products));
                menuLogic();
                break;
            }

        case '#/placeOrders':
            if (user.role == "Client") {
                render(placeOrdersView());
                placeOrdersLogic();
                break;
            }

        case '#/yourOrders':
            if (user.role == "Client") {
                render('<p>test</p>');
                break;
            }

        case '#/profile':
            if (user.role == "Client") {
                render('<p>test</p>');
                break;
            }

        default:
            render(loginView());
            loginLogic();
            break;
    }
}