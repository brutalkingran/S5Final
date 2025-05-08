// Rutas de la API
// rutas API para paises
// 7)

import express from 'express';
import { crearPaisController, editarPaisController, borrarPaisController } from '../controllers/paisesController.mjs';
import { deleteByIdValidationRules, deleteByNameValidationRules, registerValidationRules, updateValidationRules } from '../validations/validationRules.mjs';
import { handleValidationErrors } from '../validations/errorMiddleware.mjs';

const router = express.Router();

// agregar
router.post('/pais/crear-pais', registerValidationRules(), handleValidationErrors, crearPaisController);
// editar
router.put('/pais/modificar-pais', updateValidationRules(), handleValidationErrors, editarPaisController);
// eliminar
router.delete('/pais/borrar/:id', deleteByIdValidationRules(), handleValidationErrors, borrarPaisIDController);

export default router;