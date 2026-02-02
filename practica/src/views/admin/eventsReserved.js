import { projectService } from "../../services/services.js";

/**
 * VISTA: Genera el HTML de la tabla de auditoría.
 * Cruza la información de las reservas con los datos de los eventos.
 */
export async function eventsReservedView(registrations, events) {
    // Iniciamos la estructura de la tabla
    let view = `
        <div class="container">
            <h1>Control de Reservas (Quién Reservó)</h1>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Evento</th>
                        <th>Cliente</th>
                        <th>Fecha Reserva</th>
                        <th>Cupos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;

    // Recorremos el array de registros (registrations) proveniente de la DB
    registrations.forEach(reg => {
        // [BUSQUEDA] Buscamos el objeto del evento relacionado usando el eventId de la reserva
        const eventInfo = events.find(e => e.id == reg.eventId);
        
        view += `
            <tr>
                <td>${eventInfo ? eventInfo.title : "Evento eliminado"}</td>
                
                <td>${reg.userName || "Sin nombre"}</td>
                
                <td>${new Date(reg.date).toLocaleString()}</td>
                
                <td>${reg.quantity}</td>
                <td>
                    <button class="btn-cancel-reg" 
                            data-id="${reg.id}" 
                            data-eventid="${reg.eventId}" 
                            data-qty="${reg.quantity}">
                        Cancelar Reserva
                    </button>
                </td>
            </tr>
        `;
    });

    // Cerramos la tabla y añadimos el botón de navegación
    return view + `</tbody></table><br><a href="#/allEvents" class="btn-back">Volver a gestión</a></div>`;
}

/**
 * LÓGICA: Gestiona la cancelación de reservas.
 * Se encarga de eliminar la reserva y devolver los cupos al evento correspondiente.
 */
export function eventsReservedLogic() {
    // Seleccionamos la tabla para usar delegación de eventos
    const table = document.querySelector(".admin-table");
    if (!table) return;

    table.addEventListener("click", async (e) => {
        // Verificamos si el elemento clickeado es el botón de cancelar
        if (e.target.classList.contains("btn-cancel-reg")) {
            
            // Extraemos los datos del dataset del botón
            const { id, eventid, qty } = e.target.dataset;
            
            if (confirm("¿Seguro que deseas cancelar esta reserva? Los cupos se devolverán al evento.")) {
                try {
                    // [PASO 1] Obtener el estado actual del evento para conocer sus asistentes
                    const event = await projectService.getEventById(eventid);
                    
                    // [PASO 2] Calcular el nuevo total de asistentes restando la reserva que se cancela
                    // Usamos Math.max para asegurar que el resultado nunca sea menor a cero
                    const newTotal = Math.max(0, (event.attendees || 0) - parseInt(qty));
                    
                    // [PASO 3] Actualizar el servidor:
                    // Primero notificamos el nuevo conteo de asistentes al evento (PATCH)
                    await projectService.updateEventAttendees(eventid, newTotal);
                    
                    // Segundo, eliminamos el registro de la reserva (DELETE)
                    await projectService.deleteRegistration(id);
                    
                    // [PASO 4] Refrescamos la página para mostrar los datos actualizados
                    alert("Reserva cancelada exitosamente.");
                    window.location.reload();
                    
                } catch (error) {
                    console.error("Error en el proceso de cancelación:", error);
                    alert("Ocurrió un error al intentar cancelar la reserva.");
                }
            }
        }
    });
}