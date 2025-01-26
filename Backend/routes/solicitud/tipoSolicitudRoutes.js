// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as tipoSolicitudController from '../../controllers/solicitud/tipoSolicitudController.js'


router.get('/', tipoSolicitudController.getTipos_Solicitudes);
router.get('/:id', tipoSolicitudController.getTipos_Solicitudes);


export default router;