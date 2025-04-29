import { body, param } from 'express-validator';
import { formatearArray } from '../views/responseView.mjs';

export const deleteByIdValidationRules = () => [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio.')
        .isMongoId().withMessage('El ID debe ser un identificador válido de MongoDB.')
];

export const deleteByNameValidationRules = () => [
    param('nombre')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre debe tener entre 3 y 60 caracteres.')
];

export const updateValidationRules = () => [
    body('nombreSuperHeroe')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('Ingrese un nombre de país válido con una longitud entre 3 y 60 caracteres.'),

    body('nombreReal')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('Ingrese un nombre real válido con una longitud entre 3 y 60 caracteres.'),

    body('edad')
        .optional()
        .isInt({ min: 0 }).withMessage("Ingrese un número entero no negativo."),

    body('debilidad')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('Ingrese una debilidad válida entre 3 y 60 caracteres.'),

    body('creador')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('Ingrese un creador válido entre 3 y 60 caracteres.'),

    body('poderes')
        .optional()
        .customSanitizer(formatearArray)
        .custom((poderes) => {
            if (poderes.length === 0) {
                throw new Error('El campo "poderes" debe contener por lo menos un poder.');
            }
            const poderesLimpios = poderes.map(poder => poder.trim());
            for (const poder of poderesLimpios) {
                if (typeof poder !== 'string' || poder.length < 3 || poder.length > 60) {
                    throw new Error("Cada poder debe ser una cadena de texto con una longitud entre 3 y 60 caracteres.");
                }
            }
            return true;
        }),

    body('aliados')
        .optional()
        .customSanitizer(formatearArray)
        .custom((aliados) => {
            if (aliados.length === 0) {
                throw new Error('El campo "aliados" debe contener por lo menos un aliado.');
            }
            const aliadosLimpios = aliados.map(aliado => aliado.trim());
            for (const aliado of aliadosLimpios) {
                if (typeof aliado !== 'string' || aliado.length < 3 || aliado.length > 60) {
                    throw new Error("Cada aliado debe ser una cadena de texto con una longitud entre 3 y 60 caracteres.");
                }
            }
            return true;
        }),

    body('enemigos')
        .optional()
        .customSanitizer(formatearArray)
        .custom((enemigos) => {
            if (enemigos.length === 0) {
                throw new Error('El campo "enemigos" debe contener por lo menos un enemigo.');
            }
            const enemigosLimpios = enemigos.map(enemigo => enemigo.trim());
            for (const enemigo of enemigosLimpios) {
                if (typeof enemigo !== 'string' || enemigo.length < 3 || enemigo.length > 60) {
                    throw new Error("Cada enemigo debe ser una cadena de texto con una longitud entre 3 y 60 caracteres.");
                }
            }
            return true;
        }),
];


export const registerValidationRules = () => [
    // nombrePais debe validarse que sea requerido, no tenga espacios en blanco(trim), una longitud minima de 3 caracteres y una longitud maxima de 60
    body('nombreSuperHeroe')
        .trim() // nota: trim valida que sean strings
        .notEmpty().withMessage("Campo 'nombrePais' obligatorio.")
        .isLength({ min : 3, max : 60}).withMessage('Ingrese un nombre de país válido con una longitud entre 3 y 60 caracteres.'),

    // nombreReal debe validarse que sea requerido, no tenga espacios en blanco(trim), una longitud minima de 3 caracteres y una longitud maxima de 60
    body('nombreReal')
        .notEmpty().withMessage("Campo 'nombreReal' obligatorio.")
        .trim()
        .isLength({ min : 3, max : 60}).withMessage('Ingrese un nombre de país válido con una longitud entre 3 y 60 caracteres.'),

    //  edad debe validarse que sea requerido, que sea un numero, no tenga espacios en blanco(trim), valor minimo 0 (no admite edad negativa)
    body('edad') // nota: trim no es necesario en int
        .notEmpty().withMessage("campo 'edad' obligatorio")
        .isInt({ min: 0 }).withMessage("Ingrese un número entero no negativo."),

    body('debilidad')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min : 3, max : 60}).withMessage('Ingrese debilidad de país válido con una longitud entre 3 y 60 caracteres.'),

    body('creador')
        .notEmpty().withMessage("Campo 'creador' obligatorio.")
        .trim()
        .isLength({ min : 3, max : 60}).withMessage('Ingrese creador de país válido con una longitud entre 3 y 60 caracteres.'),

    //  poderes debe validarse que sea requerido, que sea un array de string cuyo tamaño no sea 0, cada elemento no tenga espacios en blanco, cada elemento una longitud minima de 3 caracteres y una longitud maxima de 60
    body('poderes')
        .optional()
        .customSanitizer(formatearArray)
        .custom((poderes) => {
            if (poderes.length === 0) {
                throw new Error('El campo "poderes" debe contener por lo menos un poder.');
            }

            const poderesLimpios = poderes.map(poder => poder.trim());

            for (const poder of poderesLimpios) {
                if (typeof poder !== 'string' || poder.length < 3 || poder.length > 60) {
                    throw new Error("Cada poder debe ser una cadena de texto con una longitud entre 3 y 60 caracteres.");
                }
            }

            return true;
        }),

    body('aliados')
        .optional()
        .customSanitizer(formatearArray)
        .custom((aliados) => {
            if (aliados.length === 0) {
                throw new Error('El campo "aliados" debe contener por lo menos un aliado.');
            }

            const aliadosLimpios = aliados.map(aliado => aliado.trim());

            for (const aliado of aliadosLimpios) {
                if (typeof aliado !== 'string' || aliado.length < 3 || aliado.length > 60) {
                    throw new Error("Cada aliado debe ser una cadena de texto con una longitud entre 3 y 60 caracteres.");
                }
            }

            return true;
        }),

    body('enemigos')
        .optional()
        .customSanitizer(formatearArray)
        .custom((enemigos) => {
            if (enemigos.length === 0) {
                throw new Error('El campo "enemigos" debe contener por lo menos un enemigo.');
            }

            const enemigosLimpios = enemigos.map(enemigo => enemigo.trim());

            for (const enemigo of enemigosLimpios) {
                if (typeof enemigo !== 'string' || enemigo.length < 3 || enemigo.length > 60) {
                    throw new Error("Cada enemigo debe ser una cadena de texto con una longitud entre 3 y 60 caracteres.");
                }
            }

            return true;
        }),
];