import express from 'express';
const router = express.Router();
import * as asignaturaController from '../../controllers/asignaturas/asignaturaController.js';


router.get('/', asignaturaController.getAsignatura);
router.post('/', asignaturaController.addAsignatura);
router.delete('/:id', asignaturaController.deleteAsignatura);
router.put('/:id', asignaturaController.updateAsignatura);

export default router;