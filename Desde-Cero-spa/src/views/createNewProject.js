import { projectService } from "../services/projectService.js";

export function createNewProjectView() {
    return `
    <div>
        <h2>Creando proyecto</h2>
        <form id="createNewProject">
            <input type="text" id="name" placeholdeqr="Name project" required>
            <textarea id="details" placeholder="Details project" required></textarea>
            <button type="submit">Add</button>
        </form>
    </div>
    `;
};

export function createNewProjectLogis() {
    const createNewProject = document.querySelector("#createNewProjects")

    createNewProject.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newProject = {
            name: document.getElementById("name").value,
            details: document.getElementById("details").value,
            status: 'pending'
        };

        await projectService.createProject(newProject)
        window.location.hash = '#projects';
    });
};




