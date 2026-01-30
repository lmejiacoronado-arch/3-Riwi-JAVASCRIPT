import infUser from "../state/store.js";

export function newTask() {
    return `
    <form id="formulario-new">
        <fieldset>
            <legend>Agregar nueva tarea</legend>

            <label for="campo-tarea">Nueva tarea:</label>
            <input type="text" id="campo-tarea" placeholder="Escribe tu nueva tarea" name="tarea">

            <button type="submit">Agregar</button>
        </fieldset>
    </form>`;
}

export function initNewTask() {
    const form = document.querySelector("#formulario-new");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const texto = e.target.tarea.value;

        const tareas = JSON.parse(localStorage.getItem("misTareas") || "[]");
        tareas.push(infUser(texto));

        localStorage.setItem("misTareas", JSON.stringify(tareas));
        location.hash = "#tasks";
    });
}

