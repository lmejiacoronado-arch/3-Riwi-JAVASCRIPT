import { projectService } from "../services/projectService.js";

export function projectsView(projects) {

    return `
    <h2>Tus proyectos</h2>
    <div>
    ${projects.map(p => `
        <div>
            <a href="#/project-details/${p.id}"><h3>${p.name}</h3></a>
            <input type="checkbox" class="status" data-id="${p.id}" ${p.status === 'completed' ? 'checked' : ''}>
            <p>${p.status}</p>           
        </div>
        `).join('')}
    </div>
    `;
}
export function projectsLogic() {
    // Seleccionamos todos los checks que acabamos de renderizar
    const checks = document.querySelectorAll(".status");

    checks.forEach(check => {
        check.addEventListener('change', async (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            const nuevoEstado = e.target.checked ? 'completed' : 'pending';

            await projectService.updateProjectStatus(id, nuevoEstado);

            const contenedor = e.target.closest('');
            const etiquetaEstado = contenedor.querySelector('.status-label');

            // 3. Actualizamos solo el texto
            etiquetaEstado.textContent = nuevoEstado;

            
        });
    });
}
