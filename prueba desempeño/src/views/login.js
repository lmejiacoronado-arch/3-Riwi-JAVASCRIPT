import { projectService } from "../services/services.js";
import { store } from "../state/store.js";

// --- VISTA: Estructura HTML del Login ---
export function loginView() {
    return `
        <div class="auth-container">
            <div class="auth-card">
                <h2>TASK</h2>
                <p>Ingresa para gestionar tus tareas</p>
                
                <div class="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" id="login-email" placeholder="ejemplo@correo.com">
                </div>

                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" id="login-password" placeholder="********">
                </div>

                <button id="btn-login" class="btn-auth">Iniciar Sesión</button>
                
                <p class="auth-footer">
                    ¿No tienes cuenta? <a href="#/register">Regístrate aquí</a>
                </p>
            </div>
        </div>
    `;
}

// --- LÓGICA: Manejo de datos y validación ---
export async function loginLogic() {
    // Seleccionamos el botón por su ID
    const btnLogin = document.getElementById("btn-login");

    // Escuchamos el evento click, tal como en el proyecto anterior
    btnLogin.addEventListener("click", async () => {
        // Capturamos los valores de los inputs manualmente
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        // Validación simple: que no haya campos vacíos
        if (email === "" || password === "") {
            alert("Por favor, completa todos los campos");
            return;
        }

        try {
            // Llamamos al servicio para obtener la lista de usuarios
            const users = await projectService.getUsers();
            
            // Buscamos si existe un usuario que coincida con email y password
            const userFound = users.find(u => u.email === email && u.password === password);

            if (userFound) {
                // Si existe, guardamos sus datos en el store global y en localStorage
                store.user = userFound;
                localStorage.setItem("user", JSON.stringify(userFound));

                alert("¡Hola de nuevo, " + userFound.name + "!");

                // Redirección basada en el ROL del usuario (Admin o Client)
                if (userFound.role === "Manager") {
                    window.location.hash = "#/dashboard"; // Panel para ver todas las reservas
                } else {
                    window.location.hash = "#/myTask"; // Lista de eventos para suscribirse
                }
            } else {
                // Si no coincide nada, avisamos al usuario
                alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}
