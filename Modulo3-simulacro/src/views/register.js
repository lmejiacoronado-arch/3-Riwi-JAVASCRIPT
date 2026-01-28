import { projectService } from "../services/services.js";


export function registerView() {
    return `
    <div class="auth-container">
        <h2>Crear Cuenta</h2>
        <form id="registerForm" class="auth-form">
            <input type="text" name="name" id="reg-name" placeholder="Nombre completo" required>
            <input type="email" name="email" id="reg-email" placeholder="Correo electrónico" required>
            <input type="tel" name="phone" id="reg-phone" placeholder="Teléfono" required>
            <input type="password" name="password" id="reg-pass" placeholder="Contraseña" required>
            
            <button type="submit">Registrarse</button>
            <p>¿Ya tienes cuenta? <a href="#/login" id="go-login">Inicia sesión</a></p>
        </form>
    </div>
    `
}

export function registerLogic() {
    const registerForm = document.querySelector("#registerForm");
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();


        const data = new FormData(registerForm);

        const newUser = { // hasta antes de esto estaba bien
            name: data.get("name"),
            email: data.get("email"),
            phone: data.get("phone"),
            password: data.get("password")
        };

        // ¡AQUÍ es donde conectas con el service!
        const result = await projectService.register(newUser);

        if (result) {
            alert("¡Usuario registrado con éxito!");
            window.location.hash = "#/login";
        } else {
            alert("Error al registrar.");
        }

    })
}

