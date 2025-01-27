// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as horarioAlumnoController from '../../controllers/horario/horarioAlumnoController.js'


router.get('/', horarioAlumnoController.getAllHorarios_Alumnos);
router.get('/:id', horarioAlumnoController.getHorario_AlumnoById);
router.post('/', horarioAlumnoController.addHorario_Alumno);
router.delete('/:id', horarioAlumnoController.deleteHorario_Alumno);
router.put('/:id', horarioAlumnoController.updateHorario_Alumno);
router.get('/horario_alumnos/check/:fk_alumno/:fk_seccion_asignatura', (req, res) => {
    const { fk_alumno, fk_seccion_asignatura } = req.params;
    const query = "SELECT * FROM horarioalumno WHERE fk_alumno = ? AND fk_seccion_asignatura = ?";
    db.query(query, [fk_alumno, fk_seccion_asignatura], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar la inscripción', error: err });
        }
        if (results.length > 0) {
            return res.json({ exists: true });  // Ya está inscrito
        }
        return res.json({ exists: false });  // No está inscrito
    });
});

export default router;