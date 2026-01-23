import { projectService } from "../services/projectService.js";

export function projectsView(projects) {

    return `
    <div>
        <header>
            <h1>Mis Proyectos</h1>
            <a href="#create" class="btn-add-main"> 
                + Nuevo Proyecto 
            </a>
        </header>

        <div>
            ${projects.map(p => `
                <div>
                    <h3>${p.name}</h3>
                    <p>Status: <span class="status-label">${p.status}</span></p>
                    <div>
                        <a href="#/project-details/${p.id}">Details</a>
                        <input type="checkbox" class="status" data-id="${p.id}" ${p.status === 'completed' ? 'checked' : ''}>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}
export function projectsLogic() {

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
