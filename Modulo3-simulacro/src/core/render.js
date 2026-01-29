import { footerView } from "../components/footer.js"
import { navBarViewAdmin } from "../components/navBarAdmin.js";
import { navBarViewClient } from "../components/navBarClients.js";
import { navBarLogicAdmin } from "../components/navBarAdmin.js";
import { navBarLogicClient } from "../components/navBarClients.js";

const main = document.querySelector("#main")

export function render(view) { 
    const hash = window.location.hash || '#/login';
    main.innerHTML = "";

    
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user);
    
    

    if (hash === '#/login' || hash == '#/register') {
        main.innerHTML = `<section>${view}</section>`;
    } else {
        main.innerHTML = `
        ${user.role == "Client" ? navBarViewClient() : navBarViewAdmin()}
        <section>${view}</section>
        ${footerView()}`;
        user.role == "Client" ? navBarLogicClient() : navBarLogicAdmin()
    }
}