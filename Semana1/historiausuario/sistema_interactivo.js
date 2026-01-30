const prompt = require('prompt-sync')();

// const nombre = prompt("Ingresa tu nombre: ");
// let edadInput = prompt("Ingresa tu edad: ");
// let edad = Number(edadInput)

// let mensaje = `Hola ${nombre}, tienes ${edad} años. `; 

function validarEdad(){
    const nombre = prompt("Ingresa tu nombre: ");
    while (true){
        
        let edadInput = prompt("Ingresa tu edad: ");
        let edad = Number(edadInput)
        mensaje = `Hola ${nombre}, tienes ${edad} años. `;

        if (isNaN(edad)){
            console.error("Error: solo debe ingresar numeros.");
            continue;
        }
        else if (edad <0 || edad > 80){
            console.error("Edad fuera de rango (0-80).");
            continue
        }
        else if (edad >= 18 && edad <= 80) {
            return mensaje += "Eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!";
        }
        else if (edad >= 0 && edad < 18) {
            return mensaje += "Eres menor de edad. BYE BYE."
        }
    }
}
const edadUsuario = validarEdad();
console.log(edadUsuario);


