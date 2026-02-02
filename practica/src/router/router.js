import { store } from "../state/store.js";
import { render } from "../core/render.js";
import { projectService } from "../services/services.js";
import { loginView, loginLogic } from "../views/login.js";
import { registerView, registerLogic } from "../views/register.js";
import { eventsView, eventsLogic } from "../views/client/events.js";
import { chooseEventsView, chooseEventsLogic } from "../views/client/chooseEvents.js";
import { reservedLogic, reservedView } from "../views/client/reserved.js";
import { allEventsLogic, allEventsView } from "../views/admin/allEvents.js";
import { eventsReservedView, eventsReservedLogic } from "../views/admin/eventsReserved.js";

export async function router() {
  let hash = window.location.hash;

  const user = store.user;

  // Protección de rutas: Si no hay usuario y no está en login/register, mandarlo a login
  if (!user && hash !== "#/login" && hash !== "#/register") {
    window.location.hash = "#/login";
    return;
  }
  // Si ya hay usuario e intenta ir al login, mandarlo a la página principal
  if (user && hash === "#/login") {
    window.location.hash = user.role === "Client" ? "#/events" : "#/allEvents";
    return;
  }

  switch (hash) {
    case "#/login":
      render(loginView());
      await loginLogic();
      break;

    case "#/register":
      render(registerView());
      await registerLogic();
      break;

    case "#/events":
      const events = await projectService.getEvents();
      if (user.role == "Client") {
        render(eventsView(events));
        eventsLogic();
      }
      break;

    case "#/chooseEvents":
      if (user.role == "Client") {
        render(await chooseEventsView());
        await chooseEventsLogic();
      }
      break;

    case "#/reserved":
      if (user.role == "Client") {
        render(await reservedView());
        reservedLogic();
      }
      break;

    case "#/eventsReserved":
      if (user.role === "Admin") {
        const registrations = await projectService.getRegistrations();
        const events = await projectService.getEvents();
        render(await eventsReservedView(registrations, events));
        eventsReservedLogic();
      }
      break;

    case "#/allEvents":
      if (user.role === "Admin") {
        const allEvents = await projectService.getEvents();
        render(allEventsView(allEvents));
        allEventsLogic();
      }
      break;

    default:
      render(loginView());
      loginLogic();
      break;
  }
}
