import { projectService } from "../services/services.js";

// --- VISTA: Formulario con atributo 'name' para FormData ---
export function registerView() {
    return `
        <div class="auth-container">
            <div class="auth-card">
                <h2>Registro de Eventos</h2>
                <form id="register-form">
                    <div class="form-group">
                        <label>Nombre</label>
                        <input type="text" name="name" required placeholder="Tu nombre">
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" required placeholder="correo@ejemplo.com">
                    </div>

                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="password" required placeholder="********">
                    </div>

                    <div class="form-group">
                        <label>Rol</label>
                        <select name="role">
                            <option value="Client">Cliente</option>
                            <option value="Admin">Administrador</option>
                        </select>
                    </div>

                    <button type="submit" class="btn-auth">Registrarse</button>
                </form>
            </div>
        </div>
    `;
}

// --- LÓGICA: Usando FormData como en tu proyecto ---
export async function registerLogic() {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", async (e) => {
        // Evitamos que la página se recargue al enviar
        e.preventDefault();

        // 1. Creamos el objeto FormData del formulario
        const formData = new FormData(form);
        
        // 2. Extraemos los valores usando el método .get() y el 'name' del input
        // Así es como probablemente lo tenías, combinando FormData con asignación manual
        const newUser = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            role: formData.get("role")
        };

        try {
            // 3. Enviamos el objeto al servicio
            await projectService.postUser(newUser);
            
            alert("¡Usuario registrado con éxito!");
            window.location.hash = "#/login";
        } catch (error) {
            alert("Error al intentar registrar el usuario");
        }
    });
}