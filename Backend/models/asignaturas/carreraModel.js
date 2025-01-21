// models/carreraModel.js
import db from '../../config/db.js'; // Asumiendo que tienes un archivo de conexión a DB

const getAllCarreras = (callback) => {
    const q = "SELECT * FROM carrera";
    db.query(q, callback);
};

const createCarrera = (carreraData, callback) => {
    const q = "INSERT INTO carrera(`id_carrera`, `nombreCarrera`) VALUES (?, ?)";
    db.query(q, [carreraData.id_carrera, carreraData.nombreCarrera], callback);
};

const deleteCarrera = (id, callback) => {
    const q = "DELETE FROM carrera WHERE id_carrera = ?";
    db.query(q, [id], callback);
};

const updateCarrera = (id, nombreCarrera, callback) => {
    const q = "UPDATE carrera SET `nombreCarrera` = ? WHERE id_carrera = ?";
    db.query(q, [nombreCarrera, id], callback);
};

export default {
    getAllCarreras,
    createCarrera,
    deleteCarrera,
    updateCarrera
};