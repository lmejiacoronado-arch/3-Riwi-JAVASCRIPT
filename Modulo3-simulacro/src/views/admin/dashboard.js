import { projectService } from "../../services/services.js";

// --- VISTA: Estructura HTML ---
export function adminDashboardView() {
    return `
        <div class="admin-container">
            <header class="admin-header">
                <h1>Panel de Administración: Pedidos</h1>
                <div class="admin-stats">
                    <span>Total de Órdenes: <strong id="total-count">0</strong></span>
                </div>
            </header>

            <div class="table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="admin-orders-target">
                        <tr><td colspan="6">Cargando pedidos...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// --- LÓGICA: Comportamiento y Datos ---
export async function adminDashboardLogic() {
    const target = document.getElementById("admin-orders-target");
    const totalCount = document.getElementById("total-count");

    try {
        const orders = await projectService.getAllOrders();
        
        if (!orders || orders.length === 0) {
            target.innerHTML = `<tr><td colspan="6" class="no-data">No hay pedidos registrados.</td></tr>`;
            return;
        }

        totalCount.textContent = orders.length;

        // Mapeamos las filas. Usamos dos filas por cada orden: una visible y una oculta.
        target.innerHTML = orders.reverse().map(order => `
            <tr class="order-row-main" data-id="${order.id}" title="Haz clic para ver detalles">
                <td>#${order.id}</td>
                <td><strong>${order.userName || 'ID: ' + order.userId}</strong></td>
                <td>${order.createdAt}</td>
                <td>$${Number(order.total).toFixed(2)}</td>
                <td>
                    <span class="status-pill status-${order.status.toLowerCase()}">
                        ${order.status}
                    </span>
                </td>
                <td>
                    <select class="status-changer" data-id="${order.id}">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pendiente</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completado</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelado</option>
                    </select>
                </td>
            </tr>
            <tr id="details-${order.id}" class="order-details-row">
                <td colspan="6">
                    <div class="details-content">
                        <h4>Desglose del Pedido:</h4>
                        <ul class="items-list">
                            ${order.items.map(item => `
                                <li>
                                    <span>${item.quantity}x ${item.name}</span>
                                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </td>
            </tr>
        `).join('');

        // --- MANEJO DE EVENTOS (Delegación de eventos) ---
        target.addEventListener('click', async (e) => {
            // 1. Lógica para Expandir/Contraer
            const mainRow = e.target.closest('.order-row-main');
            // Si hizo clic en la fila pero NO en el select de cambiar estado
            if (mainRow && !e.target.classList.contains('status-changer')) {
                const orderId = mainRow.dataset.id;
                const detailsRow = document.getElementById(`details-${orderId}`);
                
                // Cerramos otros detalles abiertos (opcional, para limpieza)
                document.querySelectorAll('.order-details-row.active').forEach(row => {
                    if (row !== detailsRow) row.classList.remove('active');
                });

                detailsRow.classList.toggle('active');
            }
        });

        // 2. Lógica para cambiar el estado en la DB
        target.addEventListener('change', async (e) => {
            if (e.target.classList.contains('status-changer')) {
                const orderId = e.target.dataset.id;
                const nuevoEstado = e.target.value;

                const exito = await projectService.updateOrderStatus(orderId, nuevoEstado);
                
                if (exito) {
                    // Refrescamos la lógica para que cambien los colores y datos
                    adminDashboardLogic();
                } else {
                    alert("No se pudo actualizar el estado.");
                }
            }
        });

    } catch (error) {
        console.error("Error en Dashboard:", error);
        target.innerHTML = `<tr><td colspan="6">Error de conexión con el servidor.</td></tr>`;
    }
}