import db from '../../config/db.js';

const getAllAsignaturas_Secciones = (callback) => {
    const q = ` SELECT 
                    ac.id_asignatura_seccion,
                    MAX(ac.fk_seccion) AS fk_seccion,  -- Agrega esto
                    MAX(a.nombreasignatura) AS nombreasignatura,
                    MAX(ac.nombrerelacion) AS nombrerelacion,
                    MAX(ac.nombredocente) AS nombredocente,
                    MAX(s.nombreseccion) AS nombreseccion,
                    MAX(s.capacidad) AS capacidad,
                    MAX(s.inscripciones) AS inscripciones,
                    MAX(n.nombrenivel) AS nombrenivel,
                    MAX(c.nombrecarrera) AS nombrecarrera
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
                    seccion s ON ac.fk_seccion = s.id_seccion
                GROUP BY ac.id_asignatura_seccion;

    `;
    db.query(q, callback);
};

const getAsignatura_SeccionById = (id, callback) => {
    const query = `
        SELECT
            asignaturaseccion.id_asignatura_seccion,
            asignaturaseccion.nombrerelacion,
            asignaturaseccion.nombredocente,
            asignatura.nombreasignatura AS nombre_asignatura,
            seccion.nombreSeccion AS nombre_seccion,
            asignaturaseccion.fk_Asignatura,
            asignaturaseccion.fk_seccion
        FROM
            asignaturaseccion
        JOIN
            asignatura ON asignaturaseccion.fk_asignatura = asignatura.id_asignatura
        JOIN
            seccion ON asignaturaseccion.fk_seccion = seccion.id_seccion
        WHERE
            asignaturaseccion.id_asignatura_seccion = $1;
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
            SELECT id_asignatura, nombreAsignatura FROM asignatura;
        `;
        const querySecciones = `
            SELECT id_seccion, nombreSeccion FROM seccion;
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
                    asignaturaseccion: result[0], // La sección que se quiere editar
                    asignaturas, // Todas las asignaturas
                    secciones // Todas las secciones
                });
            });
        });
    });
};

const getAsignatura_SeccionById2 = (id, callback) => {
    const query = 'SELECT * FROM asignaturaseccion WHERE id_asignatura_seccion = $1';

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('No se encontraron horarios para la asignatura-seccion'), null); // Error si no se encuentra
        }

        return callback(null, result); // Devuelve todos los resultados
    });
};

const getAsignatura_SeccionByAlumno = (id, callback) => {
    const query = `
        SELECT
            asigSec.id_asignatura_seccion,
            asigSec.nombrerelacion,
            asigSec.nombredocente,
            asignatura.nombreAsignatura AS nombre_asignatura,
            seccion.nombreSeccion AS nombre_seccion,
            asigSec.fk_Asignatura,
            asigSec.fk_seccion
        FROM
            asignaturaseccion AS asigSec
        JOIN
            asignatura AS asignatura ON asigSec.fk_asignatura = asignatura.id_asignatura
        JOIN
            seccion AS seccion ON asigSec.fk_seccion = seccion.id_seccion
        JOIN
            nivelasignatura AS nivAsig ON nivAsig.fk_asignatura = asignatura.id_asignatura
        JOIN
            nivel AS nivel ON nivel.id_nivel = nivAsig.fk_nivel
        JOIN
            carreranivel AS carreraNivel ON carreraNivel.fk_nivel = nivel.id_nivel
        JOIN
            carrera AS carrera ON carreraNivel.fk_carrera = carrera.id_carrera
        JOIN
            alumno AS alumno ON alumno.fk_carrera = carrera.id_carrera
        WHERE
            alumno.id_alumno = $1;
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
            SELECT id_asignatura, nombreasignatura FROM asignatura;
        `;
        const querySecciones = `
            SELECT id_seccion, nombreseccion FROM seccion;
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
                    asignaturaseccion: result[0], // La sección que se quiere editar
                    asignaturas, // Todas las asignaturas
                    secciones // Todas las secciones
                });
            });
        });
    });
};

const createAsignatura_Seccion = (Nivel_AsignaturaData, callback) => {
    const q = "INSERT INTO asignaturaseccion(fk_seccion, fk_asignatura, nombrerelacion, nombredocente) VALUES ($1, $2, $3, $4)";
    db.query(q, [Nivel_AsignaturaData.fk_seccion, Nivel_AsignaturaData.fk_asignatura, Nivel_AsignaturaData.nombrerelacion, Nivel_AsignaturaData.nombredocente], callback);
};

const deleteAsignatura_Seccion = (id, callback) => {
    const q = "DELETE FROM asignaturaseccion WHERE id_asignatura_seccion = $1";
    db.query(q, [id], callback);
};

const updateAsignatura_Seccion = (id, asignatura, fk_seccion, nombrerelacion, nombredocente, callback) => {
    const q = "UPDATE asignaturaseccion SET fk_asignatura = $1, fk_seccion = $2, nombrerelacion = $3 , nombredocente = $4 WHERE id_asignatura_seccion = $5";
    db.query(q, [asignatura, fk_seccion, nombrerelacion, nombredocente, id], callback);
};

export default {
    getAllAsignaturas_Secciones,
    getAsignatura_SeccionById,
    getAsignatura_SeccionById2,
    getAsignatura_SeccionByAlumno,
    createAsignatura_Seccion,
    deleteAsignatura_Seccion,
    updateAsignatura_Seccion
};