export function profileView(user) {
    return `
        <div class="container">
            <div class="profile-card">
                <div class="profile-header">
                    <h1>Información de Cuenta</h1>
                </div>
                
                <div class="profile-details">
                    <div class="detail-group">
                        <label>ID de Usuario:</label>
                        <p>#${user.id}</p>
                    </div>
                    
                    <div class="detail-group">
                        <label>Nombre Completo:</label>
                        <p>${user.name}</p>
                    </div>

                    <div class="detail-group">
                        <label>Correo Electrónico:</label>
                        <p>${user.email}</p>
                    </div>

                    <div class="detail-group">
                        <label>Teléfono:</label>
                        <p>${user.phone || "No registrado"}</p>
                    </div>

                    <div class="detail-group">
                        <label>Rol en la empresa:</label>
                        <p><span class="role-tag">${user.role}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}


export async function profileLogic() {
    // Supongamos que recuperas el usuario del localStorage o de la API
    const user = JSON.parse(localStorage.getItem("user"));


    return `
        <div class="profile-container">
            <h1>Perfil de ${user.name}</h1>
            <p>ID: ${user.id}</p>
            <p>Email: ${user.email}</p>
            <p>Teléfono: ${user.phone || 'No asignado'}</p>
        </div>
    `;
}