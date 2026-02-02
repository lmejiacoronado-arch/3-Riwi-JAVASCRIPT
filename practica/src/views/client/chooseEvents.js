import { projectService } from "../../services/services.js";

export async function chooseEventsView() {
    const eventId = localStorage.getItem("selectedEvent");
    if (!eventId || eventId === "null") return `<h2>Selecciona un evento primero.</h2>`;

    const event = await projectService.getEventById(eventId);

    return `
        <div class="container">
            <h1>Confirmar Reserva: ${event.title}</h1>
            <p><strong>Cupos actuales:</strong> ${event.attendees || 0} / ${event.capacity}</p>
            <form id="confirm-form">
                <input type="number" name="quantity" min="1" max="5" value="1" required>
                <button type="submit">Confirmar Mi Asistencia</button>
            </form>
        </div>
    `;
}

export async function chooseEventsLogic() {
    const form = document.getElementById("confirm-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const eventId = localStorage.getItem("selectedEvent");
        const user = JSON.parse(localStorage.getItem('user')); // Obtenemos el usuario logueado
        const qty = parseInt(new FormData(form).get("quantity"));

        try {
            const event = await projectService.getEventById(eventId);
            const current = parseInt(event.attendees || 0);

            if (current + qty > event.capacity) {
                return alert("No hay cupos suficientes.");
            }

            // GUARDAR RESERVA CON EL NOMBRE REAL
            const registration = {
                userId: user.id,
                userName: user.name || user.username, 
                eventId: eventId,
                quantity: qty,
                date: new Date().toISOString()
            };

            await projectService.postRegistration(registration);
            await projectService.updateEventAttendees(eventId, current + qty);

            localStorage.removeItem("selectedEvent");
            alert("¡Reserva exitosa!");
            window.location.hash = "#/reserved";
        } catch (error) {
            alert("Error al procesar reserva.");
        }
    });
}