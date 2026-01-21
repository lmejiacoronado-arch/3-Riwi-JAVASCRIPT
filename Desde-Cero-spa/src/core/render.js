import {navBarLogic, navBarView} from '../components/navBar.js'

const app = document.querySelector("#app");

export function render(view){

    app.innerHTML = ""

    app.innerHTML = `
    ${navBarView()}
    <section>
        ${view}
    </section>
    `;
    navBarLogic();
}
