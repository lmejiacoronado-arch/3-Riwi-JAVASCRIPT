import { store } from '../state/store.js';
import { fetchProjects } from '../services/projectsService.js';

export async function Projects() {
  // Solo cargar una vez
  if (!store.hasLoadedProjects) {
    store.hasLoadedProjects = true;
    store.loading = true;

    try {
      store.projects = await fetchProjects();
      store.error = null;
    } catch (err) {
      store.error = err.message;
    } finally {
      store.loading = false;
    }
  }

  if (store.loading) {
    return '<p>Cargando proyectos...</p>';
  }

  if (store.error) {
    return `<p>Error: ${store.error}</p>`;
  }

  return `
  <h2>Proyectos</h2>
  <ul>
    ${store.projects
      .map(
        p => `
          <li>
            <a href="#/projects/${p.id}">
              ${p.title}
            </a>
          </li>
        `
      )
      .join('')}
  </ul>
  <a href="#/dashboard">⬅ Volver</a>
  `;

}
