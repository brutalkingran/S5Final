// controladores
// gestiona solicitudes HTTP, llamando servicios correspondientes y utilizando las vistas para presentar los datos
// 5)

import { mostrarTodosLosPaises, crearPais, editarPais, borrarPais } from "../services/paisesService.mjs";
import { renderizarPais } from '../views/responseView.mjs';

export const mostrarTodosLosPaisesController = async ( req, res ) => {
    try {
        const pais = await mostrarTodosLosPaises(id);

        if (!pais) {
            return res.status(404).send({
                mensaje: `No se encontraron países`
            });
        }

        const paisFormateado = renderizarPais(pais);
        res.status(200).json(paisFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al obtener el país`,
            error: error.mensaje
        });
    }
}

export const crearPaisController = async ( req, res ) => {
    try {
        const { name, capital, borders, area, population, gini, timezones, creador } = req.body;

        const paisFormateado = await crearPais({ name, capital, borders, area, population, gini, timezones, creador });

        res.redirect(`/dashboard`, paisFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al crear país`,
            error: error.mensaje
        });
    }
}

export const editarPaisController = async ( req, res ) => {
    try {
        const datosActualizados = req.body; // parámetros POST o PUT

        const paisModificado = await editarPais( datosActualizados.id, datosActualizados );

        res.redirect(`/dashboard`);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al editar país`,
            error: error.mensaje
        });
    }
}

export const borrarPaisController = async ( req, res ) => {
    try {
        const { id } = req.params;

        const paisBorrado = await borrarPais( id );

        res.status(200).json(paisBorrado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al eliminar país`,
            error: error.mensaje
        });
    }
}