import { loginView, loginLogic } from '../views/login.js';
import { render } from '../core/render.js';
import { projectService } from '../services/projectService.js';
import { dashboardView } from '../views/dashboard.js';


export async function router() {
    const hash = window.location.hash;
    
    switch (hash) {
        case '#login':
            render(loginView());
            loginLogic();
            break;
        
        case '#dashboard':
            render(dashboardView());
            break;

        case '#projects':
            const datos = await projectService.getProjects();
            render(projectService(datos));
            projectsLogic();
            break;
        
        default:
            window.location.hash = '#login';
            break;

    }


}
