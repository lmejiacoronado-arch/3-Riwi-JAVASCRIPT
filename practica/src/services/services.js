// services/services.js
export const projectService = {
  URL: "http://localhost:3000",

  // --- USUARIOS ---
  async getUsers() {
    const res = await fetch(`${this.URL}/users`);
    return await res.json();
  },

  async postUser(user) {
    const res = await fetch(`${this.URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await res.json();
  },

  // --- EVENTOS ---
  // Este es el que pide tu router en el case "#/events"
  async getEvents() {
    try {
      const res = await fetch(`${this.URL}/events`);
      return await res.json();
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      return [];
    }
  },

  // Para que el Admin cree eventos nuevos
  async postEvent(event) {
    const res = await fetch(`${this.URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    return await res.json();
  },

  // ... dentro de projectService
  // Obtener un solo evento por ID
  async getEventById(id) {
    const res = await fetch(`${this.URL}/events/${id}`);
    return await res.json();
  },

  // Guardar la reserva en 'registrations'
  async postRegistration(registration) {
    const res = await fetch(`${this.URL}/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration),
    });
    return await res.json();
  },

  async getRegistrations() {
    const res = await fetch(`${this.URL}/registrations`);
    return await res.json();
  },

  async updateEventAttendees(eventId, newTotal) {
    const res = await fetch(`${this.URL}/events/${eventId}`, {
      method: "PATCH", // PATCH actualiza solo los campos que enviamos
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attendees: newTotal }),
    });
    return await res.json();
  },

  // --- MÉTODOS QUE FALTAN PARA EL ADMIN ---

  // 1. Para actualizar un evento completo (cuando lo editas)
  async putEvent(id, eventData) {
    const res = await fetch(`${this.URL}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    return await res.json();
  },

  // 2. Para eliminar un evento del catálogo
  async deleteEvent(id) {
    await fetch(`${this.URL}/events/${id}`, {
      method: "DELETE",
    });
  },

  // 3. Para cancelar una reserva desde el panel de control
  async deleteRegistration(id) {
    await fetch(`${this.URL}/registrations/${id}`, {
      method: "DELETE",
    });
  },
};
