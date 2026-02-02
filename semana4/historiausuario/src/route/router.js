import { loginView,   } from "../views/login.js";
import { registerView } from "../views/register.js";
import { store, cerrarSesion } from "../store/store.js";
import { homeView } from "../views/home.js";
import { navbar } from "../components/navBar.js";
import { notFoundView } from "../views/notFound.js";
import { administrarView } from "../views/administrar.js";
import { app } from "../../app.js";
import { productosView } from "../views/productos.js";

export function router(){

    //------------------------------------------------
    const hash = location.hash;
    console.log("Router called, hash:", hash);
    app.innerHTML = "";

    if (!store.user_actual && hash !== "#/register") {location.hash = "#/login"}
    
    //-------------------------------

    switch (hash) {
        case "#/login":
            console.log("en login")
            app.appendChild(loginView());
            
            break;
        case "#/register":
            console.log("en registro")
            app.appendChild(registerView());
            
            break;

        case "#/home":
            console.log("en home");
            app.append(navbar(),homeView())
            break;

        case "#/administrar":
            console.log("en administrar");
            app.append(navbar(), administrarView());
            break;

        case "#/productos":
            console.log("en producto");
            app.append(navbar(), productosView());
            break;


        case "#/logout":
            console.log("cerrando sesion");
            cerrarSesion();
            location.hash = ""
            break;
            
        default:
            console.log("vista no encontrada");
            app.append(navbar(), notFoundView())
            break;
    }
}