const form = document.querySelector("#form")

form.addEventListener('submit', () => {
    const data = new FormData(form);
    const producto = data.get('producto');
    const precio = data.get('precio');
})

