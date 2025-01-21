// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as solicitudController from '../../controllers/solicitud/solicitudController.js'


router.get('/', solicitudController.getAllSolicitudes);
router.get('/:id', solicitudController.getSolicitudById);
router.post('/', solicitudController.addSolicitud);
router.delete('/:id', solicitudController.deleteSolicitud);
router.put('/:id', solicitudController.updateSolicitud);

export default router;