import db from '../../../config/db.js';

const getAllDias = (callback) => {
    const q = "SELECT * FROM dia";
    db.query(q, callback);
};

const getdiaById = (id, callback) => {
    const query = 'SELECT * FROM dia WHERE id_dia = ?';

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
    const q = "INSERT INTO dia(`id_dia`, `nombreDia`) VALUES (?, ?)";
    db.query(q, [diaData.id_dia, diaData.nombreDia], callback);
};

const deleteDia = (id, callback) => {
    const q = "DELETE FROM dia WHERE id_dia = ?";
    db.query(q, [id], callback);
};

const updateDia = (id, nombreDia, callback) => {
    const q = "UPDATE dia SET `nombreDia` = ? WHERE id_dia = ?";
    db.query(q, [nombreDia, id], callback);
};

export default {
    getAllDias,
    getdiaById,
    createDia,
    deleteDia,
    updateDia
};