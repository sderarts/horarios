import db from '../../../config/db.js';

const getAllSecciones = (callback) => {
    const q = "SELECT * FROM seccion";
    db.query(q, callback);
};

const getSeccionById = (id, callback) => {
    const query = 'SELECT * FROM seccion WHERE id_seccion = ?';

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


const createSeccion = (seccionData, callback) => {
    const q = "INSERT INTO seccion(`id_seccion`, `nombreSeccion`,`capacidad`,`inscripciones`) VALUES (?, ?, ?, ?)";
    db.query(q, [seccionData.id_seccion, seccionData.nombreSeccion, seccionData.capacidad, seccionData.inscripciones], callback);
};

const deleteSeccion = (id, callback) => {
    const q = "DELETE FROM seccion WHERE id_seccion = ?";
    db.query(q, [id], callback);
};

const updateSeccion = (id, nombreSeccion, capacidad, inscripciones, callback) => {
    const q = "UPDATE seccion SET `nombreSeccion` = ?,`capacidad` = ?, `inscripciones` = ? WHERE id_seccion = ?";
    db.query(q, [nombreSeccion, capacidad, inscripciones, id], callback);
};

export default {
    getAllSecciones,
    getSeccionById,
    createSeccion,
    deleteSeccion,
    updateSeccion
};