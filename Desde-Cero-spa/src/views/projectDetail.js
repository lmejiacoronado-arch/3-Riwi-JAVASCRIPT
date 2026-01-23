export function projectDetailsView(p) {
    // Si el proyecto no llegó o es null, mostramos error
    if (!p) return `<h2>Proyecto no encontrado</h2>`;

    return `        
        <div>
            <button onclick="window.location.hash = '#projects'">⬅ Volver a la lista</button>
            
            <h3>${p.name}</h3>            
            <div class="info">
                <p><strong>Details:</strong> ${p.details}</p> 
            </div>
        </div>
    `;
};

