
export function projectsView(proyecto) {

    return `
    <h2>Tus proyectos</h2>
    <div class="grid">
    ${proyecto.map(p => `
        <div class="card">
            <a href="#/projects-details/${p.id}">
                <h3>${p.name}</h3>
            </a>
            <input type="checkbox" class="status" data-id="${p.id}" ${p.status === 'completed' ? 'completed' : 'pending'}>
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
        check.addEventListener('change', (e) => {
            const id = e.target.getAttribute('data-id');
            // Usamos .checked para obtener el estado booleano
            const isDone = e.target.checked;

            if (isDone) {
                checks.textContent = "completed";
            } else {
                console.log(`Proyecto ${id} marcado como pendiente ⏳`);
                // Aquí podrías llamar a: projectService.updateStatus(id, 'pending')
            }
        });
    });
}
