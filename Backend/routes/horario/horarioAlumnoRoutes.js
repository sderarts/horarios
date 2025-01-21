// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as horarioAlumnoController from '../../controllers/horario/horarioAlumnoController.js'


router.get('/', horarioAlumnoController.getAllHorarios_Alumnos);
router.get('/:id', horarioAlumnoController.getHorario_AlumnoById);
router.post('/', horarioAlumnoController.addHorario_Alumno);
router.delete('/:id', horarioAlumnoController.deleteHorario_Alumno);
router.put('/:id', horarioAlumnoController.updateHorario_Alumno);

export default router;