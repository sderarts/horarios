import db from '../../config/db.js';

const getAllAcademico_Solicitudes = (callback) => {
    const q = "SELECT * FROM SolicitudAcademico";
    db.query(q, callback);
};

const getSolicitud_AcademicoById = (id, callback) => {
    const query = 'SELECT * FROM SolicitudAcademico WHERE id_solicitud_academico = $1';

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('Sección no encontrada'), null); // Error si no se encuentra la sección
        }

        return callback(null, result[0]); // Retorna el primer resultado
    });
};


const createSolicitud_Academico = (SolicitudAcademicoData, callback) => {
    const q = "INSERT INTO SolicitudAcademico(`fk_academico`,`fk_estado`, `fk_solicitud`, `mensaje`) VALUES ($1,$2,$3,$4)";
    db.query(q, [SolicitudAcademicoData.fk_academico, SolicitudAcademicoData.fk_estado, SolicitudAcademicoData.fk_solicitud, SolicitudAcademicoData.mensaje], callback);
};

const deleteSolicitud_Academico = (id, callback) => {
    const q = "DELETE FROM SolicitudAcademico WHERE id_solicitud_academico = $1";
    db.query(q, [id], callback);
};

const updateSolicitud_Academico = (id, fk_academico, fk_estado, fk_solicitud, mensaje, callback) => {
    const q = "UPDATE SolicitudAcademico SET `fk_academico` = $1, `fk_estado` = $2, `fk_solicitud` = $3, `mensaje` = $4 WHERE id_solicitud_academico = $5";
    db.query(q, [fk_academico, fk_estado, fk_solicitud, mensaje, id], callback);
};


const obtenerDatosDeSolicitud = (id_solicitud) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT s.fk_alumno, s.fk_seccion_asignatura, s.fk_alumno_b 
            FROM solicitud s
            WHERE s.id_solicitud = $1`;
        db.query(query, [id_solicitud], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result[0]);
        });
    });
};

const obtenerSeccionesDeAlumnos = (id_alumno_1, id_alumno_2) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT h.fk_seccion_asignatura, a.id_alumno
            FROM horarioalumno h
            JOIN alumno a ON a.id_alumno = h.fk_alumno
            WHERE a.id_alumno IN ($1, $2)`;
        db.query(query, [id_alumno_1, id_alumno_2], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const obtenerIdHorario = (fk_alumno, fk_seccion_asignatura, callback) => {
    const query = "SELECT id_horario FROM HorarioAlumno WHERE fk_alumno = $1 AND fk_seccion_asignatura = $2";
    db.query(query, [fk_alumno, fk_seccion_asignatura], callback);
};





export default {
    getAllAcademico_Solicitudes,
    getSolicitud_AcademicoById,
    createSolicitud_Academico,
    deleteSolicitud_Academico,
    updateSolicitud_Academico,
    obtenerDatosDeSolicitud,
    obtenerSeccionesDeAlumnos,
    obtenerIdHorario,
};