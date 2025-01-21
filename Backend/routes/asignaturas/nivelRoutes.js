import express from 'express';
const router = express.Router();
import * as nivelController from '../../controllers/asignaturas/nivelController.js';


router.get('/', nivelController.getNiveles);
router.post('/', nivelController.addNivel);
router.delete('/:id', nivelController.deleteNivel);
router.put('/:id', nivelController.updateNivel);

export default router;