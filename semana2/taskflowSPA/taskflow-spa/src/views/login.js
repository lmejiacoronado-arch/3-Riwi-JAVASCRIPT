import { setUsuario } from "../state/store.js";

function singIn() {
    return `
    <form id="milogin">
        <legend>Log-In</legend>
        <input type="text" name="usuario" placeholder="Ingresa tu usuario">
        <input type="password" name="contraseña" placeholder="Ingresa tu contraseña">
        <button type="submit">Validar</button>
    </form>`
}

function initLogIn() {
    const milogin = document.querySelector("#milogin");
    if (milogin) {
        milogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const form = new FormData(milogin);
            const usuario = form.get('usuario');
            const contraseña = form.get('contraseña');
            usuario === "luis" && contraseña === "123" ? (setUsuario(usuario), window.location.hash = "#home") : alert ("Acceso denegado!");
            
            milogin.reset();
        });
    }
}


export { singIn, initLogIn }



