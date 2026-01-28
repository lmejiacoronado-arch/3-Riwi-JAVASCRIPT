import { registerLogic } from "../views/register.js";

export const projectService = {
    URL: "http://localhost:3000",

    async login(email, password, role) { //esto va tomar tiempo
        try {
            const answer = await fetch(`${this.URL}/users`); //espere porque esto toma tiempo
            const user = await answer.json();
            const userFound = user.find(u =>
                u.email === email && u.password === password && u.role === role);

            return userFound;
        } catch (error) {
            console.error("Connection error:", error);
            return null;
        }
    },


    async register(newUser) {
        try {
            const answer = await fetch(`${this.URL}/users`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            if (!answer.ok) throw new Error("Error creating project");
            return await answer.json();

        } catch (error) {
            console.error("Error al actualizar estado:", error);
            return null;
        }
    },


    async getMenu() {
        try {
            const response = await fetch(`${this.URL}/menu`);
            const res = await response.json()
            return res
        } catch (error) {
            console.error("Error en la petición:", error);
            return null
        }
    },
}