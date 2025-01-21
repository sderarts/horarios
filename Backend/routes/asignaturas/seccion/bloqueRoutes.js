import express from 'express';
const router = express.Router();
import * as bloqueController from '../../../controllers/asignaturas/seccion/bloqueController.js';


router.get('/', bloqueController.getAllBloques);
router.get('/:id', bloqueController.getBloqueById);
router.post('/', bloqueController.addBloque);
router.delete('/:id', bloqueController.deleteBloque);
router.put('/:id', bloqueController.updateBloque);

export default router;