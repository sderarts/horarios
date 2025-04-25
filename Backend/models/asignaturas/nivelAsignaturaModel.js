import db from '../../config/db.js';

const getAllNiveles_Asignaturas = (callback) => {
    const q = "SELECT * FROM nivelasignatura";
    db.query(q, callback);
};

const getNivel_AsignaturaById = (id, callback) => {
    const query = 'SELECT * FROM nivelasignatura WHERE id_nivel_asignatura = $1';

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
    const q = "INSERT INTO nivelasignatura( fk_nivel, fk_asignatura, relacionnombre) VALUES ($1, $2, $3)";
    db.query(q, [Nivel_AsignaturaData.fk_nivel, Nivel_AsignaturaData.fk_asignatura, Nivel_AsignaturaData.relacionnombre], callback);
};

const deleteNivel_Asignatura = (id, callback) => {
    const q = "DELETE FROM nivelasignatura WHERE id_nivel_asignatura = $1";
    db.query(q, [id], callback);
};

const updateNivel_Asignatura = (id, fk_asignatura, fk_nivel, relacionnombre, callback) => {
    const q = "UPDATE nivelasignatura SET fk_asignatura = $1, fk_nivel = $2, relacionnombre = $3 WHERE id_nivel_asignatura = $4";
    db.query(q, [fk_asignatura, fk_nivel, relacionnombre, id], callback);
};

export default {
    getAllNiveles_Asignaturas,
    getNivel_AsignaturaById,
    createNivel_Asignatura,
    deleteNivel_Asignatura,
    updateNivel_Asignatura
};