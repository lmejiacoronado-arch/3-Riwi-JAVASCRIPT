import { navBarView, navBarLogic } from "../components/navBar.js"
import { footerView } from "../components/footer.js"

const main = document.querySelector("#main")

export function render(view) { 
    const hash = window.location.hash || '#/login';
    main.innerHTML = "";

    if (hash === '#/login' || hash == '#/register') {
        main.innerHTML = `<section>${view}</section>`;
    } else {
        main.innerHTML = `
        ${navBarView()}
        <section>${view}</section>
        ${footerView()}`;
        navBarLogic();
    }
}