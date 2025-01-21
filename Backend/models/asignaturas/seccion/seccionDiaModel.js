import db from '../../../config/db.js';

const getAllSecciones_Dias = (callback) => {
    const q = `
        SELECT
            SeccionDia.id_seccion_dia,
            SeccionDia.nombreRelacion,
            Dia.nombreDia AS nombre_dia,
            Seccion.nombreSeccion AS nombre_seccion
        FROM
            SeccionDia
        JOIN
            Dia ON SeccionDia.fk_dia = Dia.id_dia
        JOIN
            Seccion ON SeccionDia.fk_seccion = Seccion.id_seccion;

    `;
    db.query(q, callback);
};

const getSeccion_DiaById = (id, callback) => {
    const query = 'SELECT * FROM SeccionDia WHERE id_seccion_dia = ?';

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


const createSeccion_Dia = (dia_BloqueData, callback) => {
    const q = "INSERT INTO SeccionDia(`id_seccion_dia`, `fk_seccion`, `fk_dia`, `nombreRelacion`) VALUES (?, ?, ?, ?)";
    db.query(q, [dia_BloqueData.id_seccion_dia, dia_BloqueData.fk_seccion, dia_BloqueData.fk_dia, dia_BloqueData.nombreRelacion], callback);
};

const deleteSeccion_Dia = (id, callback) => {
    const q = "DELETE FROM SeccionDia WHERE id_seccion_dia = ?";
    db.query(q, [id], callback);
};

const updateSeccion_Dia = (id, fk_seccion, fk_dia, nombreRelacion, callback) => {
    const q = "UPDATE SeccionDia SET `fk_seccion` = ?, `fk_dia` = ?, `nombreRelacion` = ? WHERE id_seccion_dia = ?";
    db.query(q, [fk_seccion, fk_dia, nombreRelacion, id], callback);
};

export default {
    getAllSecciones_Dias,
    getSeccion_DiaById,
    createSeccion_Dia,
    deleteSeccion_Dia,
    updateSeccion_Dia
};