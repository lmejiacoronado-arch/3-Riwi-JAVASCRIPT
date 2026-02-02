    import { projectService } from "../../services/services.js";

    export function allEventsView(events) {
        let view = `
            <div class="container">
                <h1>Gestión de Eventos</h1>
                <section class="admin-card">
                    <h3 id="form-title-text">Crear / Editar Evento</h3>
                    <form id="admin-event-form">
                        <input type="hidden" id="event-id" name="id">
                        <input type="text" name="title" id="form-title" placeholder="Nombre" required>
                        <input type="date" name="date" id="form-date" required>
                        <input type="text" name="location" id="form-location" placeholder="Lugar" required>
                        <input type="number" name="capacity" id="form-capacity" placeholder="Capacidad Total" required>
                        <textarea name="description" id="form-description" placeholder="Descripción"></textarea>
                        <div class="form-buttons">
                            <button type="submit" id="btn-save">Guardar Evento</button>
                            <button type="reset" id="btn-reset">Limpiar</button>
                        </div>
                    </form>
                </section>

                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Evento</th>
                            <th>Capacidad</th>
                            <th>Ocupados</th>
                            <th>Disponibles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        events.forEach(event => {
            const ocupados = parseInt(event.attendees || 0);
            const disponibles = parseInt(event.capacity) - ocupados;
            view += `
                <tr>
                    <td>${event.title}</td>
                    <td>${event.capacity}</td>
                    <td style="color: blue;">${ocupados}</td>
                    <td style="color: ${disponibles <= 0 ? 'red' : 'green'}">${disponibles}</td>
                    <td>
                        <button class="btn-edit" data-id="${event.id}">✏️</button>
                        <button class="btn-delete" data-id="${event.id}">🗑️</button>
                    </td>
                </tr>
            `;
        });

        return view + `</tbody></table></div>`;
    }

    export function allEventsLogic() {
        const form = document.getElementById("admin-event-form");
        const table = document.querySelector(".admin-table");

        table.addEventListener("click", async (e) => {
            const id = e.target.getAttribute("data-id");
            if (!id) return;

            if (e.target.classList.contains("btn-delete") && confirm("¿Eliminar evento?")) {
                await projectService.deleteEvent(id);
                window.location.reload();
            }

            if (e.target.classList.contains("btn-edit")) {
                const event = await projectService.getEventById(id);
                document.getElementById("event-id").value = event.id;
                document.getElementById("form-title").value = event.title;
                document.getElementById("form-date").value = event.date;
                document.getElementById("form-location").value = event.location;
                document.getElementById("form-capacity").value = event.capacity;
                document.getElementById("form-description").value = event.description;
                document.getElementById("btn-save").textContent = "Actualizar Evento";
                window.scrollTo(0,0);
            }
        });

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("event-id").value;
            const formData = new FormData(form);
            
            let currentAttendees = 0;
            if (id) {
                const ev = await projectService.getEventById(id);
                currentAttendees = ev.attendees || 0;
            }

            const data = {
                title: formData.get("title"),
                date: formData.get("date"),
                location: formData.get("location"),
                capacity: parseInt(formData.get("capacity")),
                description: formData.get("description"),
                attendees: currentAttendees
            };

            id ? await projectService.putEvent(id, data) : await projectService.postEvent(data);
            window.location.reload();
        });
    }