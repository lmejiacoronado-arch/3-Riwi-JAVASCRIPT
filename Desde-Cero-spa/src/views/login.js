import { projectService } from "../services/projectService.js";
import { store } from "../state/store.js";

export function loginView() {
    return `
        <form id="loginForm">
            <legend>Login</legend>
            <label for="login-user">User</label>
            <input id="login-user" type="text" name="username" placeholder="Your user" required>

            <label for="login-pass">Contraseña</label>
            <input id="login-pass" type="password" name="password" placeholder="Your password" required>

            <button type="submit">Entrar</button>
            
        </form>
    `;
}
export function loginLogic() {
    const loginForm = document.querySelector("#loginForm");

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = new FormData(loginForm);
            const username = data.get('username')
            const password = data.get('password')

            const userFound = await projectService.login(username, password)

            if (userFound) {
                store.setLogin(userFound)
                window.location.hash = '#projects';
            } else {
                alert("Incorrect username or password");
                loginForm.reset();
            }
        });
    }
};