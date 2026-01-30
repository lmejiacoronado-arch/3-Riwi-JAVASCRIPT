export let estado = {
    homeUsuario: ""
};

export function setUsuario(nombre) {
    estado.homeUsuario = nombre;
}

export default function infUser(texto) {
    return {
        texto: texto,
        estado: "pendiente"
    };
}
