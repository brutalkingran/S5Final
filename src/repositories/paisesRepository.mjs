// capa de persistencia
// interfaz crud
// implementacion crud de pais. SEPARA LÓGICA DE ACCESO DE BASE DE DATOS
// actúa como un intermediario entre la base de datos y la lógica de la aplicación
// 3)

import paises from "../models/Paises.mjs";
import IRepository from "./IRepository.mjs";

class paisesRepository extends IRepository {
    async obtenerTodos() {
        return await paises.find({});
    }

    async crearPais( nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador ) {
        return await superHeroe.insertOne( {
            nombreSuperHeroe: nombreSuperHeroe,
            nombreReal: nombreReal,
            edad: edad,
            planetaOrigen: planetaOrigen,
            debilidad: debilidad,
            poderes: poderes,
            aliados: aliados,
            enemigos: enemigos,
            creador: creador
        });
    };

    async editarPais( id, datosActualizados ) {
        return await superHeroe.findByIdAndUpdate( id, datosActualizados, { new: true }); // devuelve documento actualizado
    }

    async borrarPais( nombre ) {
        return await superHeroe.findOneAndDelete ({
            nombreSuperHeroe : nombre
        })
    }
}

export default new SuperHeroeRepository();
