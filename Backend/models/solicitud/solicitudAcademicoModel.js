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
    const q = "INSERT INTO SolicitudAcademico(`fk_academico`,`fk_estado`, `mensaje`) VALUES (?,?,?)";
    db.query(q, [SolicitudAcademicoData.fk_academico, SolicitudAcademicoData.fk_estado], callback);
};

const deleteSolicitud_Academico = (id, callback) => {
    const q = "DELETE FROM SolicitudAcademico WHERE id_solicitud_academico = ?";
    db.query(q, [id], callback);
};

const updateSolicitud_Academico = (id, fk_academico, fk_estado, mensaje, callback) => {
    const q = "UPDATE SolicitudAcademico SET `fk_academico` = ?, `fk_estado` = ?, `mensaje` = ? WHERE id_solicitud_academico = ?";
    db.query(q, [fk_academico, fk_estado, mensaje, id], callback);
};

export default {
    getAllAcademico_Solicitudes,
    getSolicitud_AcademicoById,
    createSolicitud_Academico,
    deleteSolicitud_Academico,
    updateSolicitud_Academico
};