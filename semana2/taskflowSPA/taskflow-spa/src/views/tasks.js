export function listTask() {
    const tareas = JSON.parse(localStorage.getItem("misTareas") || "[]");
    return `
    <fieldset>
        <legend>Lista de Tareas</legend>
        ${tareas.map((t, i) => `
            <div class="hijo">
                <input class="check" type="checkbox" data-index="${i}" ${t.estado === "completado" ? "checked" : ""}>
                <input type="text" value="${t.texto}" readonly>
                <input type="text" value="${t.estado}" readonly>
            </div>
        `).join("")}
    </fieldset>
    `;
}

export function checkbox() {
    const checks = document.querySelectorAll(".check");

    checks.forEach(check => {
        check.addEventListener("change", e => {
            const index = e.target.dataset.index;
            const tareas = JSON.parse(localStorage.getItem("misTareas"));

            const nuevoEstado = e.target.checked ? "completado" : "pendiente";
            tareas[index].estado = nuevoEstado;

            const entradas = e.target.parentElement.querySelectorAll("input");
            entradas[2].value = nuevoEstado;

            localStorage.setItem("misTareas", JSON.stringify(tareas));
        });
    });
}



