// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as NivelAsignaturaController from '../../controllers/asignaturas/nivelAsignaturaController.js';


router.get('/', NivelAsignaturaController.getAllNiveles_Asignaturas);
router.get('/:id', NivelAsignaturaController.getNivel_AsignaturaById);
router.post('/', NivelAsignaturaController.addNivel_Asignatura);
router.delete('/:id', NivelAsignaturaController.deleteNivel_Asignatura);
router.put('/:id', NivelAsignaturaController.updateNivel_Asignatura);

export default router;