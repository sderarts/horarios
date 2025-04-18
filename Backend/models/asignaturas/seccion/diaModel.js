import db from '../../../config/db.js';

const getAllDias = (callback) => {
    const q = "SELECT * FROM dia";
    db.query(q, callback);
};

const getdiaById = (id, callback) => {
    const query = 'SELECT * FROM dia WHERE id_dia = $1';

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


const createDia = (diaData, callback) => {
    const q = "INSERT INTO dia(`nombreDia`) VALUES ($1)";
    db.query(q, [diaData.nombreDia], callback);
};

const deleteDia = (id, callback) => {
    const q = "DELETE FROM dia WHERE id_dia = $1";
    db.query(q, [id], callback);
};

const updateDia = (id, nombreDia, callback) => {
    const q = "UPDATE dia SET `nombreDia` = $1 WHERE id_dia = $2";
    db.query(q, [nombreDia, id], callback);
};

export default {
    getAllDias,
    getdiaById,
    createDia,
    deleteDia,
    updateDia
};