// Rutas de la API
// rutas API para paises
// 7)

import express from 'express';
import { obtenerPaisPorIdController, buscarPaisesPorAtributoController, obtenerPaisesMayoresDe30Controller, crearPaisController, editarPaisController, borrarPaisIDController, borrarPaisNombreController } from '../controllers/paisesController.mjs';
import { deleteByIdValidationRules, deleteByNameValidationRules, registerValidationRules, updateValidationRules } from '../validations/validationRules.mjs';
import { handleValidationErrors } from '../validations/errorMiddleware.mjs';

const router = express.Router();

router.get('/heroes/mayores-30', obtenerPaisesMayoresDe30Controller);
router.post('/heroes/crear-heroe', registerValidationRules(), handleValidationErrors, crearPaisController);

router.get('/heroes/:id', obtenerPaisPorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarPaisesPorAtributoController);

router.put('/heroes/modificar-heroe', updateValidationRules(), handleValidationErrors, editarPaisController);

router.delete('/heroes/borrar-id/:id', deleteByIdValidationRules(), handleValidationErrors, borrarPaisIDController);
router.delete('/heroes/borrar-nombre/:nombre', deleteByNameValidationRules(), handleValidationErrors, borrarPaisNombreController);

export default router;