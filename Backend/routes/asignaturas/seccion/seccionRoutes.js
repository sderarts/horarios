import express from 'express';
const router = express.Router();
import * as seccionController from '../../../controllers/asignaturas/seccion/seccionController.js';


router.get('/', seccionController.getAllSecciones);
router.get('/:id', seccionController.getSeccionById);
router.post('/', seccionController.addSeccion);
router.delete('/:id', seccionController.deleteSeccion);
router.put('/:id', seccionController.updateSeccion);
router.put('/inscripciones/:id', seccionController.updateInscripcion);

export default router;