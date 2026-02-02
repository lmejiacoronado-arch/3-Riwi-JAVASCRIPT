export function notFoundView(){
    const notFoundView = document.createElement("div");
    notFoundView.innerHTML = 
    `
        <h1> error 404, vista no encontrada <h1>
        <a href = "#/home"> regresar</a>
    
    `
    return notFoundView
}