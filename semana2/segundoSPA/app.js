const main = document.querySelector("#main");
function renderHome() {
    main.innerHTML = '<h1>Home</h1><p>Bienvenido a nuestra SPA</P>';
}
function renderServices() {
    main.innerHTML = '<h1>Services</h1><p>Fronted con JS</P>';
}
function renderContact() {
    main.innerHTML = '<h1>Contact</h1><p>contacto@gmail.com</P>';
}
function renderNotFound() {
    main.innerHTML = '<h1>404</h1><p>Pagina no encontrada</P>';
}

let counter = 0
function renderCounter(){
    main.innerHTML = `
    <h1>Counter</h1>
    <p>${counter}</p>
    <button id="counter">+</button>
    `;
    document.querySelector("#counter").onclick = () => {
        counter++;
        renderCounter();
};
};

function router() {
    const route = location.hash
    switch (route) {
        case '#home':
            renderHome();
            break;
        case '#services':
            renderServices();
            break;
        case '#contact':
            renderContact();
            break;
        case '#counter':
            renderCounter();
            break;
        default:
            renderNotFound();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);