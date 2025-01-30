// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as horarioAlumnoController from '../../controllers/horario/horarioAlumnoController.js'


router.get('/', horarioAlumnoController.getAllHorarios_Alumnos);
router.get('/:id', horarioAlumnoController.getHorario_AlumnoById);
router.get('/horario/:id', horarioAlumnoController.getHorarioById);
router.post('/', horarioAlumnoController.addHorario_Alumno);
router.delete('/:id', horarioAlumnoController.deleteHorario_Alumno);
// router.put('/:id', horarioAlumnoController.updateHorario_Alumno);
router.put('/:fk_alumno/:id_horario', horarioAlumnoController.updateHorario_Alumno)
router.put('/:fk_alumno_b/:id_horario', horarioAlumnoController.updateHorario_Alumnob)

// router.put('/intercambiar', horarioAlumnoController.intercambiarSecciones);
export default router;