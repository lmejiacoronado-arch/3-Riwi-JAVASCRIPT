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
    }
};