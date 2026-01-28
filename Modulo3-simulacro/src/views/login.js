import { projectService } from "../services/services.js";

export function loginView() {
    return `
    <div>
       
        <form id="loginForm">
            <h2>Logueate mi Loc@</h2>
            <label for="login-email">Email</label>
            <input id="login-email" type="email" name="email" placeholder="Your email" required>

            <label for="login-pass">Contraseña</label>
            <input id="login-pass" type="password" name="password" placeholder="Your password" required>

            <label>Select Role</label>
            <select name="role" required>
                <option value="" disabled selected>Select a role</option>
                <option value="admin">Administrator</option>
                <option value="client">Client</option>
            </select>

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
            const role = data.get('role')

            const userFound = await projectService.login(username, password, role)

            if (userFound) {
                store.setLogin(userFound)
                window.location.hash = '#/home';
            } else {
                alert("Incorrect username or password");
                loginForm.reset();
            }
        });
    }
};