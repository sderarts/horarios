import db from '../../config/db.js';

const getAllSolicitudes = (callback) => {
    const q = ` SELECT *
            FROM 
                solicitud s
            JOIN 
                alumno a ON a.id_alumno = s.fk_alumno
            JOIN 
                tiposolicitud tp ON tp.id_tipo_solicitud = s.fk_tipo_solicitud
            JOIN 
                asignaturaseccion acc ON acc.id_asignatura_seccion = s.fk_seccion_asignatura
            JOIN 
                asignatura ag ON ag.id_asignatura = acc.fk_asignatura
            JOIN
                seccion scc ON scc.id_seccion = acc.fk_seccion;
    `;
    db.query(q, callback);
};
const getAllSolicitudes2 = (callback) => {
    const q = ` SELECT *
            FROM 
                solicitud ;
    `;
    db.query(q, callback);
};

const getSolicitudById = (id, callback) => {
    const query = 'SELECT * FROM solicitud WHERE id_solicitud = $1';

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
    const q = "INSERT INTO solicitud(`fk_alumno`, `fk_tipo_solicitud`, `fk_seccion_asignatura`) VALUES ($1, $2, $3)";

    // Ejecutamos el query para insertar la solicitud
    db.query(q, [SolicitudData.fk_alumno, SolicitudData.fk_tipo_solicitud, SolicitudData.fk_seccion_asignatura], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            // Devolvemos el insertId para que el frontend lo pueda usar
            const id_solicitud = result.insertId;
            callback(null, { id_solicitud }); // Llamamos al callback con el id_solicitud
        }
    });
};


const deleteSolicitud = (id, callback) => {
    const q = "DELETE FROM solicitud WHERE id_solicitud = $1";
    db.query(q, [id], callback);
};

const updateSolicitud = (id, fk_alumno, fk_alumno_b, fk_tipo_solicitud, fk_seccion_asignatura, callback) => {
    const q = "UPDATE solicitud SET `fk_alumno` = $1, `fk_alumno_b` = $2, `fk_tipo_solicitud` = $3,  `fk_seccion_asignatura` = $4 WHERE id_solicitud = $5";
    db.query(q, [fk_alumno, fk_alumno_b, fk_tipo_solicitud, fk_seccion_asignatura, id], callback);
};


export default {
    getAllSolicitudes,
    getAllSolicitudes2,
    getSolicitudById,
    createSolicitud,
    deleteSolicitud,
    updateSolicitud
};