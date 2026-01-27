export const weather = {
    URL: "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,precipitation,wind_speed_10m",


    async getWeather(lon, lat) {
        try {
            const answerWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m`);
            if (!answerWeather.ok) throw new Error("Network Error");

            const dataWeather = await answerWeather.json();

            return dataWeather;
        }
        catch (error) {
            console.error("Error obtaining climate data");
            return null;
        };
    }
};


export const projectService = {
    URL: "http://localhost:3000",


    async getLogin(email, password) {
        try {
            const answerProjects = await fetch(`${this.URL}/user`);
            if (!answerProjects.ok) throw new Error("Network Error")

            const dataProjects = await answerProjects.json();

            const userFound = dataProjects.find(u => u.email === email && u.password == password);

            return userFound
        }
        catch (error) {
            console.error("Error obtaining user data");
            return null;
        }
    },


    async getProject() {
        try {
            const answerGetProject = await fetch(`${this.URL}/projects`)
            if (!answerGetProject.ok) throw new Error("Network Error");

            const dataGetProject = await answerGetProject.json();

            return dataGetProject;
        }
        catch (error) {
            console.error("Error obtaining projects data")
            return null;
        }
    },


    async getProjectById(id) {
        try {
            const answerGetProjectById = await fetch(`${this.URL}/projects/${id}`);
            if (!answerGetProjectById.ok) { throw new Error(`The project could not be found by ID: ${id}`) };
            const dataProjectById = await answerGetProjectById.json();
            return dataProjectById;
        } catch (error) {
            console.error("Error retrieving project by ID:", error);
            return null;
        }
    },


    async updateProjectStatus(id, newStatus) {
        try {
            const answerUpdateProjectStatus = await fetch(`${this.URL}/projects/${id}`, {
                method: 'PATCH', // PATCH solo cambia el campo que le pidas
                body: JSON.stringify({ status: newStatus }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            if (!answerUpdateProjectStatus.ok) throw new Error("The status could not be updated")
            return await answerUpdateProjectStatus.json();
        } catch (error) {
            console.error("Error al actualizar estado:", error);
            return null;
        }
    },


    async createProject(projectData) {
        try {
            const answerCreateProject = await fetch(`${this.URL}/projects`, {
                method: 'POST',
                body: JSON.stringify(projectData),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            if (!answerCreateProject.ok) throw new Error("Error creating project");
            return await answerCreateProject.json();
        } catch (error) {
            console.error("Error al actualizar estado:", error);
            return null;
        }
    },
}


