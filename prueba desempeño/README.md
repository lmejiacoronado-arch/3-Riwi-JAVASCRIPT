Documentación del Proyecto: Sistema de Gestión de Tareas

Introducción
Este proyecto consiste en una aplicación web tipo SPA (Single Page Application) diseñada para la administración de tareas. El sistema permite una interacción fluida entre usuarios con rol de Empleado y manager, gestionando de forma dinámica las tareas mediante una arquitectura modular basada en componentes y un enrutador personalizado.

## Español

### Descripción
Una herramienta eficiente para la asignación y seguimiento de labores. Los Managers pueden crear, editar y eliminar tareas, mientras que los empleados pueden visualizar sus pendientes y marcarlos como completados en tiempo real.

### Características Principales
- **Autenticación Completa:** Sistema de Login y Registro con persistencia en `localStorage`.
- **Control de Acceso (RBAC):** Vistas y funcionalidades diferenciadas según el rol del usuario.
- **Gestión de Tareas (CRUD):** 
  - **Managers:** Panel completo para crear, listar, editar y borrar tareas vinculadas a empleados específicos.
  - **Employees:** Listado personalizado de tareas asignadas con opción de finalización.
- **Arquitectura Limpia:** Separación clara entre servicios de API, lógica de vistas y estado global.
- **Interfaz Moderna:** Diseño responsivo con una estética profesional y limpia.

### Tecnologías Utilizadas
- **JavaScript (ES6+):** Módulos, Async/Await, Fetch API.
- **HTML5 & CSS3:** Variables personalizadas y Flexbox/Grid.
- **JSON Server:** Utilizado como backend falso para persistencia de datos.

---

## English

### 🚀 Description
An efficient tool for task assignment and tracking. Managers can create, edit, and delete tasks, while employees can view their pending duties and mark them as completed in real-time.

### Key Features
- **Full Authentication:** Login and Registration system with `localStorage` persistence.
- **Role-Based Access Control (RBAC):** Distinct views and functionalities based on the user's role.
- **Task Management (CRUD):**
  - **Managers:** Comprehensive dashboard to create, list, edit, and delete tasks linked to specific employees.
  - **Employees:** Personalized list of assigned tasks with a completion option.
- **Clean Architecture:** Clear separation between API services, view logic, and global state.
- **Modern Interface:** Responsive design with a professional and clean aesthetic.

### Technologies Used
- **JavaScript (ES6+):** Modules, Async/Await, Fetch API.
- **HTML5 & CSS3:** Custom variables and Flexbox/Grid.
- **JSON Server:** Used as a mock backend for data persistence.





¿Cómo funciona el código? (Explicación Técnica)

El proyecto está construido bajo el patrón de Single Page Application (SPA), lo que significa que la página nunca se recarga por completo; solo cambia el contenido del contenedor principal.

1. El Sistema de Rutas (Router & Render)

    router.js: Es el cerebro de la aplicación. Escucha el hash de la URL (ej. #/dashboard) y decide qué vista cargar. Incluye una protección de rutas: si no hay un usuario en el store, te redirige automáticamente al login.
    render.js: Es el motor que "dibuja" el HTML. Recibe una vista y la inyecta en el DOM. Además, gestiona la navegación dinámica: si eres "Manager" te muestra un menú, y si eres "Employee" te muestra otro.

2. Gestión de Estado (store.js)

    Utiliza un objeto global para mantener la sesión del usuario activa durante la navegación. Para que la sesión no se pierda al refrescar (F5), el código sincroniza el estado con el localStorage del navegador.

3. Capa de Servicios (services.js)

    Centraliza todas las peticiones a la API (usando fetch).
    Maneja métodos CRUD (Create, Read, Update, Delete) para interactuar con el servidor (JSON Server).
    Incluye lógica asíncrona (async/await) para asegurar que los datos lleguen antes de intentar renderizarlos.

4. Vistas y Lógica Separada
Cada módulo (Login, Dashboard, Profile) se divide en dos partes:

    View (HTML): Funciones que devuelven un Template String con la estructura HTML y las clases de CSS necesarias.
    Logic (JS): Funciones que se ejecutan después del renderizado para capturar eventos (click, submit), manipular el DOM o llamar a los servicios.

5. Diferenciación de Roles

    Manager: El código le permite acceder a formularios de creación mediante FormData y ver una tabla global con todas las tareas asignadas a los empleados.
    Employees: El sistema filtra la base de datos de tareas (tasks.filter(t => t.userId == sessionUser.id)) para mostrarle únicamente lo que le corresponde, permitiéndole actualizar el estado de "Pendiente" a "Completada" mediante un método PUT.




Technical Explanation (English)

1. Routing & Rendering
The router.js acts as the application's brain, monitoring URL hash changes. It features Route Guarding, ensuring unauthenticated users are redirected to the Login page. The render.js engine dynamically injects HTML into the DOM and toggles the navigation bar based on the user's role.

2. State Management
The store.js manages the current user's session, persisting data in localStorage to ensure the session remains active even after a browser refresh.

3. Service Layer
The services.js file abstracts all API interactions using the Fetch API. It performs full CRUD operations asynchronously, handling communication with the backend.

4. Role-Based Logic

    Manager Logic: Grants access to task creation forms and global oversight of all employees' activities.
    Employee Logic: Implements data filtering to display only user-specific tasks and allows status updates (e.g., marking tasks as "Completed") via PUT requests.


Setup & Run

Install
git clone https://github.com/stivenmoscoso/Crudzaso.git
cd Crudzaso
npm install

2) Start JSON Server (API)
Bash

npx json-server --watch db.json --port 3000

API:

http://localhost:3000/users
http://localhost:3000/tasks

3) Start Open Live Server

Open: http://localhost:5500