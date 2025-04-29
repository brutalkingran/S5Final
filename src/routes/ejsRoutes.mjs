import express from "express";
import { crearSuperHeroeFormularioController, modificarSuperheroeFormularioController, mostrarDashboardController, mostrarIndexController } from '../controllers/ejsController.mjs';

const router = express.Router();

// ejs
router.get('/', mostrarIndexController);
router.get('/dashboard', mostrarDashboardController); // obtenerTodosLosSuperheroesController
router.get('/addSuperhero', crearSuperHeroeFormularioController);
router.get('/modifyHero/:id', modificarSuperheroeFormularioController);

export default router;