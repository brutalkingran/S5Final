// capa de persistencia
// interfaz crud
// implementacion crud de pais. SEPARA LÓGICA DE ACCESO DE BASE DE DATOS
// actúa como un intermediario entre la base de datos y la lógica de la aplicación
// 3)

import paises from "../models/Paises.mjs";
import IRepository from "./IRepository.mjs";

class PaisRepository extends IRepository {
    async obtenerTodos() {
        return await paises.find({});
    }

    async crearPais( nombreOficial, capital, borders, area, population, gini, timezones, creador ) {
        return await pais.insertOne({ name: { official: nombreOficial }, capital, borders, area, population, gini, timezones, creador });
    };

    async editarPais( id, datosActualizados ) {
        if (datosActualizados.nombreOficial) {
            datosActualizados["name"] = { official: datosActualizados.nombreOficial };
            delete datosActualizados.nombreOficial;
        }

        return await pais.findByIdAndUpdate( id, datosActualizados, { new: true }); // devuelve documento actualizado
    }

    async borrarPais(id) {
        return await Pais.findByIdAndDelete(id);
    }
}

export default new PaisRepository();
