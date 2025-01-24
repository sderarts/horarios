import db from '../../config/db.js';

const getAllCarreras_Niveles = (callback) => {
    const q = "SELECT * FROM CarreraNivel";
    db.query(q, callback);
};

const getCarrera_NivelById = (id, callback) => {
    const query = 'SELECT * FROM CarreraNivel WHERE id_carrera_nivel = ?';

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
    const q = "INSERT INTO CarreraNivel(`fk_carrera`, `fk_nivel`, `relacionNombre`) VALUES (?, ?, ?)";
    db.query(q, [Carrera_NivelData.fk_carrera, Carrera_NivelData.fk_nivel, Carrera_NivelData.relacionNombre], callback);
};

const deleteCarrera_Nivel = (id, callback) => {
    const q = "DELETE FROM CarreraNivel WHERE id_carrera_nivel = ?";
    db.query(q, [id], callback);
};

const updateCarrera_Nivel = (id, fk_carrera, fk_nivel, relacionNombre, callback) => {
    const q = "UPDATE CarreraNivel SET SET `fk_carrera` = ?, `fk_nivel` = ?, `relacionNombre` = ? WHERE id_carrera_nivel = ?";
    db.query(q, [fk_carrera, fk_nivel, relacionNombre, id], callback);
};

export default {
    getAllCarreras_Niveles,
    getCarrera_NivelById,
    createCarrera_Nivel,
    deleteCarrera_Nivel,
    updateCarrera_Nivel
};