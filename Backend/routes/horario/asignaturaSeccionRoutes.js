// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as AsignaturaSeccionController from '../../controllers/horario/asignaturaSeccionController.js'


router.get('/', AsignaturaSeccionController.getAllAsignaturas_Secciones);
router.get('/:id', AsignaturaSeccionController.getAsignatura_SeccionById);
router.get('/alumno/:id', AsignaturaSeccionController.getAsignatura_SeccionByAlumno);
router.post('/', AsignaturaSeccionController.addAsignatura_Seccion);
router.delete('/:id', AsignaturaSeccionController.deleteAsignatura_Seccion);
router.put('/:id', AsignaturaSeccionController.updateAsignatura_Seccion);

export default router;