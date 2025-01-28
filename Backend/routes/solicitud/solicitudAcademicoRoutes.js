// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as SolicitudAcademicoController from '../../controllers/solicitud/solicitudAcademicoController.js'


router.get('/', SolicitudAcademicoController.getAllAcademico_Solicitudes);
router.get('/:id', SolicitudAcademicoController.getSolicitud_AcademicoById);
router.post('/', SolicitudAcademicoController.addSolicitud_Academico);
router.delete('/:id', SolicitudAcademicoController.deleteSolicitud_Academico);
router.put('/:id', SolicitudAcademicoController.updateSolicitud_Academico);

router.put('/intercambiar/:id', SolicitudAcademicoController.intercambiarSecciones);

export default router;