import { body, param } from 'express-validator';
import { formatearArray, parsearGini } from '../views/responseView.mjs';

export const deleteByIdValidationRules = () => [
    param('id')
        .notEmpty().withMessage('El ID es obligatorio.')
        .isMongoId().withMessage('El ID debe ser un identificador válido de MongoDB.')
];

export const updateValidationRules = () => [
    body('nombreOficial')
        .optional()
        .trim()
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),

    body('capital')
        .optional()
        .customSanitizer(formatearArray)
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
        .customSanitizer(formatearArray)
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
        .optional({ checkFalsy: true })
        .isFloat({ min: 0 }).withMessage('El área debe ser un número positivo.'),

    body('population')
        .optional()
        .custom(value => { // Chequea si campo 'population' cuente con un número o undefined
            if (value === undefined || value === null || value === '' || value === 0) {
                return true; // no validar si está vacío
            }
            const parsed = parseInt(value, 10);
            if (isNaN(parsed) || parsed < 0) {
                throw new Error('La población debe ser un número entero positivo.');
            }
            return true;
        }),


    body('gini')
        .optional({ checkFalsy: true })
        .customSanitizer(parsearGini)
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
        .optional({ checkFalsy: true })
        .customSanitizer(formatearArray)
        .isArray({ min: 1 }).withMessage('El campo "timezones" debe ser un array no vacío.')
        .custom((arr) => {
            if (!arr.every(tz => typeof tz === 'string')) {
                throw new Error('Cada zona horaria debe ser una cadena de texto.');
            }
            return true;
        }),
];

export const registerValidationRules = () => [
    body('nombreOficial')
        .notEmpty().withMessage("Campo 'nombreOficial' obligatorio.")
        .trim()
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),

    body('capital')
        .customSanitizer(formatearArray)
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
        .customSanitizer(formatearArray)
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
        .customSanitizer(parsearGini)
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
        .customSanitizer(formatearArray)
        .isArray({ min: 1 }).withMessage('El campo "timezones" debe ser un array no vacío.')
        .custom((arr) => {
            if (!arr.every(tz => typeof tz === 'string')) {
                throw new Error('Cada zona horaria debe ser una cadena de texto.');
            }
            return true;
        }),
];
