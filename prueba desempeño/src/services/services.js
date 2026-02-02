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

  async getTasks() {
    try {
      const res = await fetch(`${this.URL}/tasks`);
      return await res.json();
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      return [];
    }
  },

  async createTasks(task) {
    const res = await fetch(`${this.URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await res.json();
  },

   // Obtener un solo evento por ID
  async getTaskById(id) {
    const res = await fetch(`${this.URL}/tasks/${id}`);
    return await res.json();
  },

  // 1. Para actualizar un evento completo (cuando lo editas)
  async putTask(id, taskData) {
    const res = await fetch(`${this.URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return await res.json();
  },

  // 2. Para eliminar un evento del catálogo
  async deleteTask(id) {
    await fetch(`${this.URL}/tasks/${id}`, {
      method: "DELETE",
    });
  },

  async getUserById(id) {
    try {
      const res = await fetch(`${this.URL}/users/${id}`);
      if (!res.ok) throw new Error("Usuario no encontrado");
      return await res.json();
    } catch(err) {
      console.error("Error al obtener el usuario", err);
      
    }
  },
}
