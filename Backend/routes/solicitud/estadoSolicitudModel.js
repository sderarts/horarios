// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as estadoSolicitudController from '../../controllers/solicitud/estadoSolicitudModel.js'


router.get('/', estadoSolicitudController.getAllEstados_Solicitudes);
router.get('/:id', estadoSolicitudController.getEstado_SolicitudById);
router.post('/', estadoSolicitudController.addEstado_Solicitud);
router.delete('/:id', estadoSolicitudController.deleteEstado_Solicitud);
router.put('/:id', estadoSolicitudController.updateEstado_Solicitud);

export default router;