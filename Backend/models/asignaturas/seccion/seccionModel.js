import db from '../../../config/db.js';

const getAllSecciones = (callback) => {
    const q = "SELECT * FROM seccion";
    db.query(q, callback);
};

const getSeccionById = (id, callback) => {
    const query = 'SELECT * FROM seccion WHERE id_seccion = $1';

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('Sección no encontrada'), null); // Error si no se encuentra la sección
        }

        return callback(null, result.rows[0]); // Retorna el primer resultado
    });
};


const createSeccion = (seccionData, callback) => {
    const q = "INSERT INTO seccion(nombreSeccion, capacidad, inscripciones) VALUES ($1, $2, $3)";
    db.query(q, [seccionData.nombreseccion, seccionData.capacidad, seccionData.inscripciones], callback);
};

const deleteSeccion = (id, callback) => {
    const q = "DELETE FROM seccion WHERE id_seccion = $1";
    db.query(q, [id], callback);
};

const updateSeccion = (id, nombreseccion, capacidad, inscripciones, callback) => {
    const q = "UPDATE seccion SET nombreseccion = $1, capacidad = $2, inscripciones = $3 WHERE id_seccion = $4";
    db.query(q, [nombreseccion, capacidad, inscripciones, id], callback);
};

export default {
    getAllSecciones,
    getSeccionById,
    createSeccion,
    deleteSeccion,
    updateSeccion
};