import { navBarView } from "./component/navbar.js"
import { footerView } from "./component/footer.js"

const main = document.querySelector("#main")

export function render(view) {
    main.innerHTML = ""

    main.innerHTML = `
    ${navBarView()}
    <section>
        ${view}
    </section>
    `;
    navBarLogic()
}