// const producto1 = {
//     id: 1,
//     nombre: "Celular Samsung",
//     precio: 1500,
//     stock: 5,
// };

// const producto2 = {
//     id: 2,
//     nombre: "Laptop Dell",
//     precio: 3000,
//     stock: 8,
// };

// const producto3 = {
//     id: 3,
//     nombre: "PC Gaming",
//     precio: 5000,
//     stock: 10,
// };

// ---------------------------------------

// ---------------------------------------
// SECCIÓN: SET (Estructuras de datos únicos)
// ---------------------------------------

const numerosRep = [1,2,3,4,5,1,2,6,7,8,8,5,6,]
console.log(numerosRep);

// Creación de un Set a partir de un Array para filtrar duplicados automáticamente
const numerosUni = new Set(numerosRep);
console.log(numerosUni);

// Uso del método .add() para insertar un nuevo elemento al Set
numerosUni.add(9)
console.log(numerosUni);

// Uso del método .has() para verificar la existencia de un elemento (retorna true/false)
console.log(numerosUni.has(9));

// Uso del método .delete() para eliminar un elemento de la estructura
numerosUni.delete()
console.log(numerosUni);

/**
 * TASK 4: Iteración sobre Set
 * Uso de for...of para recorrer los valores únicos del Set
 */
for (const numeros of numerosUni) {
    console.log(numeros);
};

// ---------------------------------------
// SECCIÓN: OBJETOS (Definición de productos)
// ---------------------------------------

const producto1 = {
    id: 1,
    nombre: "Celular Samsung",
    precio: 1500,
    stock: 5,
};

const producto2 = {
    id: 2,
    nombre: "Laptop Dell",
    precio: 3000,
    stock: 8,
};

const producto3 = {
    id: 3,
    nombre: "PC Gaming",
    precio: 5000,
    stock: 10,
};

/**
 * TASK 4: Iteración sobre Objetos
 * Uso de for...in para listar todas las propiedades (claves) y sus valores
 */
console.log("--- Propiedades del Objeto ---");
for (const propiedad in producto1) {
    console.log(`${propiedad}: ${producto1[propiedad]}`);
}

// ---------------------------------------
// SECCIÓN: MAP (Pares clave-valor)
// ---------------------------------------

const mapProductos = new Map();

// Uso del método .set() para asignar una clave a un objeto producto
mapProductos.set( "id", producto1);
mapProductos.set("Portatiles", producto2); 
mapProductos.set("Escritorio", producto3);

console.log(mapProductos);
console.log(mapProductos.get("Smartphones").precio);

/**
 * TASK 4: Iteración sobre Map
 * Uso de forEach() para recorrer claves y valores de forma descriptiva
 */
console.log("--- Recorrido del Map ---");
mapProductos.forEach((valor, clave) => {
    console.log(`Clave: ${clave} | Producto: ${valor.nombre} | Precio: ${valor.precio}`);
});

// ---------------------------------------
// TASK 5: VALIDACIÓN Y PRUEBAS
// ---------------------------------------

/**
 * Función de Validación
 * Verifica que el producto cuente con id, nombre y precio válidos
 */
function validarProducto(producto) {
    const { id, nombre, precio } = producto;
    
    if (typeof id === 'number' && 
        typeof nombre === 'string' && nombre.trim() !== "" && 
        typeof precio === 'number' && precio > 0) {
        return true;
    }
    return false;
}

// Ejecución de pruebas de validación
console.log("--- Resultados de Validación ---");
const productosParaValidar = [producto1, producto2, producto3];

productosParaValidar.forEach(p => {
    if (validarProducto(p)) {
        console.log(`Producto "${p.nombre}" es válido.`);
    } else {
        console.log(`Producto con ID ${p.id} no cumple los requisitos.`);
    }
});

/**
 * Pruebas finales de impresión de estructuras
 */
console.log("--- Pruebas de Estructuras ---");
// Lista completa de objetos
console.log("Lista Objetos:", producto1, producto2, producto3);

// Set de productos únicos
const setDeProductos = new Set([producto1, producto2, producto3]);
console.log("Prueba Set:", setDeProductos);

// Categorías y nombres desde el Map
console.log("Categorías en Map:");
mapProductos.forEach((p, cat) => {
    console.log(`Categoría: ${cat} -> Nombre: ${p.nombre}`);
});