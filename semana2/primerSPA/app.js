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

document.querySelector("#home").addEventListener('click', renderHome);
document.querySelector("#services").addEventListener('click', renderServices);
document.querySelector("#contact").addEventListener('click', renderContact);

renderHome();