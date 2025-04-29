// Lógica de negocio. Llama a los repositorios para obtener datos y aplicar lógica adicional.
// Servicios de pais
// 4)

import paisesRepository from "../repositories/paisesRepository.mjs";


export const obtenerTodosLosPaises = async () => {
    return await paisesRepository.obtenerTodos();
}

export const crearPais = async ( nombrePais, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador ) => {
    return await paisesRepository.crearHeroe( nombrePais, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador )
}

export const editarPais = async ( nombre, cambio ) => {
    return await paisesRepository.editarHeroe( nombre, cambio );
}

export const borrarPais = async ( id ) => {
    return await paisesRepository.borrarheroeID( id );
}
