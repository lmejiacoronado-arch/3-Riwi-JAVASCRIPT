import { projectService } from "../services/service.js";
import { store } from "../state/store.js"

export function loginView() {
    return `
    <main class="auth-container">
        <section class="auth-card">

        <header class="auth-header">
            <h1>Observatorio Urbano y Ambiental</h1>
            <p>Acceso a plataforma GovTech</p>
        </header>

        <form class="formLogin">
            <div class="formEmail">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="admin@govtech.com" required />
            </div>

            <div class="form-group">
            <label for="password">Contraseña</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" class="btnPrimary">Iniciar sesión</button>
        </form>
        </section>
    </main>
    `
}

export function loginLogic() {
    const formLogin = document.querySelector(".formLogin")

    formLogin.addEventListener('submit' , async (e) => {
        e.preventDefault();

        const data = new FormData(formLogin)
        const email = data.get('email')
        const password = data.get('password')

        const userFound = await projectService.getLogin(email, password)

        
        if (userFound) {
            store.setLogin(userFound)
            window.location.hash = '#/home';
        } else {
            alert("Incorrect username or password");
            formLogin.reset();
        }
    });
}

