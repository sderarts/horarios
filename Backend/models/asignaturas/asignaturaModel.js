import db from '../../config/db.js';

const getAllAsignaturas = (callback) => {
    const q = ` SELECT 
                a.nombreasignatura, 
                a.id_asignatura, 
                ac.nombredocente, 
                s.nombreseccion, 
                s.capacidad, 
                s.inscripciones, 
                n.nombrenivel, 
                c.nombrecarrera
            FROM 
                asignatura a
            JOIN 
                nivelasignatura na ON a.id_asignatura = na.fk_asignatura
            JOIN 
                nivel n ON na.fk_nivel = n.id_nivel
            JOIN 
                carreranivel cn ON n.id_nivel = cn.fk_nivel
            JOIN 
                carrera c ON cn.fk_carrera = c.id_carrera
            JOIN
                asignaturaseccion ac ON a.id_asignatura = ac.fk_asignatura
            JOIN
                seccion s ON ac.fk_seccion = s.id_seccion;
    `;
    db.query(q, callback);
};
const getAllAsignaturas2 = (callback) => {
    const q = " SELECT id_asignatura, nombreasignatura FROM asignatura";
    db.query(q, callback);
};

const getAsignaturaById = (id, callback) => {
    const query = 'SELECT * FROM asignatura WHERE id_asignatura = $1';

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('Asignatura no encontrada'), null); // Error si no se encuentra la sección
        }

        return callback(null, result[0]); // Retorna el primer resultado
    });
};


const createAsignatura = (asignaturaData, callback) => {
    const q = "INSERT INTO asignatura(nombreasignatura) VALUES ($1)";
    db.query(q, [asignaturaData.nombreasignatura], callback);
};

const deleteAsignatura = (id, callback) => {
    const q = "DELETE FROM asignatura WHERE id_asignatura = $1";
    db.query(q, [id], callback);
};

const updateAsignatura = (id, nombreAsignatura, callback) => {
    const q = "UPDATE asignatura SET `nombreasignatura` = $1 WHERE id_asignatura = $2";
    db.query(q, [nombreAsignatura, id], callback);
};

export default {
    getAllAsignaturas,
    getAllAsignaturas2,
    getAsignaturaById,
    createAsignatura,
    deleteAsignatura,
    updateAsignatura
};