import express from 'express';
const router = express.Router();
import * as asignaturaController from '../../controllers/asignaturas/asignaturaController.js';


router.get('/', asignaturaController.getAsignatura);
router.get('/secciones', asignaturaController.getAsignatura2);
router.get('/:id', asignaturaController.getAsignaturaById);
router.post('/', asignaturaController.addAsignatura);
router.delete('/:id', asignaturaController.deleteAsignatura);
router.put('/:id', asignaturaController.updateAsignatura);

export default router;