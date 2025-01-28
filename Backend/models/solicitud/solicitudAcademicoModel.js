import db from '../../config/db.js';

const getAllAcademico_Solicitudes = (callback) => {
    const q = "SELECT * FROM SolicitudAcademico";
    db.query(q, callback);
};

const getSolicitud_AcademicoById = (id, callback) => {
    const query = 'SELECT * FROM SolicitudAcademico WHERE id_solicitud_academico = ?';

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
    const q = "INSERT INTO SolicitudAcademico(`fk_academico`,`fk_estado`, `fk_solicitud`, `mensaje`) VALUES (?,?,?,?)";
    db.query(q, [SolicitudAcademicoData.fk_academico, SolicitudAcademicoData.fk_estado, SolicitudAcademicoData.fk_solicitud, SolicitudAcademicoData.mensaje], callback);
};

const deleteSolicitud_Academico = (id, callback) => {
    const q = "DELETE FROM SolicitudAcademico WHERE id_solicitud_academico = ?";
    db.query(q, [id], callback);
};

const updateSolicitud_Academico = (id, fk_academico, fk_estado, fk_solicitud, mensaje, callback) => {
    const q = "UPDATE SolicitudAcademico SET `fk_academico` = ?, `fk_estado` = ?, `fk_solicitud` = ?, `mensaje` = ? WHERE id_solicitud_academico = ?";
    db.query(q, [fk_academico, fk_estado, fk_solicitud, mensaje, id], callback);
};


const obtenerDatosDeSolicitud = (id_solicitud) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT s.fk_alumno, s.fk_seccion_asignatura, s.fk_alumno_b 
            FROM solicitud s
            WHERE s.id_solicitud = ?`;
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
            WHERE a.id_alumno IN (?, ?)`;
        db.query(query, [id_alumno_1, id_alumno_2], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const intercambiarSecciones = async (id_solicitud, new_seccion_alumno_b) => {
    try {
        // 1. Obtener la solicitud y los datos de los alumnos
        const solicitud = await obtenerDatosDeSolicitud(id_solicitud);
        const { fk_alumno, fk_alumno_b, fk_seccion_asignatura } = solicitud;

        // 2. Obtener las secciones actuales de ambos alumnos
        const secciones = await obtenerSeccionesDeAlumnos(fk_alumno, fk_alumno_b);
        const seccionAlumno = secciones.find(seccion => seccion.id_alumno === fk_alumno);
        const seccionAlumnoB = secciones.find(seccion => seccion.id_alumno === fk_alumno_b);

        // Asegurarse de que las secciones se hayan encontrado correctamente
        if (!seccionAlumno || !seccionAlumnoB) {
            throw new Error('No se encontraron las secciones de los alumnos');
        }

        // 3. Realizar el intercambio de secciones
        const query1 = `
            UPDATE horarioalumno
            SET fk_seccion_asignatura = ?
            WHERE fk_alumno = ?`;

        const query2 = `
            UPDATE horarioalumno
            SET fk_seccion_asignatura = ?
            WHERE fk_alumno = ?`;

        db.query(query1, [seccionAlumnoB.fk_seccion_asignatura, fk_alumno], (err) => {
            if (err) throw err;
            db.query(query2, [new_seccion_alumno_b, fk_alumno_b], (err) => {
                if (err) throw err;
            });
        });
    } catch (error) {
        console.error("Error al intercambiar las secciones:", error);
        throw error;  // Lanza el error para manejarlo en el controlador
    }
};

export default {
    getAllAcademico_Solicitudes,
    getSolicitud_AcademicoById,
    createSolicitud_Academico,
    deleteSolicitud_Academico,
    updateSolicitud_Academico,
    obtenerDatosDeSolicitud,
    obtenerSeccionesDeAlumnos,
    intercambiarSecciones,
};