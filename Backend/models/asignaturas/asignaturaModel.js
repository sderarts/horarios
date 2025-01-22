import db from '../../config/db.js';

const getAllAsignaturas = (callback) => {
    const q = ` SELECT a.nombreAsignatura, a.id_asignatura, n.nombreNivel, c.nombreCarrera
            FROM 
                Asignatura a
            JOIN 
                NivelAsignatura na ON a.id_asignatura = na.fk_asignatura
            JOIN 
                Nivel n ON na.fk_nivel = n.id_nivel
            JOIN 
                CarreraNivel cn ON n.id_nivel = cn.fk_nivel
            JOIN 
                Carrera c ON cn.fk_carrera = c.id_carrera;
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

const createAsignatura = (asignaturaData, callback) => {
    const q = "INSERT INTO asignatura(`id_asignatura`, `nombreAsignatura`) VALUES (?, ?)";
    db.query(q, [asignaturaData.id_asignatura, asignaturaData.nombreAsignatura], callback);
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
    createAsignatura,
    deleteAsignatura,
    updateAsignatura
};