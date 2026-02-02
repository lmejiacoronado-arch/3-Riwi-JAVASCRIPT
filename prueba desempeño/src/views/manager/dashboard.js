import { projectService } from "../../services/services.js";

export async function getTasksView(tasks) {
    const users = await projectService.getUsers();

    let view = `
        <div class="container">
            <h1>Control de Tareas</h1>
            <table class="manager-table">
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Asignado a</th>
                        <th>Estado</th>
                        <th>Prioridad</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
    `;

    tasks.forEach(task => {
        const assignedUser = users.find(u => u.id == task.userId);
        view += `
            <tr>
                <td>${task.title}</td>
                <td><strong>${assignedUser ? assignedUser.name : "Sin asignar"}</strong></td>
                <td>${task.status}</td>
                <td>${task.priority}</td>
                <td>${task.date}</td>
            </tr>
        `;
    });

    return view + `</tbody></table></div>`;
}

export function getTasksLogic() {
    const table = document.querySelector(".manager-table");
    if (!table) return;

    table.addEventListener("click", async (e) => {
        // CORRECCIÓN: Debe coincidir con la clase del botón arriba
        if (e.target.classList.contains("btn-delete")) {
            const id = e.target.getAttribute("data-id");

            if (confirm("¿Seguro que deseas eliminar esta tarea?")) {
                try {
                    await projectService.deleteTask(id);
                    alert("Tarea eliminada correctamente.");
                    window.dispatchEvent(new HashChangeEvent("hashchange"));
                } catch (error) {
                    console.error("Error al eliminar:", error);
                    alert("No se pudo eliminar la tarea.");
                }
            }
        }
    });
}