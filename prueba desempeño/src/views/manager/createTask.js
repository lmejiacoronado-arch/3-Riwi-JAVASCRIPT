import { projectService } from "../../services/services.js";

export async function createTasksView(tasks) {
    // Obtenemos los usuarios para filtrar empleados y mostrarlos en el select
    const users = await projectService.getUsers();
    const employees = users.filter(u => u.role === "Employees");

    let view = `
        <div class="container">
            <h1>Gestión de Tareas</h1>
            <section class="manager-card">
                <h3 id="form-title-text" style="margin-bottom: 1rem;">Crear / Editar tarea</h3>
                <form id="manager-task-form">
                    <input type="hidden" id="event-id" name="id">
                    
                    <!-- Nombre de la tarea -->
                    <input type="text" name="title" id="form-title" placeholder="Nombre de la labor" required>
                    
                    <!-- Selección de Empleado -->
                    <select name="userId" id="form-userId" required>
                        <option value="">Asignar a...</option>
                        ${employees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('')}
                    </select>

                    <!-- Selección de Categoría (Requerimiento específico) -->
                    <select name="category" id="form-category" required>
                        <option value="">Categoría</option>
                        <option value="Matemática">Matemática</option>
                        <option value="Física">Física</option>
                        <option value="Historia">Historia</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Literatura">Literatura</option>
                    </select>

                    <!-- Selección de Prioridad (Requerimiento específico) -->
                    <select name="priority" id="form-priority" required>
                        <option value="">Prioridad</option>
                        <option value="Bajo">Bajo</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto">Alto</option>
                    </select>

                    <!-- Selección de Estado (Requerimiento específico) -->
                    <select name="status" id="form-status" required>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <input type="date" name="date" id="form-date" required>
                    
                    <textarea name="description" id="form-description" placeholder="Instrucciones adicionales..."></textarea>
                    
                    <div class="form-buttons">
                        <button type="submit" id="btn-save">Guardar Tarea</button>
                        <button type="reset" id="btn-reset">Limpiar</button>
                    </div>
                </form>
            </section>

            <table class="manager-table">
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Asignado a</th>
                        <th>Categoría</th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;

    tasks.forEach(task => {
        const assignedUser = users.find(u => u.id == task.userId);
        
        view += `
            <tr>
                <td><strong>${task.title}</strong></td>
                <td>${assignedUser ? assignedUser.name : "Sin asignar"}</td>
                <td><small>${task.category}</small></td>
                <td><span class="priority-${task.priority.toLowerCase()}">${task.priority}</span></td>
                <td><span class="status-${task.status.toLowerCase().replace(" ", "-")}">${task.status}</span></td>
                <td>${task.date}</td>
                <td>
                    <button class="btn-edit" data-id="${task.id}" title="Editar">✏️</button>
                    <button class="btn-delete" data-id="${task.id}" title="Eliminar">🗑️</button>
                </td>
            </tr>
        `;
    });

    return view + `</tbody></table></div>`;
}

export function createTasksLogic() {
    const form = document.getElementById("manager-task-form");
    const table = document.querySelector(".manager-table");

    if (!table || !form) return;

    // Delegación de eventos para la tabla (Editar y Eliminar)
    table.addEventListener("click", async (e) => {
        const id = e.target.getAttribute("data-id");
        if (!id) return;

        if (e.target.classList.contains("btn-delete")) {
            if (confirm("¿Estás seguro de eliminar esta tarea?")) {
                await projectService.deleteTask(id);
                window.location.reload();
            }
        }

        if (e.target.classList.contains("btn-edit")) {
            const task = await projectService.getTaskById(id);
            
            // Llenamos el formulario con los datos existentes
            document.getElementById("event-id").value = task.id;
            document.getElementById("form-title").value = task.title;
            document.getElementById("form-userId").value = task.userId || "";
            document.getElementById("form-category").value = task.category;
            document.getElementById("form-priority").value = task.priority;
            document.getElementById("form-status").value = task.status;
            document.getElementById("form-date").value = task.date;
            document.getElementById("form-description").value = task.description || "";
            
            document.getElementById("btn-save").textContent = "Actualizar Tarea";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Manejo del envío del formulario (Crear y Actualizar)
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const id = document.getElementById("event-id").value;
        const formData = new FormData(form);

        const data = {
            title: formData.get("title").trim(),
            userId: formData.get("userId"),
            category: formData.get("category"),
            priority: formData.get("priority"),
            status: formData.get("status"),
            date: formData.get("date"),
            description: formData.get("description").trim(),
        };

        try {
            if (id) {
                await projectService.putTask(id, data);
                alert("Tarea actualizada");
            } else {
                await projectService.createTasks(data); 
                alert("Tarea creada con éxito");
            }
            window.dispatchEvent(new HashChangeEvent("hashchange"));
        } catch (error) {
            console.error("Error al procesar la tarea:", error);
            alert("Error de conexión con el servidor.");
        }
    });
}