import db from '../../config/db.js';

const getAllNiveles = (callback) => {
    const q = "SELECT * FROM nivel";
    db.query(q, callback);
};

const createNivel = (nivelData, callback) => {
    const q = "INSERT INTO Nivel(`id_nivel`, `nombreNivel`) VALUES (?, ?)";
    db.query(q, [nivelData.id_nivel, nivelData.nombreNivel], callback);
};

const deleteNivel = (id, callback) => {
    const q = "DELETE FROM nivel WHERE id_nivel = ?";
    db.query(q, [id], callback);
};

const updateNivel = (id, nombreNivel, callback) => {
    const q = "UPDATE nivel SET `nombreNivel` = ? WHERE id_nivel = ?";
    db.query(q, [nombreNivel, id], callback);
};

export default {
    getAllNiveles,
    createNivel,
    deleteNivel,
    updateNivel
};