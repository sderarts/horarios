import express from 'express';
const router = express.Router();
import * as diaBloqueModel from '../../../controllers/asignaturas/seccion/diaBloqueController.js';


router.get('/', diaBloqueModel.getAllDias_Bloques);
router.get('/:id', diaBloqueModel.getDia_BloqueById);
router.post('/', diaBloqueModel.addDia_Bloque);
router.delete('/:id', diaBloqueModel.deleteDia_Bloque);
router.put('/:id', diaBloqueModel.updateDia_Bloque);

export default router;