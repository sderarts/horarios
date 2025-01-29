import db from '../../config/db.js';

const getAllAlumnos = (callback) => {
    const q = ` SELECT *
            FROM 
                Alumno ;
    `;
    db.query(q, callback);
};
const getAllAcademicos = (callback) => {
    const q = ` SELECT *
            FROM 
                Academico ;
    `;
    db.query(q, callback);
};

export default {
    getAllAlumnos,
    getAllAcademicos
};