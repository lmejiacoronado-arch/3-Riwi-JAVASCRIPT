import { projectService } from "../../services/services.js";
import { store } from "../../state/store.js";

// --- VISTA: Recibe la lista de eventos del router ---
export function eventsView(events) {
    let view = `
        <div class="container">
            <h1>Eventos Disponibles</h1>
            <div class="events-grid">
    `;

    // Recorremos los eventos para crear las tarjetas
    events.forEach(event => {
        view += `
            <div class="event-card">
                <h3>${event.title}</h3>
                <p><strong>Fecha:</strong> ${event.date}</p>
                <p>${event.description}</p>
                <p><strong>Cupos:</strong> ${event.attendees} / ${event.capacity}</p>
                <button class="btn-reserve" data-id="${event.id}">Ver detalles</button>
            </div>
        `;
    });

    view += `
            </div>
        </div>
    `;
    return view;
}

// --- LÓGICA: Manejo de interacciones ---
export function eventsLogic() {
    const buttons = document.querySelectorAll(".btn-reserve");

    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const eventId = e.target.getAttribute("data-id");
            // --- PERSISTENCIA IGUAL QUE AL PRINCIPIO ---
            // Guardamos el ID para que no se borre al recargar
            localStorage.setItem("selectedEvent", eventId);
            // Aquí podrías mandarlo a #/chooseEvents
            window.location.hash = "#/chooseEvents";
        });
    });
}