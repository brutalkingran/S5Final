// controladores
// gestiona solicitudes HTTP, llamando servicios correspondientes y utilizando las vistas para presentar los datos
// 5)

import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, crearSuperheroe, actualizarSuperheroe, borrarSuperheroeID, borrarSuperheroeNombre } from "../services/paisesService.mjs";
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export const obtenerSuperheroePorIdController = async ( req, res ) => {
    try {
        const { id } = req.params; // parámetros URL
        const pais = await obtenerSuperheroePorId(id);

        if (!pais) {
            return res.status(404).send({
                mensaje: `país no encontrado`
            });
        }

        const superheroeFormateado = renderizarSuperheroe(pais);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al obtener el país`,
            error: error.mensaje
        });
    }
}

export const buscarSuperheroesPorAtributoController = async ( req, res ) => {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length === 0) {
            return res.status(404).send({
                mensaje: `No se encontraron superhéroes con este atributo`
            });
        }

        const superheroeFormateado = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al buscar lo/s país`,
            error: error.mensaje
        });
    }
}

export const obtenerSuperheroesMayoresDe30Controller = async ( req, res ) => {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();

        if (superheroes.length === 0) {
            return res.status(404).send({
                mensaje: `No se encontraron superhéroes mayores de 30 años`
            });
        }

        const superheroeFormateado = renderizarListaSuperheroes(superheroes);

        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al obtener superhéroes mayores de 30`,
            error: error.mensaje
        });
    }
}

export const crearSuperheroeController = async ( req, res ) => {
    try {
        const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador } = req.body;
        
        const superheroeFormateado = await crearSuperheroe( nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador );

        // res.status(201).json(superheroeFormateado); // 201 indica que se ha creado un recurso.
        res.redirect(`/dashboard`);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al crear país`,
            error: error.mensaje
        });
    }
}

export const actualizarSuperheroeController = async ( req, res ) => {
    try {
        const datosActualizados = req.body; // parámetros POST o PUT

        const superheroeModificado = await actualizarSuperheroe( datosActualizados.id, datosActualizados );

        // const superheroeFormateado = renderizarListaSuperheroes(superheroeModificado);

        // Codificamos el JSON para que pueda viajar en la URL
        // const superheroeString = encodeURIComponent(JSON.stringify(superheroeFormateado));

        // res.status(200).json(superheroeFormateado); // 200 indica actualización exitosa
        // res.redirect(`/api/heroes?cambio=${superheroeString}`); // Redirigir al dashboard después de la actualización
        // res.redirect(`/api/heroes`);
        res.redirect(`/dashboard`);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al actualizar país`,
            error: error.mensaje
        });
    }
}

export const borrarSuperheroeIDController = async ( req, res ) => {
    try {
        const { id } = req.params;

        const superheroeBorrado = await borrarSuperheroeID( id );

        res.status(200).json(superheroeBorrado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al eliminar país por ID`,
            error: error.mensaje
        });
    }
}

export const borrarSuperheroeNombreController = async ( req, res ) => {
    try {
        const { nombre } = req.params;

        const superheroeBorrado = await borrarSuperheroeNombre( nombre );

        res.status(200).json(superheroeBorrado); // 204 indica eliminación exitosa (no hay nada que devolver)
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al eliminar país por nombre de país`,
            error: error.mensaje
        });
    }
}
