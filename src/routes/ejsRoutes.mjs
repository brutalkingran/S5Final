import express from "express";
import { crearPaisFormularioController, editarPaisFormularioController, mostrarDashboardController, mostrarIndexController } from '../controllers/ejsController.mjs';

const router = express.Router();

// ejs
router.get('/', mostrarIndexController);
router.get('/dashboard', mostrarDashboardController); // obtenerTodosLosPaisesController
router.get('/addPais', crearPaisFormularioController);
router.get('/modifyPais/:id', editarPaisFormularioController);

export default router;