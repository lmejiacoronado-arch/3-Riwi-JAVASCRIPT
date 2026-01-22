import { loginView, loginLogic } from '../views/login.js';
import { render } from '../core/render.js';
import { projectService } from '../services/projectService.js';
import { dashboardView } from '../views/dashboard.js';
import { projectsView, projectsLogic } from '../views/projects.js';
import { projectDetailsView } from '../views/projectDetail.js';



export async function router() {
    const hash = window.location.hash;

    if (hash.startsWith("#/project-details/")) {
        // 1. Extraemos el número de la URL (ej: de #/project-details/1 saca el 1)
        const id = hash.split("/")[2];

        // 2. Pedimos la info completa de ESE proyecto al servidor
        const project = await projectService.getProjectById(id);

        // 3. Renderizamos la nueva vista de detalle
        render(projectDetailsView(project));
        return; // Importante para no seguir ejecutando el switch
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

        default:
            window.location.hash = '#login';
            break;
    }
}
