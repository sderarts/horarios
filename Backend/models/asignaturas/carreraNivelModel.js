import db from '../../config/db.js';

const getAllCarreras_Niveles = (callback) => {
    const q = "SELECT * FROM carreranivel";
    db.query(q, callback);
};

const getCarrera_NivelById = (id, callback) => {
    const query = 'SELECT * FROM carreranivel WHERE id_carrera_nivel = $1';

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


const createCarrera_Nivel = (Carrera_NivelData, callback) => {
    const q = "INSERT INTO carreranivel(fk_carrera, fk_nivel, relacionnombre) VALUES ($1, $2, $3)";
    db.query(q, [Carrera_NivelData.fk_carrera, Carrera_NivelData.fk_nivel, Carrera_NivelData.relacionnombre], callback);
};

const deleteCarrera_Nivel = (id, callback) => {
    const q = "DELETE FROM carreranivel WHERE id_carrera_nivel = $1";
    db.query(q, [id], callback);
};

const updateCarrera_Nivel = (id, fk_carrera, fk_nivel, relacionnombre, callback) => {
    const q = "UPDATE carreranivel SET SET `fk_carrera` = $1, `fk_nivel` = $2, `relacionnombre` = $3 WHERE id_carrera_nivel = $4";
    db.query(q, [fk_carrera, fk_nivel, relacionnombre, id], callback);
};

export default {
    getAllCarreras_Niveles,
    getCarrera_NivelById,
    createCarrera_Nivel,
    deleteCarrera_Nivel,
    updateCarrera_Nivel
};