const main = document.querySelector("#main");

function navbar() {
    return `
        <nav>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
        </nav>
        `;
}
function home() {
    return '<h1>Home</h1><p>Bienvenido a nuestra SPA</P>';
}
function services() {
    return '<h1>Services</h1><p>Fronted con JS</P>';
}
function contact() {
    return '<h1>Contact</h1><p>contacto@gmail.com</P>';
}
function notFound() {
    return '<h1>404</h1><p>Pagina no encontrada</P>';
}

function render(views) {
    main.innerHTML = `
        ${navbar()}
        <section>
            ${views}
        </section>
    `;
}

function router() {
    const route = location.hash;
    switch (route) {
        case '#home':
            render(home());
            break;
        case '#services':
            render(services());
            break;
        case '#contact':
            render(contact());
            break;
        default:
            render(notFound());
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
