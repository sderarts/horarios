import db from '../../config/db.js';

const getAllNiveles = (callback) => {
    const q = "SELECT * FROM nivel";
    db.query(q, callback);
};

const createNivel = (nivelData, callback) => {
    const q = "INSERT INTO nivel(nombrenivel) VALUES ($1)";
    db.query(q, [nivelData.nombrenivel], callback);
};

const deleteNivel = (id, callback) => {
    const q = "DELETE FROM nivel WHERE id_nivel = $1";
    db.query(q, [id], callback);
};

const updateNivel = (id, nombreNivel, callback) => {
    const q = "UPDATE nivel SET nombrenivel = $1 WHERE id_nivel = $2";
    db.query(q, [nombreNivel, id], callback);
};

export default {
    getAllNiveles,
    createNivel,
    deleteNivel,
    updateNivel
};