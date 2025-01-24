import db from '../../config/db.js';

const getAllNiveles_Asignaturas = (callback) => {
    const q = "SELECT * FROM NivelAsignatura";
    db.query(q, callback);
};

const getNivel_AsignaturaById = (id, callback) => {
    const query = 'SELECT * FROM NivelAsignatura WHERE id_nivel_asignatura = ?';

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


const createNivel_Asignatura = (Nivel_AsignaturaData, callback) => {
    const q = "INSERT INTO NivelAsignatura( `fk_nivel`, `fk_asignatura`, `relacionNombre`) VALUES (?, ?, ?)";
    db.query(q, [Nivel_AsignaturaData.fk_nivel, Nivel_AsignaturaData.fk_asignatura, Nivel_AsignaturaData.relacionNombre], callback);
};

const deleteNivel_Asignatura = (id, callback) => {
    const q = "DELETE FROM NivelAsignatura WHERE id_nivel_asignatura = ?";
    db.query(q, [id], callback);
};

const updateNivel_Asignatura = (id, fk_asignatura, fk_nivel, relacionNombre, callback) => {
    const q = "UPDATE NivelAsignatura SET `fk_asignatura` = ?, `fk_nivel` = ?, `relacionNombre` = ? WHERE id_nivel_asignatura = ?";
    db.query(q, [fk_asignatura, fk_nivel, relacionNombre, id], callback);
};

export default {
    getAllNiveles_Asignaturas,
    getNivel_AsignaturaById,
    createNivel_Asignatura,
    deleteNivel_Asignatura,
    updateNivel_Asignatura
};