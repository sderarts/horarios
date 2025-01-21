// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as carreraNivelController from '../../controllers/asignaturas/carreraNivelController.js';


router.get('/', carreraNivelController.getAllCarreras_Niveles);
router.get('/:id', carreraNivelController.getCarrera_NivelById);
router.post('/', carreraNivelController.addCarrera_Nivel);
router.delete('/:id', carreraNivelController.deleteCarrera_Nivel);
router.put('/:id', carreraNivelController.updateCarrera_Nivel);

export default router;