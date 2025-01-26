import db from '../../config/db.js';

const getAllSolicitudes = (callback) => {
    const q = ` SELECT *
            FROM 
                Solicitud s
            JOIN 
                Alumno a ON a.id_alumno = s.fk_alumno
            JOIN 
                TipoSolicitud tp ON tp.id_tipo_solicitud = s.fk_tipo_solicitud
            JOIN 
                AsignaturaSeccion acc ON acc.id_asignatura_seccion = s.fk_seccion_asignatura
            JOIN 
                Asignatura ag ON ag.id_asignatura = acc.fk_asignatura
            JOIN
                Seccion scc ON scc.id_seccion = acc.fk_seccion;
    `;
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
    const q = "INSERT INTO Solicitud(`fk_alumno`, `fk_tipo_solicitud`, `fk_seccion_asignatura`) VALUES (?, ?, ?)";

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
    const q = "DELETE FROM Solicitud WHERE id_solicitud = ?";
    db.query(q, [id], callback);
};

const updateSolicitud = (id, fk_alumno, fk_tipo_solicitud, fk_seccion_asignatura, callback) => {
    const q = "UPDATE Solicitud SET `fk_asignatura` = ?, `fk_alumno` = ?, `fk_tipo_solicitud` = ? ,  `fk_seccion_asignatura`  = ?, `fk_seccion_asignatura` = ? WHERE id_solicitud = ?";
    db.query(q, [fk_alumno, fk_tipo_solicitud, fk_seccion_asignatura, id], callback);
};

export default {
    getAllSolicitudes,
    getSolicitudById,
    createSolicitud,
    deleteSolicitud,
    updateSolicitud
};