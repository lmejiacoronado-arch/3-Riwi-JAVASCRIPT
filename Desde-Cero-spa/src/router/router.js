import { loginView, loginLogic } from '../views/login.js';
import { render } from '../core/render.js';
import { projectService } from '../services/projectService.js';
import { dashboardView } from '../views/dashboard.js';
import { projectsView, projectsLogic } from '../views/projects.js';
import { projectDetailsView } from '../views/projectDetail.js';
import { createNewProjectView, createNewProjectLogic } from '../views/createNewProject.js';



export async function router() {
    const hash = window.location.hash;

    if (hash.startsWith("#/project-details/")) {
        const id = hash.split("/")[2];
        const project = await projectService.getProjectById(id);
        render(projectDetailsView(project));
        return;
    }


    switch (hash) {

        case '#login':
            render(loginView());
            loginLogic();
            break;

        case '#dashboard':
            render(dashboardView());
            break;

        case '#projects':
            const data = await projectService.getProjects();
            render(projectsView(data));
            projectsLogic();
            break;
        
        case '#create':
            render(createNewProjectView());
            createNewProjectLogic();
            break;

        default:
            window.location.hash = '#login';
            break;
    }
}
