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

    async crearPais( nombrePais, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador ) {
        return await pais.insertOne( {
            nombrePais: nombrePais,
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
        return await pais.findByIdAndUpdate( id, datosActualizados, { new: true }); // devuelve documento actualizado
    }

    async borrarPais( nombre ) {
        return await pais.findOneAndDelete ({
            nombrePais : nombre
        })
    }
}

export default new PaisRepository();
