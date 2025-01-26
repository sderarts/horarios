import db from '../../config/db.js';

const getAllAsignaturas_Secciones = (callback) => {
    const q = ` SELECT 
                a.nombreAsignatura, 
                a.id_asignatura,
                ac.id_asignatura_seccion,
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

const getAsignatura_SeccionById = (id, callback) => {
    const query = `
        SELECT
            AsignaturaSeccion.id_asignatura_seccion,
            AsignaturaSeccion.nombreRelacion,
            AsignaturaSeccion.nombreDocente,
            Asignatura.nombreAsignatura AS nombre_asignatura,
            Seccion.nombreSeccion AS nombre_seccion,
            AsignaturaSeccion.fk_Asignatura,
            AsignaturaSeccion.fk_seccion
        FROM
            AsignaturaSeccion
        JOIN
            Asignatura ON AsignaturaSeccion.fk_asignatura = Asignatura.id_asignatura
        JOIN
            Seccion ON AsignaturaSeccion.fk_seccion = Seccion.id_seccion
        WHERE
            AsignaturaSeccion.id_asignatura_seccion = ?;
    `;

    // Ejecutamos la consulta para obtener los detalles de la asignatura-sección
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('Sección no encontrada'), null); // Error si no se encuentra la sección
        }

        // Si se encuentra la sección, obtenemos también todas las asignaturas y secciones disponibles
        const queryAsignaturas = `
            SELECT id_asignatura, nombreAsignatura FROM Asignatura;
        `;
        const querySecciones = `
            SELECT id_seccion, nombreSeccion FROM Seccion;
        `;

        // Ejecutamos ambas consultas para obtener asignaturas y secciones
        db.query(queryAsignaturas, (err1, asignaturas) => {
            if (err1) {
                return callback(err1, null);
            }

            db.query(querySecciones, (err2, secciones) => {
                if (err2) {
                    return callback(err2, null);
                }

                // Regresamos los datos de la asignatura-sección junto con las listas completas de asignaturas y secciones
                return callback(null, {
                    asignaturaSeccion: result[0], // La sección que se quiere editar
                    asignaturas, // Todas las asignaturas
                    secciones // Todas las secciones
                });
            });
        });
    });
};

const getAsignatura_SeccionByAlumno = (id, callback) => {
    const query = `
        SELECT
            asigSec.id_asignatura_seccion,
            asigSec.nombreRelacion,
            asigSec.nombreDocente,
            asignatura.nombreAsignatura AS nombre_asignatura,
            seccion.nombreSeccion AS nombre_seccion,
            asigSec.fk_Asignatura,
            asigSec.fk_seccion
        FROM
            AsignaturaSeccion AS asigSec
        JOIN
            Asignatura AS asignatura ON asigSec.fk_asignatura = asignatura.id_asignatura
        JOIN
            Seccion AS seccion ON asigSec.fk_seccion = seccion.id_seccion
        JOIN
            NivelAsignatura AS nivAsig ON nivAsig.fk_asignatura = asignatura.id_asignatura
        JOIN
            Nivel AS nivel ON nivel.id_nivel = nivAsig.fk_nivel
        JOIN
            CarreraNivel AS carreraNivel ON carreraNivel.fk_nivel = nivel.id_nivel
        JOIN
            Carrera AS carrera ON carreraNivel.fk_carrera = carrera.id_carrera
        JOIN
            Alumno AS alumno ON alumno.fk_carrera = carrera.id_carrera
        WHERE
            alumno.id_alumno = ?;
    `;

    // Ejecutamos la consulta para obtener los detalles de la asignatura-sección
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('Sección no encontrada'), null); // Error si no se encuentra la sección
        }

        // Si se encuentra la sección, obtenemos también todas las asignaturas y secciones disponibles
        const queryAsignaturas = `
            SELECT id_asignatura, nombreAsignatura FROM Asignatura;
        `;
        const querySecciones = `
            SELECT id_seccion, nombreSeccion FROM Seccion;
        `;

        // Ejecutamos ambas consultas para obtener asignaturas y secciones
        db.query(queryAsignaturas, (err1, asignaturas) => {
            if (err1) {
                return callback(err1, null);
            }

            db.query(querySecciones, (err2, secciones) => {
                if (err2) {
                    return callback(err2, null);
                }

                // Regresamos los datos de la asignatura-sección junto con las listas completas de asignaturas y secciones
                return callback(null, {
                    asignaturaSeccion: result[0], // La sección que se quiere editar
                    asignaturas, // Todas las asignaturas
                    secciones // Todas las secciones
                });
            });
        });
    });
};

const createAsignatura_Seccion = (Nivel_AsignaturaData, callback) => {
    const q = "INSERT INTO AsignaturaSeccion(`fk_seccion`, `fk_asignatura`, `nombreRelacion`, `nombreDocente`) VALUES (?, ?, ?, ?)";
    db.query(q, [Nivel_AsignaturaData.fk_seccion, Nivel_AsignaturaData.fk_asignatura, Nivel_AsignaturaData.nombreRelacion, Nivel_AsignaturaData.nombreDocente], callback);
};

const deleteAsignatura_Seccion = (id, callback) => {
    const q = "DELETE FROM AsignaturaSeccion WHERE id_asignatura_seccion = ?";
    db.query(q, [id], callback);
};

const updateAsignatura_Seccion = (id, asignatura, fk_seccion, nombreRelacion, nombreDocente, callback) => {
    const q = "UPDATE AsignaturaSeccion SET `fk_asignatura` = ?, `fk_seccion` = ?, `nombreRelacion` = ? , `nombreDocente` = ? WHERE id_asignatura_seccion = ?";
    db.query(q, [asignatura, fk_seccion, nombreRelacion, nombreDocente, id], callback);
};

export default {
    getAllAsignaturas_Secciones,
    getAsignatura_SeccionById,
    getAsignatura_SeccionByAlumno,
    createAsignatura_Seccion,
    deleteAsignatura_Seccion,
    updateAsignatura_Seccion
};