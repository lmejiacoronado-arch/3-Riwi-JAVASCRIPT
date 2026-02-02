import { projectService } from "../../services/services.js";
import { store } from "../../state/store.js";

// --- VISTA: Estructura base de la página ---
export function yourOrderView() {
  return `
        <div class="orders-container">
            <header class="orders-header">
                <h1>My Orders</h1>
                <p>History of your purchases</p>
            </header>

            <div id="orders-target" class="orders-list">
                <p class="loading-msg">Fetching your orders...</p>
            </div>

            <footer class="orders-footer">
                <button onclick="window.location.hash = '#/menu'" class="btn-back-menu">
                    Back to Menu
                </button>
            </footer>
        </div>
    `;
}

// --- LÓGICA: Obtención de datos y mapeo ---
export async function yourOrderLogic() {
  const target = document.getElementById("orders-target");
  
  // Obtenemos el ID de forma segura desde el store
  const userId = store.user ? store.user.id : null;

  if (!userId) {
    target.innerHTML = `
        <div class="error-container">
            <p>Please log in to see your orders.</p>
            <button onclick="window.location.hash = '#/login'">Go to Login</button>
        </div>`;
    return;
  }

  try {
    // Llamada al servicio corregido
    const orders = await projectService.getOrdersByUserId(userId);

    if (!orders || orders.length === 0) {
      target.innerHTML = `<p class="empty-msg">You haven't made any orders yet.</p>`;
      return;
    }

    // Mapeo de las órdenes al HTML
    const ordersHtml = orders
      .reverse() // La más reciente primero
      .map((order) => `
        <div class="order-card">
            <div class="order-card-header">
                <span class="order-date">Date: ${order.createdAt}</span>
                <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-card-body">
                <ul class="order-items-list">
                    ${order.items.map((item) => `
                        <li>
                            <span class="item-qty">${item.quantity}x</span> 
                            <span class="item-name">${item.name}</span>
                            <span class="item-subtotal">$${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    `).join("")}
                </ul>
                <div class="order-divider"></div>
                <div class="order-total-row">
                    <span>Total Paid</span>
                    <strong>$${order.total.toFixed(2)}</strong>
                </div>
            </div>
        </div>
      `).join("");

    target.innerHTML = ordersHtml;

  } catch (error) {
    console.error("Error loading orders:", error);
    target.innerHTML = `<p class="error-msg">Failed to load orders. Please try again later.</p>`;
  }
}