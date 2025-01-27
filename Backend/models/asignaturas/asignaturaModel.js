import db from '../../config/db.js';

const getAllAsignaturas = (callback) => {
    const q = ` SELECT 
                a.nombreAsignatura, 
                a.id_asignatura, 
                ac.nombreDocente, 
                s.nombreSeccion, 
                s.capacidad, 
                s.inscripciones, 
                n.nombreNivel, 
                c.nombreCarrera
            FROM 
                Asignatura a
            JOIN 
                NivelAsignatura na ON a.id_asignatura = na.fk_asignatura
            JOIN 
                Nivel n ON na.fk_nivel = n.id_nivel
            JOIN 
                CarreraNivel cn ON n.id_nivel = cn.fk_nivel
            JOIN 
                Carrera c ON cn.fk_carrera = c.id_carrera
            JOIN
                AsignaturaSeccion ac ON a.id_asignatura = ac.fk_asignatura
            JOIN
                Seccion s ON ac.fk_seccion = s.id_seccion;
    `;
    db.query(q, callback);
};
const getAllAsignaturas2 = (callback) => {
    const q = ` SELECT id_asignatura, nombreAsignatura
                FROM Asignatura;
                ;
    `;
    db.query(q, callback);
};

const getAsignaturaById = (id, callback) => {
    const query = 'SELECT * FROM Carrera WHERE id_asignatura = ?';

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
    const q = "INSERT INTO asignatura(`nombreAsignatura`) VALUES (?)";
    db.query(q, [asignaturaData.nombreAsignatura], callback);
};

const deleteAsignatura = (id, callback) => {
    const q = "DELETE FROM asignatura WHERE id_asignatura = ?";
    db.query(q, [id], callback);
};

const updateAsignatura = (id, nombreAsignatura, callback) => {
    const q = "UPDATE asignatura SET `nombreAsignatura` = ? WHERE id_asignatura = ?";
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