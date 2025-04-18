import db from '../../config/db.js';

const getAllHorarios_Alumnos = (callback) => {
    const q = "SELECT * FROM HorarioAlumno";
    db.query(q, callback);
};

const getHorario_AlumnoById = (id, callback) => {
    const query = `SELECT *
            FROM 
                HorarioAlumno h
            JOIN
                AsignaturaSeccion a ON h.fk_seccion_asignatura = a.id_asignatura_seccion
            JOIN
                Seccion s ON a.fk_seccion = s.id_seccion
            JOIN
                Asignatura ai ON a.fk_asignatura = ai.id_asignatura
            WHERE 
                h.fk_alumno = $1;
            `;

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('No se encontraron horarios para el alumno'), null); // Error si no se encuentra
        }

        return callback(null, result); // Devuelve todos los resultados
    });
};
const getHorarioById = (id, callback) => {
    const query = `SELECT *
            FROM 
                HorarioAlumno 
            WHERE 
                id_horario = $1;
            `;

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('No se encontraron horarios para el alumno'), null); // Error si no se encuentra
        }

        return callback(null, result); // Devuelve todos los resultados
    });
};



const createHorario_Alumno = (Horario_AlumnoData, callback) => {
    const q = "INSERT INTO HorarioAlumno( `fk_alumno`, `fk_seccion_asignatura`) VALUES ($1, $2)";
    db.query(q, [Horario_AlumnoData.fk_alumno, Horario_AlumnoData.fk_seccion_asignatura], callback);
};

const deleteHorario_Alumno = (id, callback) => {
    const q = "DELETE FROM HorarioAlumno WHERE id_horario = $1";
    db.query(q, [id], callback);
};

const updateHorario_Alumno = (id, fk_seccion_asignatura, fk_alumno, id_horario, callback) => {
    const q = "UPDATE HorarioAlumno SET `fk_seccion_asignatura` = $1, `fk_alumno` = $2, `id_horario` = $3 WHERE id_horario = $4 ";
    db.query(q, [fk_seccion_asignatura, fk_alumno, id_horario, id], callback);
};


// const intercambiarSecciones = async (req, res) => {
//     const print = console.log;
//     const { fk_seccion_asignatura_a, fk_seccion_asignatura_b, fk_alumno_a, fk_alumno_b, id_horario_a, id_horario_b } = req.body;

//     // Debug: Imprimir datos recibidos
//     print("Datos recibidos en el modelo:");
//     print("Sección para Alumno A:", fk_seccion_asignatura_a);
//     print("Sección para Alumno B:", fk_seccion_asignatura_b);
//     print("ID Alumno A:", fk_alumno_a);
//     print("ID Alumno B:", fk_alumno_b);
//     print("ID Horario A:", id_horario_a);
//     print("ID Horario B:", id_horario_b);

//     const connection = await db.promise().getConnection(); // Obtener una conexión

//     try {
//         await connection.beginTransaction(); // Iniciar transacción

//         // Verificar si el Alumno A ya está en la sección de destino
//         const [resultA] = await connection.query(
//             "SELECT * FROM HorarioAlumno WHERE fk_alumno = ? AND fk_seccion_asignatura = ?",
//             [fk_alumno_a, fk_seccion_asignatura_b]
//         );
//         if (resultA.length > 0) {
//             throw new Error('El Alumno A ya está asignado a la sección de destino.');
//         }

//         // Verificar si el Alumno B ya está en la sección de destino
//         const [resultB] = await connection.query(
//             "SELECT * FROM HorarioAlumno WHERE fk_alumno = ? AND fk_seccion_asignatura = ?",
//             [fk_alumno_b, fk_seccion_asignatura_a]
//         );
//         if (resultB.length > 0) {
//             throw new Error('El Alumno B ya está asignado a la sección de destino.');
//         }

//         // Actualizar la sección de Alumno A
//         await connection.query(
//             "UPDATE HorarioAlumno SET fk_seccion_asignatura = ? WHERE fk_alumno = ? AND id_horario = ?",
//             [fk_seccion_asignatura_b, fk_alumno_a, id_horario_a]
//         );

//         // Actualizar la sección de Alumno B
//         await connection.query(
//             "UPDATE HorarioAlumno SET fk_seccion_asignatura = ? WHERE fk_alumno = ? AND id_horario = ?",
//             [fk_seccion_asignatura_a, fk_alumno_b, id_horario_b]
//         );

//         await connection.commit(); // Confirmar la transacción
//         print("Intercambio realizado con éxito.");
//         res.status(200).json({ message: 'Intercambio realizado con éxito.' });

//     } catch (error) {
//         await connection.rollback(); // Revertir la transacción en caso de error
//         print("Error al intercambiar secciones:", error.message);
//         res.status(500).json({ message: 'Hubo un problema al realizar el intercambio', error: error.message });

//     } finally {
//         connection.release(); // Liberar la conexión
//     }
// };
const verificarSeccionDestino = async (connection, fk_alumno, fk_seccion_asignatura_destino) => {
    const [result] = await connection.query(
        "SELECT * FROM HorarioAlumno WHERE fk_alumno = $1 AND fk_seccion_asignatura = $2",
        [fk_alumno, fk_seccion_asignatura_destino]
    );
    if (result.length > 0) {
        throw new Error(`El Alumno ${fk_alumno} ya está asignado a la sección de destino.`);
    }
};





export default {
    getAllHorarios_Alumnos,
    getHorario_AlumnoById,
    getHorarioById,
    createHorario_Alumno,
    deleteHorario_Alumno,
    updateHorario_Alumno,
    // updateHorario_Alumnob,
    verificarSeccionDestino,
};