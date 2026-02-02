export const projectService = {
  URL: "http://localhost:3000",

  async login(email, password) {
    //esto va tomar tiempo
    try {
      const answerLogin = await fetch(`${this.URL}/users`); //espere porque esto toma tiempo
      const dataLogin = await answerLogin.json();
      const userFound = dataLogin.find(
        (u) => u.email === email && u.password == password,
      );

      return userFound;
    } catch (error) {
      console.error("Connection error:", error);
      return null;
    }
  },

  async register(newUser) {
    try {
      const answerRegister = await fetch(`${this.URL}/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (!answerRegister.ok) throw new Error("Error register");
      return await answerRegister.json();
    } catch (error) {
      console.error("Error al actualizar register:", error);
      return null;
    }
  },

  async getMenu() {
    try {
      const answerGetMenu = await fetch(`${this.URL}/menu`);
      if (!answerGetMenu.ok) throw new Error("Error menu");
      const dataGetMenu = await answerGetMenu.json();
      return dataGetMenu;
    } catch (error) {
      console.error("Error en la petición:", error);
      return null;
    }
  },

  async getMenuId(id) {
    try {
      const answerGetMenuId = await fetch(`${this.URL}/menu/${id}`);
      if (!answerGetMenuId.ok) throw new Error("Error menu");
      const dataGetMenuId = await answerGetMenuId.json();
      console.log(dataGetMenuId);
      return dataGetMenuId;
    } catch (err) {
      console.error("Error en la petición:", err);
      return null;
    }
  },

  async postOrder(nuevaOrden) {
    try {
      const response = await fetch(`${this.URL}/orders`, {
        // Usamos this.URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaOrden),
      });

      if (!response.ok)
        throw new Error("Error en el servidor al postear orden");

      return await response.json();
    } catch (error) {
      console.error("Error en postOrder:", error);
      return null;
    }
  },

  async getOrdersByUserId(userId) {
    // Cambiado de arrow function a método tradicional
    try {
      // Usamos this.URL para mantener la consistencia
      const response = await fetch(`${this.URL}/orders?userId=${userId}`);

      if (!response.ok) throw new Error("Error fetching orders");

      return await response.json();
    } catch (error) {
      console.error("Error en getOrdersByUserId:", error);
      return []; // Devolvemos array vacío en caso de error para no romper el .map()
    }
  },

  async getAllOrders() {
    try {
      const response = await fetch(`${this.URL}/orders`);
      if (!response.ok) throw new Error("Error fetching all orders");
      return await response.json();
    } catch (error) {
      console.error("Admin Error:", error);
      return [];
    }
  },

  async updateOrderStatus(orderId, newStatus) {
    try {
      const response = await fetch(`${this.URL}/orders/${orderId}`, {
        method: "PATCH", // PATCH es ideal para actualizaciones parciales
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Error updating order status");
      return await response.json();
    } catch (error) {
      console.error("Error en updateOrderStatus:", error);
      return null;
    }
  },

  async addProduct(product) {
    const response = await fetch(`${this.URL}/menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return await response.json();
  },

  async updateProduct(id, updatedData) {
    const response = await fetch(`${this.URL}/menu/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    return await response.json();
  },

  async deleteProduct(id) {
    await fetch(`${this.URL}/menu/${id}`,
      { method: "DELETE" });
  },
};
