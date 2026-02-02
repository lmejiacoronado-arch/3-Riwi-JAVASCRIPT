import { store } from "../state/store.js";
import { render } from "../core/render.js";
import { loginView, loginLogic } from "../views/login.js";
import { registerView, registerLogic } from "../views/register.js";
import { menuLogic, menuView } from "../views/client/menu.js";
import { projectService } from "../services/services.js";
import { placeOrdersLogic, placeOrdersView } from "../views/client/placeOrders.js";
import { yourOrderView, yourOrderLogic } from "../views/client/yourOrders.js";
import { adminDashboardView, adminDashboardLogic } from "../views/admin/dashboard.js";
import { adminInventoryView, adminInventoryLogic } from "../views/admin/inventory.js";

export async function router() {
  let hash = window.location.hash;

  const user = store.user;

  if (!user && hash !== "#/login" && hash !== "#/register") {
    window.location.hash = "#/login";
    return;
  }
  if (user && hash === "#/login") {
    window.location.hash = "#/menu";
    return;
  }

  switch (hash) {
    case "#/login":
      render(loginView());
      loginLogic();
      break;

    case "#/register":
      render(registerView());
      registerLogic();
      break;

    case "#/menu":
      const products = await projectService.getMenu();
      if (user.role == "Client") {
        render(menuView(products));
        menuLogic();
        break;
      }

    case "#/placeOrders":
      if (user.role == "Client") {
        render(placeOrdersView());
        placeOrdersLogic();
        break;
      }

    case "#/yourOrders":
      if (user.role == "Client") {
        render(yourOrderView());
        yourOrderLogic();
        break;
      }

    case "#/dashboard":
      if (user.role === "admin") {
        render(adminDashboardView());
        adminDashboardLogic();
      } else {
        window.location.hash = "#/login"; // Si es cliente, lo sacamos de aquí
      }
      break;

    case "#/inventory":
      if (user.role === "admin") {
        render(adminInventoryView());
        adminInventoryLogic();
      } else {
        window.location.hash = "#/dashboard";
      }
      break;

    default:
      render(loginView());
      loginLogic();
      break;
  }
}
