import { store } from "../state/store.js";
import { render } from "../core/render.js";
import { projectService } from "../services/services.js";
import { loginView, loginLogic } from "../views/login.js";
import { registerView, registerLogic } from "../views/register.js";
import { getTasksView, getTasksLogic } from "../views/manager/dashboard.js";
import { createTasksView, createTasksLogic } from "../views/manager/createTask.js";
import { profileLogic, profileView } from "../views/manager/profile.js";
import { createEmployeeTasksView, createEmployeeTasksLogic } from "../views/employees/myTask.js";


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
    window.location.hash = user.role === "Employees" ? "#/myTask" : "#/dashboard";
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

    case "#/dashboard":
      const tasks = await projectService.getTasks();
      if (user.role == "Manager") {
        render(await getTasksView(tasks));
        getTasksLogic();
      }
      break;

    case "#/createTask":
      const task = await projectService.getTasks();
      if (user.role == "Manager") {
        render(await createTasksView(task));
        createTasksLogic();
      }
      break;

    case "#/profile":
      const userSession = JSON.parse(localStorage.getItem("user"));
      const datos = await projectService.getUserById(userSession.id);
      if (userSession) {
        render(profileView(datos));
        profileLogic();
      }
      break;

    case "#/myTask":
      const sessionUser = JSON.parse(localStorage.getItem("user"));
      const allTasks = await projectService.getTasks();
      // Solo las tareas donde userId coincida con el id del empleado logueado
      const employeeTasks = allTasks.filter(t => t.userId == sessionUser.id);
      if (sessionUser.role === "Employees") {
        // Pasamos solo sus tareas a la vista
        render(createEmployeeTasksView(employeeTasks));
        createEmployeeTasksLogic();
      }
      break;

    default:
      render(loginView());
      loginLogic();
      break;
  }
}
