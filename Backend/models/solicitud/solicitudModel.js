import db from '../../config/db.js';

const getAllSolicitudes = (callback) => {
    const q = "SELECT * FROM Solicitud";
    db.query(q, callback);
};

const getSolicitudById = (id, callback) => {
    const query = 'SELECT * FROM Solicitud WHERE id_solicitud = ?';

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


const createSolicitud = (SolicitudData, callback) => {
    const q = "INSERT INTO Solicitud(`id_solicitud`, `fk_alumno`, `fk_tipo_solicitud`, `fk_estado_solicitud`, `fk_seccion_asignatura`) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [SolicitudData.id_solicitud, SolicitudData.fk_alumno,
    SolicitudData.fk_tipo_solicitud, SolicitudData.fk_estado_solicitud,
    SolicitudData.fk_seccion_asignatura], callback);
};

const deleteSolicitud = (id, callback) => {
    const q = "DELETE FROM Solicitud WHERE id_solicitud = ?";
    db.query(q, [id], callback);
};

const updateSolicitud = (id, fk_asignatura, fk_alumno, fk_tipo_solicitud, fk_estado_solicitud, fk_seccion_asignatura, callback) => {
    const q = "UPDATE Solicitud SET `fk_asignatura` = ?, `fk_alumno` = ?, `fk_tipo_solicitud` = ? , `fk_seccion_asignatura`  = ?, `fk_seccion_asignatura` = ? WHERE id_solicitud = ?";
    db.query(q, [fk_asignatura, fk_alumno, fk_tipo_solicitud, fk_estado_solicitud, fk_seccion_asignatura, id], callback);
};

export default {
    getAllSolicitudes,
    getSolicitudById,
    createSolicitud,
    deleteSolicitud,
    updateSolicitud
};