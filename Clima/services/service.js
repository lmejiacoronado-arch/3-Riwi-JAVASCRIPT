export const weather = {
    URL: "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,precipitation,wind_speed_10m",


    async getWeather(lon, lat) {
        try {
            const answerWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m`);
            if (!answerWeather.ok) throw new Error("Network Error");

            const dataWeather = await answer.json();

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
            if(!answerProjects.ok) throw new Error("Network Error")
            
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
            const answer = await fetch(`${this.URL}/projects`)
            if (!answer.ok) throw new Error("Network Error");

            const data = await answer.json();

            return data;
        }
        catch (error) {
            console.error("Error obtaining projects data")
            return null;
        }
        
    },


}


