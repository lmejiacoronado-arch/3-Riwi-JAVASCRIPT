export const projectService = {
    URL: "http://localhost:3000",

    async login(username, password) { //esto va tomar tiempo
        try {
            const answer = await fetch(`${this.URL}/user`); //espere porque esto toma tiempo

            const user = await answer.json();

            const userFound = user.find(u => 
                u.username === username && u.password === password);

            return userFound;
        } catch (error) {
            console.error("Connection error:", error);
            return null;
        }
    },

    async getProjects() {
        try {
            const answer = await fetch(`${this.URL}/projects`);

            if (!answer.ok) throw new Error("Project not found")
            
            const data = await answer.json();
            
            return data

        } catch (error) {
            console.error("Error getting projects:", error);
            return null;
        }
    },

    async getProjectById(id) {
    try {
        const res = await fetch(`${this.URL}/projects/${id}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error al traer el detalle:", error);
        return null;}
    },

    async updateProjectStatus(id, newStatus) {
    await fetch(`${this.URL}/projects/${id}`, {
        method: 'PATCH', // PATCH solo cambia el campo que le pidas
        body: JSON.stringify({ status: newStatus }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
}
};