import { projectService } from "../services/services.js";
import { store } from "../state/store.js";

export function loginView() {
    return `
    <div>
       
        <form id="loginForm">
            <h2>Logueate mi Loc@</h2>
            <label for="login-email">Email</label>
            <input id="login-email" type="email" name="email" placeholder="Your email" required>

            <label for="login-pass">Contraseña</label>
            <input id="login-pass" type="password" name="password" placeholder="Your password" required>

            

            <button type="submit">Entrar</button>

            <p>¿No tienes cuenta? <a href="#/register" id="go-register">Regístrate aquí</a></p>
        </form>
    </div>
    `
}

export function loginLogic() {
    const loginForm = document.querySelector("#loginForm");

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = new FormData(loginForm);
            const username = data.get('email')
            const password = data.get('password')

            const userFound = await projectService.login(username, password)

            if (userFound) {
                store.setLogin(userFound)
                window.location.hash = '#/menu';
            } else {
                alert("Incorrect username or password");
                loginForm.reset();
            }
        });
    }
};