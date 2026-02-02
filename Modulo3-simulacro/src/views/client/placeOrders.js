import { projectService } from "../../services/services.js";
import { store } from "../../state/store.js";

export function placeOrdersView() {
  const card = JSON.parse(localStorage.getItem("carr")) || [];

  // Creamos la variable de las cartas aquí arriba
  const cardsita = card
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
            </div>
            <div class="cart-item-controls">
                <div class="cart-quantity-box">
                    <button class="qty-btn" data-id="${item.id}">-</button>
                    <span class="qty-number">${item.quantity || 1}</span>
                    <button class="qty-btn" data-id="${item.id}">+</button>
                </div>
                <button class="cart-remove-link" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `,
    )
    .join("");

  return `
    <div class="cart-card">
        <div class="cart-header">
            <h2>Your Order</h2>
        </div>
        <div class="cart-scroll-area">
            ${cardsita}
        </div>
        <div class="cart-summary">
            <span>Total</span>
            <span class="cart-total-amount">$0.00</span>
        </div>
        <button class="cart-confirm-btn">Confirm Order</button>
    </div>
    `;
}

export async function placeOrdersLogic() {
  const card = document.querySelector(".cart-card");
  // Usamos 'let' para poder vaciar el array después de la compra
  let pedidoActual = JSON.parse(localStorage.getItem("carr")) || [];

  const actualizar = () => {
    const total = pedidoActual.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0,
    );
    const totalElement = document.querySelector(".cart-total-amount");
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem("carr", JSON.stringify(pedidoActual));
  };

  actualizar();

  // Evento para botones +, - y Remove
  card.addEventListener("click", async (e) => {
    // 1. PRIMER ESCUDO: Si el elemento no tiene data-id, ignoramos el clic
    const idTarget = e.target.dataset.id;
    if (!idTarget) return;

    // 2. SEGUNDO ESCUDO: Buscamos el índice y verificamos que exista
    const index = pedidoActual.findIndex((item) => item.id == idTarget);
    if (index === -1) return;

    // Buscamos el contenedor del item para actualizar la vista localmente
    const contenedor = e.target.closest(".cart-item");
    const contadorVista = contenedor.querySelector(".qty-number");
    const precioVista = contenedor.querySelector(".cart-item-price");

    // --- LÓGICA DE AUMENTAR ---
    if (e.target.textContent === "+") {
      pedidoActual[index].quantity = (pedidoActual[index].quantity || 1) + 1;

      // Actualizamos la interfaz
      if (contadorVista)
        contadorVista.textContent = pedidoActual[index].quantity;
      if (precioVista)
        precioVista.textContent = `$${(pedidoActual[index].price * pedidoActual[index].quantity).toFixed(2)}`;

      actualizar();
    }

    // --- LÓGICA DE DISMINUIR ---
    if (
      e.target.textContent === "-" &&
      (pedidoActual[index].quantity || 1) > 1
    ) {
      pedidoActual[index].quantity -= 1;

      if (contadorVista)
        contadorVista.textContent = pedidoActual[index].quantity;
      if (precioVista)
        precioVista.textContent = `$${(pedidoActual[index].price * pedidoActual[index].quantity).toFixed(2)}`;

      actualizar();
    }

    // --- LÓGICA DE ELIMINAR ---
    if (e.target.textContent.toLowerCase() === "remove") {
      pedidoActual.splice(index, 1);
      contenedor.remove();
      actualizar();
    }
  });

  // Lógica del Botón Confirmar
  const btnConfirmar = document.querySelector(".cart-confirm-btn");
  btnConfirmar.addEventListener("click", async () => {
    if (pedidoActual.length === 0) return alert("Tu carrito está vacío.");

    // Obtenemos el ID del usuario del store de forma segura
    const idDelUsuario = store.user ? store.user.id : null;
    const nombreDelUsuario = store.user ? store.user.name : "Cliente Anónimo";

    const nuevaOrden = {
      userId: idDelUsuario,
      userName: nombreDelUsuario,
      // Mapeamos los items para asegurar que tengan cantidad 1 si vienen undefined
      items: pedidoActual.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      })),
      total: pedidoActual.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0,
      ),
      status: "pending",
      createdAt: new Date().toLocaleString(),
    };

    try {
      await projectService.postOrder(nuevaOrden);
      alert("¡Orden enviada con éxito!");
      localStorage.removeItem("carr");
      window.location.hash = "#/yourOrders";
    } catch (error) {
      alert("No se pudo enviar la orden. Inténtalo de nuevo.");
    }
  });
}
