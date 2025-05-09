import express from "express";
import { crearPaisFormularioController, modificarPaisFormularioController, mostrarDashboardController, mostrarIndexController } from '../controllers/ejsController.mjs';

const router = express.Router();

// rutas ejs
router.get('/', mostrarIndexController);
router.get('/dashboard', mostrarDashboardController);
router.get('/addPais', crearPaisFormularioController);
router.get('/modifyPais/:id', modificarPaisFormularioController);

export default router;