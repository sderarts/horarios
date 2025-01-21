import db from '../../config/db.js';

const getAllEstados_EstadoSolicitudes = (callback) => {
    const q = "SELECT * FROM EstadoSolicitud";
    db.query(q, callback);
};

const getEstado_SolicitudById = (id, callback) => {
    const query = 'SELECT * FROM EstadoSolicitud WHERE id_estado_solicitud = ?';

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


const createEstado_Solicitud = (EstadoSolicitudData, callback) => {
    const q = "INSERT INTO EstadoSolicitud(`id_estado_solicitud`, `fk_academico`,`nombreEstado`,`mensajeSolicitud`) VALUES (?, ?)";
    db.query(q, [EstadoSolicitudData.id_estado_solicitud, EstadoSolicitudData.fk_academico,
    EstadoSolicitudData.nombreEstado, EstadoSolicitudData.mensajeSolicitud], callback);
};

const deleteEstado_Solicitud = (id, callback) => {
    const q = "DELETE FROM EstadoSolicitud WHERE id_estado_solicitud = ?";
    db.query(q, [id], callback);
};

const updateEstado_Solicitud = (id, fk_academico, nombreEstado, mensajeSolicitud, callback) => {
    const q = "UPDATE EstadoSolicitud SET `fk_academico` = ? `nombreEstado` = ?, `mensajeSolicitud` = ? WHERE id_estado_solicitud = ?";
    db.query(q, [fk_academico, nombreEstado, mensajeSolicitud, id], callback);
};

export default {
    getAllEstados_EstadoSolicitudes,
    getEstado_SolicitudById,
    createEstado_Solicitud,
    deleteEstado_Solicitud,
    updateEstado_Solicitud
};