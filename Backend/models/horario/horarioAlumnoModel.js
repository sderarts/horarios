import db from '../../config/db.js';

const getAllHorarios_Alumnos = (callback) => {
    const q = "SELECT * FROM HorarioAlumno";
    db.query(q, callback);
};

const getHorario_AlumnoById = (id, callback) => {
    const query = `SELECT *
            FROM 
                HorarioAlumno h
            JOIN
                AsignaturaSeccion a ON h.fk_seccion_asignatura = a.id_asignatura_seccion
            JOIN
                Seccion s ON a.fk_seccion = s.id_seccion
            JOIN
                Asignatura ai ON a.fk_asignatura = ai.id_asignatura
            WHERE 
                h.fk_alumno = ?;
            `;

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('No se encontraron horarios para el alumno'), null); // Error si no se encuentra
        }

        return callback(null, result); // Devuelve todos los resultados
    });
};



const createHorario_Alumno = (Horario_AlumnoData, callback) => {
    const q = "INSERT INTO HorarioAlumno( `fk_alumno`, `fk_seccion_asignatura`) VALUES (?, ?)";
    db.query(q, [Horario_AlumnoData.fk_alumno, Horario_AlumnoData.fk_seccion_asignatura], callback);
};

const deleteHorario_Alumno = (id, callback) => {
    const q = "DELETE FROM HorarioAlumno WHERE id_horario = ?";
    db.query(q, [id], callback);
};

const updateHorario_Alumno = (id, fk_seccion_asignatura, fk_alumno, callback) => {
    const q = "UPDATE HorarioAlumno SET `fk_seccion_asignatura` = ?, `fk_alumno` = ? WHERE id_horario = ?";
    db.query(q, [fk_seccion_asignatura, fk_alumno, id], callback);
};

export default {
    getAllHorarios_Alumnos,
    getHorario_AlumnoById,
    createHorario_Alumno,
    deleteHorario_Alumno,
    updateHorario_Alumno
};