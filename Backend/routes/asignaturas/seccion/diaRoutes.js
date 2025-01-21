import express from 'express';
const router = express.Router();
import * as diaController from '../../../controllers/asignaturas/seccion/diaController.js';


router.get('/', diaController.getAllDias);
router.get('/:id', diaController.getDiaById);
router.post('/', diaController.addDia);
router.delete('/:id', diaController.deleteDia);
router.put('/:id', diaController.updateDia);

export default router;