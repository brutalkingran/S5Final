// Lógica de negocio. Llama a los repositorios para obtener datos y aplicar lógica adicional.
// Servicios de Superheroe
// 4)

import paisesRepository from "../repositories/paisesRepository.mjs";


export const obtenerTodosLosPaises = async () => {
    return await paisesRepository.obtenerTodos();
}

export const crearPais = async ( nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador ) => {
    return await paisesRepository.crearHeroe( nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador )
}

export const editarPais = async ( nombre, cambio ) => {
    return await paisesRepository.actualizarHeroe( nombre, cambio );
}

export const borrarPais = async ( id ) => {
    return await paisesRepository.borrarheroeID( id );
}
