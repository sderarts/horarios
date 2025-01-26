import db from '../../config/db.js';

const getEstados_Solicitudes = (callback) => {
    const q = "SELECT * FROM EstadoSolicitud";
    db.query(q, callback);
};

const getEstado_SolicitudById = (id, callback) => {
    const query = 'SELECT * FROM EstadoSolicitud WHERE id_estado = ?';

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

export default {
    getEstados_Solicitudes,
    getEstado_SolicitudById
};