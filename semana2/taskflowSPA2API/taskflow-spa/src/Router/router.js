import { render } from '../core/render.js';
import { Dashboard } from '../views/dashboard.js';
import { Projects } from '../views/Projects.js';
import { ProjectDetail } from '../views/ProjectDetail.js';

export async function router() {
  const hash = location.hash || '#/dashboard';
  const [, route, param] = hash.split('/');

  let view = '<p>Cargando...</p>';

  try {
    switch (route) {
      case 'dashboard':
        view = Dashboard();
        break;

      case 'projects':
        if (param) {
          view = ProjectDetail(param);
        } else {
          view = await Projects();
        }
        break;

      default:
        view = Dashboard();
    }
  } catch (error) {
    view = `<p>Error inesperado: ${error.message}</p>`;
  }

  render(view);
}