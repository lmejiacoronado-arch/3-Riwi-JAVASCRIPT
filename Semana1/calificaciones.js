const estudiantes = [
    { nombre: 'Ana', calificaciones: [8, 9, 7] },
    { nombre: 'Bruno', calificaciones: [9, 9, 8] },
    { nombre: 'Carlos', calificaciones: [6, 7, 8] }
];

const promedio = estudiantes.map(e => ({nombre:e.nombre,  promedio: e.calificaciones.
    reduce((acomulador,actual) => acomulador+actual)/ e.calificaciones.length })).
    filter(e => e.promedio >=8)

console.log(promedio.sort());
console.log(promedio.reverse());


