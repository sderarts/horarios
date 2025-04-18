// models/carreraModel.js
import db from '../../config/db.js'; // Asumiendo que tienes un archivo de conexión a DB

const getAllCarreras = (callback) => {
    const q = "SELECT * FROM carrera";
    db.query(q, callback);
};

const getCarrera_ById = (id, callback) => {
    const query = 'SELECT * FROM Carrera WHERE id_carrera = $1';

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('Carrera no encontrada'), null); // Error si no se encuentra la sección
        }

        return callback(null, result[0]); // Retorna el primer resultado
    });
};

const createCarrera = (carreraData, callback) => {
    const q = "INSERT INTO carrera(`nombreCarrera`) VALUES ($1)";
    db.query(q, [carreraData.nombreCarrera], callback);
};

const deleteCarrera = (id, callback) => {
    const q = "DELETE FROM carrera WHERE id_carrera = $1";
    db.query(q, [id], callback);
};

const updateCarrera = (id, nombreCarrera, callback) => {
    const q = "UPDATE carrera SET `nombreCarrera` = $1 WHERE id_carrera = $2";
    db.query(q, [nombreCarrera, id], callback);
};

export default {
    getAllCarreras,
    getCarrera_ById,
    createCarrera,
    deleteCarrera,
    updateCarrera
};