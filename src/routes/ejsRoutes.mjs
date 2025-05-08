import express from "express";
import { crearPaisFormularioController, modificarPaisFormularioController, mostrarDashboardController, mostrarIndexController } from '../controllers/ejsController.mjs';

const router = express.Router();

// ejs
router.get('/', mostrarIndexController);
router.get('/dashboard', mostrarDashboardController); // obtenerTodosLosPaisesController
router.get('/addPais', crearPaisFormularioController);
router.get('/modifyPais/:id', modificarPaisFormularioController);

export default router;