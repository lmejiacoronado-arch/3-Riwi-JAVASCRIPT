import { projectService } from "../../services/services.js";

export async function reservedView() {
    // 1. Obtenemos el usuario y las reservas
    const user = JSON.parse(localStorage.getItem('user'));
    const allRegistrations = await projectService.getRegistrations();
    const allEvents = await projectService.getEvents();

    // 2. Filtramos: solo las reservas de este cliente
    const myRegistrations = allRegistrations.filter(r => r.userId === user.id);

    let view = `
        <div class="container">
            <h1>Mis Reservas</h1>
            <div class="reserved-list">
    `;

    if (myRegistrations.length === 0) {
        view += `<p>Aún no tienes eventos reservados.</p>`;
    } else {
        myRegistrations.forEach(reg => {
            // Buscamos el nombre del evento usando el eventId de la reserva
            const eventInfo = allEvents.find(e => e.id == reg.eventId);
            
            view += `
                <div class="reserved-item">
                    <h3>${eventInfo ? eventInfo.title : "Evento no encontrado"}</h3>
                    <p><strong>Cantidad:</strong> ${reg.quantity} personas</p>
                    <p><strong>Fecha de Reserva:</strong> ${new Date(reg.date).toLocaleDateString()}</p>
                </div>
            `;
        });
    }

    view += `
            </div>
            <a href="#/events" class="btn-back">Explorar más eventos</a>
        </div>
    `;
    return view;
}

export function reservedLogic() {
    // Aquí puedes agregar lógica para cancelar reservas si lo deseas en el futuro
    console.log("Historial de reservas cargado.");
}