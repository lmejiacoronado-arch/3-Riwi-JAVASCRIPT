Documentación del Proyecto: Sistema de Gestión de Eventos
Introducción
Este proyecto consiste en una aplicación web tipo SPA (Single Page Application) diseñada para la administración y reserva de eventos. El sistema permite una interacción fluida entre usuarios con rol de Cliente y Administrador, gestionando de forma dinámica la disponibilidad de aforo y el registro de asistentes mediante una arquitectura modular basada en componentes y un enrutador personalizado.

Arquitectura de Software
La aplicación está construida bajo una estructura desacoplada que separa la lógica de negocio de la interfaz de usuario:

Core (Render): Motor encargado de inyectar el HTML dinámico en el DOM principal.

Router: Gestor de navegación que intercepta cambios en el hash de la URL para cargar las vistas correspondientes según el rol del usuario.

Services: Capa de comunicación que utiliza la API Fetch para interactuar con un servidor JSON. Implementa métodos HTTP para operaciones CRUD (Create, Read, Update, Delete).

State Management: Almacén persistente que mantiene la sesión del usuario y los datos globales de la aplicación.

Módulos del Sistema
1. Gestión de Administración (Admin)
El panel administrativo centraliza el control total sobre el inventario de eventos y la supervisión de clientes.

Control de Aforo Dinámico: El sistema calcula en tiempo real la disponibilidad mediante la diferencia entre la capacidad máxima y los asistentes registrados.

CRUD de Eventos: Interfaz para la creación, edición técnica y eliminación de registros de eventos.

Auditoría de Reservas: Visualización detallada de la lista de asistentes, permitiendo al administrador cancelar registros y restaurar automáticamente los cupos al inventario del evento.

2. Experiencia del Cliente (Client)
Interfaz optimizada para la consulta y confirmación de asistencia.

Catálogo de Eventos: Visualización de la oferta actual de eventos.

Motor de Reservas: Lógica de validación que restringe las reservas según el límite de capacidad restante, evitando el sobrecupo.

Flujo de Datos y Endpoints
La persistencia de datos se gestiona a través de una base de datos en formato JSON, interactuando con los siguientes puntos de acceso:
Acción	Método	Endpoint	Impacto en Datos
Registro de Usuario	POST	/users	Crea un nuevo perfil con rol específico.
Consulta de Eventos	GET	/events	Recupera la lista completa de eventos.
Actualización de Cupos	PATCH	/events/:id	Modifica únicamente el contador de asistentes.
Creación de Reserva	POST	/registrations	Genera un vínculo entre el usuario y el evento.
Cancelación	DELETE	/registrations/:id	Elimina el registro de asistencia.

Lógica de Integridad de Datos
Uno de los puntos críticos del sistema es la sincronización de cupos. Para garantizar que el contador no sea estático, se implementó un flujo de actualización bidireccional:

Al confirmar una reserva, el sistema suma la cantidad solicitada al campo de asistentes del evento.

Al cancelar una reserva (ya sea por el cliente o el administrador), se realiza una operación de resta sobre el total de asistentes actuales.

Se utiliza la función de seguridad matemática para prevenir que el conteo de asistentes resulte en números negativos.

Requisitos de Ejecución
Servidor de Datos: Requiere la ejecución de JSON Server para actuar como API REST.

Entorno: Navegador moderno con soporte para módulos de JavaScript (ES6+).

Sesión: El sistema depende del almacenamiento local (LocalStorage) para la persistencia del token de usuario y el control de rutas protegidas.





Documentación Técnica: Capa de Servicios (services.js)
La capa de servicios actúa como el adaptador de red de la aplicación, abstrayendo las peticiones asíncronas y garantizando que los datos enviados y recibidos cumplan con la estructura de la base de datos.

Métodos de Gestión de Usuarios
getUsers(): Realiza una petición GET para obtener la lista de usuarios registrados. Se utiliza principalmente durante el proceso de autenticación para validar credenciales.

postUser(user): Registra un nuevo objeto usuario en la base de datos. Se invoca desde la lógica de registro para crear perfiles con roles de "Client" o "Admin".

Métodos de Gestión de Eventos
getEvents(): Recupera el array completo de eventos. Incluye bloques de manejo de errores (try/catch) para retornar un array vacío en caso de fallo de conexión, evitando que la aplicación se bloquee.

getEventById(id): Consulta los detalles de un único evento. Es crítico para los procesos de edición y para validar la capacidad disponible antes de confirmar una reserva.

postEvent(event): Envía un nuevo objeto evento al servidor. Inicializa el contador de asistentes (attendees) en 0.

putEvent(id, eventData): Realiza una actualización integral del evento. Se utiliza en el panel de administración para modificar títulos, fechas o capacidades.

deleteEvent(id): Elimina permanentemente un evento del catálogo mediante el método DELETE.

updateEventAttendees(eventId, newTotal): Utiliza el método PATCH para modificar únicamente el atributo de asistentes. Esto optimiza el tráfico de red al no tener que enviar el objeto completo del evento durante una reserva.

Métodos de Gestión de Reservas (Registrations)
getRegistrations(): Obtiene el historial global de reservas. Permite al administrador realizar cruces de datos para identificar a los asistentes de cada evento.

postRegistration(registration): Almacena un registro de reserva que vincula el ID del usuario, el nombre del usuario, el ID del evento y la cantidad de cupos solicitados.

deleteRegistration(id): Elimina un registro de reserva específico. Se utiliza en los flujos de cancelación para limpiar la base de datos de registros inactivos.

Flujo de Integridad de la Reserva
Para asegurar que los datos sean consistentes, el sistema sigue una secuencia lógica de operaciones cuando se procesa una reserva o cancelación:

Validación: Se consulta el evento por ID para verificar la capacidad restante.

Persistencia del Registro: Se crea la entrada en el nodo /registrations.

Sincronización de Aforo: Se calcula el nuevo total de asistentes y se actualiza el nodo /events mediante un PATCH.

Este diseño desacoplado permite que, aunque se elimine un registro de reserva, el evento mantenga su integridad informativa, y viceversa, gestionando la nulidad de datos mediante validaciones en las vistas.