import { projectService } from "../../services/services.js";

export function createEmployeeTasksView(tasks) {
    let view = `
        <div class="container">
            <h1>Mis Labores Asignadas</h1>
            <table class="manager-table">
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Prioridad</th>
                        <th>Fecha Límite</th>
                        <th>Estado</th>
                        <th>¿Finalizada?</th>
                    </tr>
                </thead>
                <tbody>
    `;

    if (tasks.length === 0) {
        view += `<tr><td colspan="5" style="text-align:center;">No tienes tareas pendientes. ¡Buen trabajo!</td></tr>`;
    } else {
        tasks.forEach(task => {
            // Evaluamos si la tarea ya está completada
            const isCompleted = task.status === "Completada";
            
            view += `
                <tr class="${isCompleted ? 'row-completed' : ''}">
                    <td class="task-title">
                        ${isCompleted ? '✅ ' : ''}${task.title}
                    </td>
                    <td>${task.priority}</td>
                    <td>${task.date}</td>
                    <td>
                        <span class="status-${task.status.toLowerCase()}">
                            ${task.status}
                        </span>
                    </td>
                    <td style="text-align: center;">
                        <input type="checkbox" 
                               class="btn-done-check" 
                               data-id="${task.id}" 
                               ${isCompleted ? 'checked disabled' : ''}
                               style="width: 20px; height: 20px; cursor: pointer;">
                    </td>
                </tr>
            `;
        });
    }

    return view + `</tbody></table></div>`;
}

export function createEmployeeTasksLogic() {
    const table = document.querySelector(".manager-table");
    if (!table) return;

    // Escuchamos el cambio en el checkbox
    table.addEventListener("change", async (e) => {
        if (e.target.classList.contains("btn-done-check")) {
            const id = e.target.getAttribute("data-id");
            const isChecked = e.target.checked;

            if (isChecked) {
                try {
                    // 1. Obtenemos la tarea actual
                    const task = await projectService.getTaskById(id);

                    // 2. Preparamos el objeto actualizado
                    const taskUpdated = {
                        ...task,
                        status: "Completada"
                    };

                    // 3. Guardamos en el servidor
                    await projectService.putTask(id, taskUpdated);
                    
                    // 4. Recargamos para ver el efecto de tachado
                    window.dispatchEvent(new HashChangeEvent("hashchange"));
                } catch (error) {
                    console.error("Error al actualizar tarea:", error);
                    alert("No se pudo marcar como terminada.");
                    e.target.checked = false; // Revertimos el checkbox si falla
                }
            }
        }
    });
}