import db from '../../config/db.js';

const getTipos_Solicitudes = (callback) => {
    const q = "SELECT * FROM TipoSolicitud";
    db.query(q, callback);
};

const getTipo_SolicitudById = (id, callback) => {
    const query = 'SELECT * FROM TipoSolicitud WHERE id_tipo_solicitud = $1';

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
    getTipos_Solicitudes,
    getTipo_SolicitudById
};