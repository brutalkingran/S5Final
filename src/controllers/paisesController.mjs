// controladores
// gestiona solicitudes HTTP, llamando servicios correspondientes y utilizando las vistas para presentar los datos
// 5)

import { obtenerPaisPorId, obtenerTodosLosPaises, buscarPaisesPorAtributo, obtenerPaisesMayoresDe30, crearPais, editarPais, borrarPaisID, borrarPaisNombre } from "../services/paisesService.mjs";
import { renderizarPais, renderizarListaPaises } from '../views/responseView.mjs';

export const obtenerPaisPorIdController = async ( req, res ) => {
    try {
        const { id } = req.params; // parámetros URL
        const pais = await obtenerPaisPorId(id);

        if (!pais) {
            return res.status(404).send({
                mensaje: `país no encontrado`
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

export const obtenerPaisesMayoresDe30Controller = async ( req, res ) => {
    try {
        const paises = await obtenerPaisesMayoresDe30();

        if (paises.length === 0) {
            return res.status(404).send({
                mensaje: `No se encontraron paises mayores de 30 años`
            });
        }

        const paisFormateado = renderizarListaPaises(paiss);

        res.status(200).json(paisFormateado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al obtener paises mayores de 30`,
            error: error.mensaje
        });
    }
}

export const crearPaisController = async ( req, res ) => {
    try {
        const { nombrePais, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador } = req.body;
        
        const paisFormateado = await crearPais( nombrePais, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador );

        res.redirect(`/dashboard`);
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

        const paisBorrado = await borrarPaisID( id );

        res.status(200).json(paisBorrado);
    } catch (error) {
        res.status(500).send({
            mensaje: `Error al eliminar país por ID`,
            error: error.mensaje
        });
    }
}