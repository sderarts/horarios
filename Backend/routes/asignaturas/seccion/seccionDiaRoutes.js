import express from 'express';
const router = express.Router();
import * as seccionDiaModel from '../../../controllers/asignaturas/seccion/seccionDiaController.js';


router.get('/', seccionDiaModel.getAllSecciones_Dias);
router.get('/:id', seccionDiaModel.getSeccion_DiaById);
router.post('/', seccionDiaModel.addSeccion_Dia);
router.delete('/:id', seccionDiaModel.deleteSeccion_Dia);
router.put('/:id', seccionDiaModel.updateSeccion_Dia);

export default router;