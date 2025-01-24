import db from '../../../config/db.js';

const getAllBloques = (callback) => {
    const q = "SELECT * FROM BloqueHora";
    db.query(q, callback);
};

const getBloqueById = (id, callback) => {
    const query = 'SELECT * FROM BloqueHora WHERE id_bloque = ?';

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('Bloque no encontrado'), null); // Error si no se encuentra la sección
        }

        return callback(null, result[0]); // Retorna el primer resultado
    });
};


const createBloque = (bloqueData, callback) => {
    const q = "INSERT INTO BloqueHora( `nombreBloqueHora`) VALUES (?)";
    db.query(q, [bloqueData.nombreBloqueHora], callback);
};

const deleteBloque = (id, callback) => {
    const q = "DELETE FROM BloqueHora WHERE id_bloque = ?";
    db.query(q, [id], callback);
};

const updateBloque = (id, nombreBloqueHora, callback) => {
    const q = "UPDATE BloqueHora SET `nombreBloqueHora` = ? WHERE id_bloque = ?";
    db.query(q, [nombreBloqueHora, id], callback);
};

export default {
    getAllBloques,
    getBloqueById,
    createBloque,
    deleteBloque,
    updateBloque
};