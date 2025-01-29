// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as usuarioController from '../../controllers/usuarios/usuarioController.js'


router.get('/alumnos', usuarioController.getAllAlumnos);
router.get('/academicos', usuarioController.getAllAcademicos);

export default router;