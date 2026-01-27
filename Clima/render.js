import { navBarView, navBarLogic } from "./component/navbar.js"
import { footerView } from "./component/footer.js"

const main = document.querySelector("#main")

export function render(view) { 
    const hash = window.location.hash || '#/login';
    main.innerHTML = "";

    if (hash === '#/login' || hash === '#login') {
        main.innerHTML = `<section>${view}</section>`;
    } else {
        main.innerHTML = `${navBarView()}<section>${view}</section>${footerView()}`;
        navBarLogic();
    }
}