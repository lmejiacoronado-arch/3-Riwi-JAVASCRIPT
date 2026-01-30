// Seleccionamos usando getElementById y querySelector

const input = document.getElementById('noteInput');
const botonAgregar = document.querySelector('#btnAdd');
const lista = document.getElementById('listaNotas');
const contador = document.getElementById('noteCounter');
const emptyState = document.getElementById('emptyState');
const btnClearAll = document.getElementById('btnClearAll'); // Seleccionamos el botón de limpiar todo

// Loggear referencias para confirmar
console.log("Elementos seleccionados:", { input, botonAgregar, lista });

// Arreglo en memoria para persistencia
let notas = [];

// Función para guardar en Local Storage
function guardarEnStorage() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

// Función para actualizar la UI (Contador y mensaje vacío)
function actualizarInterfaz() {
    contador.textContent = notas.length;
    emptyState.style.display = notas.length === 0 ? "block" : "none";
}

// Agregar notas al DOM
function agregarNota() {
    const texto = input.value.trim();

    // Validación
    if (texto === "") {
        alert("El campo no puede estar vacío");
        return;
    }

    // Crear <li> y Botón Eliminar
    const li = document.createElement('li');
    li.className = "list-group-item";
    
    // Usar textContent para el texto
    const span = document.createElement('span');
    span.textContent = texto;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.color = "red";

    // Eliminar notas
    btnEliminar.onclick = () => {
        lista.removeChild(li); // Remueve desde la <ul>
        notas = notas.filter(n => n !== texto); // Actualiza arreglo
        guardarEnStorage(); // Actualiza Storage
        actualizarInterfaz();
        console.log("Se eliminó la nota de la lista.");
    };

    // Insertar elementos
    li.appendChild(span);
    li.appendChild(btnEliminar);
    lista.appendChild(li);

    // Persistencia
    notas.push(texto);
    guardarEnStorage();
    actualizarInterfaz();

    // Limpiar y enfocar
    input.value = "";
    input.focus();
    console.log("Se agregó la nota correctamente.");
}

// Carga inicial desde Local Storage
window.onload = () => {
    const notasGuardadas = localStorage.getItem("notas");
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        console.log(`Se cargaron ${notas.length} notas.`);
        
        // Renderizar cada una
        notas.forEach(nota => {
            const li = document.createElement('li');
            li.className = "list-group-item";
            
            // Corregido: Usar span con textContent para evitar problemas de seguridad
            const span = document.createElement('span');
            span.textContent = nota;

            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = "Eliminar";
            btnEliminar.style.color = "red";
            
            btnEliminar.onclick = () => {
                lista.removeChild(li);
                notas = notas.filter(n => n !== nota);
                guardarEnStorage();
                actualizarInterfaz();
                console.log("Nota eliminada.");
            };

            li.appendChild(span);
            li.appendChild(btnEliminar);
            lista.appendChild(li);
        });
    }
    actualizarInterfaz();
};

// Evento Click
botonAgregar.addEventListener('click', agregarNota);

// FUNCIÓN PARA ELIMINAR TODO EL TABLERO
function eliminarTodo() {
    // Validar si hay algo que borrar para evitar alertas innecesarias
    if (notas.length === 0) {
        alert("No hay notas para eliminar.");
        return;
    }

    // Confirmación del usuario
    if (confirm("¿Estás seguro de que quieres eliminar TODAS las notas?")) {
        
        // Limpiar el arreglo en memoria
        notas = []; 

        // Limpiar el DOM
        // Buscamos todos los elementos LI que hemos agregado
        const elementosLi = lista.querySelectorAll('.list-group-item');
        
        elementosLi.forEach(li => {
            lista.removeChild(li); // Eliminamos cada nota una por una del DOM
        });

        // Sincronizar con Local Storage y actualizar interfaz
        guardarEnStorage();
        actualizarInterfaz();
        
        console.log("Se han eliminado todas las notas del DOM y del Storage.");
    }
}

// Asignar el evento al botón
btnClearAll.addEventListener('click', eliminarTodo);

// Soporte para tecla Enter (opcional pero recomendado para la tarea)
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarNota();
});