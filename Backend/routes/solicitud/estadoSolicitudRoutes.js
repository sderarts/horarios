// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as estadoSolicitudController from '../../controllers/solicitud/estadoSolicitudController.js'


router.get('/', estadoSolicitudController.getEstados_Solicitudes);
router.get('/:id', estadoSolicitudController.getEstado_SolicitudById);


export default router;