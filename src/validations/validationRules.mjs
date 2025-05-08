import { body, param } from 'express-validator';
import { formatearArray } from '../views/responseView.mjs';

export const deleteByIdValidationRules = () => [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio.')
        .isMongoId().withMessage('El ID debe ser un identificador válido de MongoDB.')
];

export const updateValidationRules = () => [
    body('nombrePais')
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

    // Nuevos campos para update
    body('nombreOficial')
        .optional()
        .trim()
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),

    body('capital')
        .optional()
        .isArray({ min: 1 }).withMessage('El campo "capital" debe ser un array no vacío.')
        .custom((arr) => {
            for (const cap of arr) {
                if (typeof cap !== 'string' || cap.trim().length < 3 || cap.trim().length > 90) {
                    throw new Error('Cada capital debe tener entre 3 y 90 caracteres.');
                }
            }
            return true;
        }),

    body('borders')
        .optional()
        .isArray().withMessage('El campo "borders" debe ser un array.')
        .custom((arr) => {
            for (const code of arr) {
                if (!/^[A-Z]{3}$/.test(code)) {
                    throw new Error('Cada código de frontera debe tener exactamente 3 letras mayúsculas.');
                }
            }
            return true;
        }),

    body('area')
        .optional()
        .isFloat({ min: 0 }).withMessage('El área debe ser un número positivo.'),

    body('population')
        .optional()
        .isInt({ min: 0 }).withMessage('La población debe ser un número entero positivo.'),

    body('gini')
        .optional()
        .custom((gini) => {
            if (typeof gini !== 'object' || Array.isArray(gini)) {
                throw new Error('El campo "gini" debe ser un objeto con valores entre 0 y 100.');
            }
            for (const val of Object.values(gini)) {
                if (typeof val !== 'number' || val < 0 || val > 100) {
                    throw new Error('Cada índice Gini debe estar entre 0 y 100.');
                }
            }
            return true;
        }),

    body('timezones')
        .optional()
        .isArray({ min: 1 }).withMessage('El campo "timezones" debe ser un array no vacío.')
        .custom((arr) => {
            if (!arr.every(tz => typeof tz === 'string')) {
                throw new Error('Cada zona horaria debe ser una cadena de texto.');
            }
            return true;
        }),
];

export const registerValidationRules = () => [
    body('nombrePais')
        .trim()
        .notEmpty().withMessage("Campo 'nombrePais' obligatorio.")
        .isLength({ min: 3, max: 60 }).withMessage('Ingrese un nombre de país válido con una longitud entre 3 y 60 caracteres.'),

    body('nombreReal')
        .notEmpty().withMessage("Campo 'nombreReal' obligatorio.")
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('Ingrese un nombre de país válido con una longitud entre 3 y 60 caracteres.'),

    body('edad')
        .notEmpty().withMessage("campo 'edad' obligatorio")
        .isInt({ min: 0 }).withMessage("Ingrese un número entero no negativo."),

    body('debilidad')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('Ingrese debilidad de país válido con una longitud entre 3 y 60 caracteres.'),

    body('creador')
        .notEmpty().withMessage("Campo 'creador' obligatorio.")
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('Ingrese creador de país válido con una longitud entre 3 y 60 caracteres.'),

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

    // Nuevos campos para register
    body('nombreOficial')
        .notEmpty().withMessage("Campo 'nombreOficial' obligatorio.")
        .trim()
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),

    body('capital')
        .isArray({ min: 1 }).withMessage('El campo "capital" debe ser un array no vacío.')
        .custom((arr) => {
            for (const cap of arr) {
                if (typeof cap !== 'string' || cap.trim().length < 3 || cap.trim().length > 90) {
                    throw new Error('Cada capital debe tener entre 3 y 90 caracteres.');
                }
            }
            return true;
        }),

    body('borders')
        .optional()
        .isArray().withMessage('El campo "borders" debe ser un array.')
        .custom((arr) => {
            for (const code of arr) {
                if (!/^[A-Z]{3}$/.test(code)) {
                    throw new Error('Cada código de frontera debe tener exactamente 3 letras mayúsculas.');
                }
            }
            return true;
        }),

    body('area')
        .optional()
        .isFloat({ min: 0 }).withMessage('El área debe ser un número positivo.'),

    body('population')
        .optional()
        .isInt({ min: 0 }).withMessage('La población debe ser un número entero positivo.'),

    body('gini')
        .optional()
        .custom((gini) => {
            if (typeof gini !== 'object' || Array.isArray(gini)) {
                throw new Error('El campo "gini" debe ser un objeto con valores entre 0 y 100.');
            }
            for (const val of Object.values(gini)) {
                if (typeof val !== 'number' || val < 0 || val > 100) {
                    throw new Error('Cada índice Gini debe estar entre 0 y 100.');
                }
            }
            return true;
        }),

    body('timezones')
        .isArray({ min: 1 }).withMessage('El campo "timezones" debe ser un array no vacío.')
        .custom((arr) => {
            if (!arr.every(tz => typeof tz === 'string')) {
                throw new Error('Cada zona horaria debe ser una cadena de texto.');
            }
            return true;
        }),
];
