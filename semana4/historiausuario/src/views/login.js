import { store, iniciarSesion } from "../store/store.js";

export function loginView(){
    const loginDiv = document.createElement("div");
    loginDiv.innerHTML = 
    `
    
    <form id="loginForm" action="">
        <input type="text" name="email" id="email" placeholder="admin@gmail.com">
        <input type="password" name="password" id="password" placeholder="*****">
        <button type="submit">iniciar sesion</button>
        <a href="#/register"> registro</a>
    </form>
    

    `

    const form = loginDiv.querySelector("#loginForm");
    const email = loginDiv.querySelector("#email");
    const password = loginDiv.querySelector("#password");

    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        validarLogin(email.value, password.value)

    })

    return loginDiv
}

function validarLogin(email,password){
    for (const user of store.users)
    {
        if (user.email === email && user.password === password)
            {
                location.hash = "#/home"
                console.log("usuario válido")
                iniciarSesion(email)
                
                return
            }
    }
    console.log("mama pinga")
}