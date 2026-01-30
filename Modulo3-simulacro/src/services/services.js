export const projectService = {
    URL: "http://localhost:3000",

    async login(email, password) { //esto va tomar tiempo
        try {
            const answerLogin = await fetch(`${this.URL}/users`); //espere porque esto toma tiempo
            const dataLogin = await answerLogin.json();
            const userFound = dataLogin.find(u =>
                u.email === email && u.password === password);

            return userFound;
        } catch (error) {
            console.error("Connection error:", error);
            return null;
        }
    },


    async register(newUser) {
        try {
            const answerRegister = await fetch(`${this.URL}/users`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
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
            return null
        }
    },

    async getMenuId(id) {
        try {
            const answerGetMenuId = await fetch(`${this.URL}/menu/${id}`);
            if (!answerGetMenuId.ok) throw new Error("Error menu");
            const dataGetMenuId = await answerGetMenuId.json();
            console.log(dataGetMenuId);
            return dataGetMenuId
            
            

        } catch (err){

        }
    }
}