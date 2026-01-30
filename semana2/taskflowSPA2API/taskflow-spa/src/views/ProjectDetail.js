import { store } from '../state/store.js';

export function ProjectDetail(id) {
  const project = store.projects.find(p => p.id == id);

  if (!project) {
    return `
      <p>Proyecto no encontrado</p>
      <a href="#/projects">⬅ Volver</a>
    `;
  }

  return `
    <h2>${project.title}</h2>
    <p>ID: ${project.id}</p>
    <p>DESCRIPTION: ${project.body}</p>
    <a href="#/projects">⬅ Volver</a>
  `;
}