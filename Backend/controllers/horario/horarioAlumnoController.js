import Horario_Alumno from '../../models/horario/horarioAlumnoModel.js';
import db from '../../config/db.js'

const getAllHorarios_Alumnos = (req, res) => {
    Horario_Alumno.getAllHorarios_Alumnos((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getHorario_AlumnoById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Horario_Alumno.getHorario_AlumnoById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const getHorarioById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Horario_Alumno.getHorarioById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addHorario_Alumno = (req, res) => {
    const { fk_seccion_asignatura, fk_alumno } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_seccion_asignatura || !fk_alumno) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_seccion_asignatura, fk_alumno)' });
    }

    // Primero, verificamos si ya existe la inscripción
    const checkQuery = "SELECT * FROM horarioalumno WHERE fk_alumno = $1 AND fk_seccion_asignatura = $2";
    db.query(checkQuery, [fk_alumno, fk_seccion_asignatura], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la verificación de inscripción.', error: err });
        }

        // Si ya existe un registro, devolvemos un mensaje de error
        if (results.length > 0) {
            return res.status(400).json({ message: 'Ya estás inscrito en esta sección.' });
        }

        // Si no existe, creamos la relación
        const carrera_NivelData = { fk_seccion_asignatura, fk_alumno };  // Creamos el objeto con los datos a insertar

        Horario_Alumno.createHorario_Alumno(carrera_NivelData, (createErr, data) => {
            if (createErr) {
                return res.status(500).json({ message: 'Error al crear la relación', error: createErr });
            }
            return res.status(201).json(data);  // Respondemos con el dato creado
        });
    });
};

const deleteHorario_Alumno = (req, res) => {
    const id = req.params.id;

    Horario_Alumno.deleteHorario_Alumno(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateHorario_Alumno = (req, res) => {
    const id = req.params.id;
    const { fk_alumno, fk_seccion_asignatura, id_horario } = req.body;
    console.log(req.body);
    // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_alumno || !fk_seccion_asignatura || !id_horario) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_alumno, fk_seccion_asignatura, id_horario)' });
    }

    Horario_Alumno.updateHorario_Alumno(id, fk_alumno, fk_seccion_asignatura, id_horario, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};



// const intercambiarSecciones = async (req, res) => {
//     console.log("Cuerpo de la solicitud:", req.body);

//     const {
//         fk_seccion_asignatura_a,
//         fk_seccion_asignatura_b,
//         fk_alumno_a,
//         fk_alumno_b,
//         id_horario_a,
//         id_horario_b,
//     } = req.body;

//     console.log("Datos recibidos en el backend:", {
//         fk_seccion_asignatura_a,
//         fk_seccion_asignatura_b,
//         fk_alumno_a,
//         fk_alumno_b,
//         id_horario_a,
//         id_horario_b,
//     });

//     // Validación de datos
//     if (
//         !fk_seccion_asignatura_a ||
//         !fk_seccion_asignatura_b ||
//         !fk_alumno_a ||
//         !fk_alumno_b ||
//         !id_horario_a ||
//         !id_horario_b
//     ) {
//         return res.status(400).json({ message: 'Faltan datos obligatorios para el intercambio.' });
//     }

//     let connection;
//     try {
//         // Obtener una conexión del pool (usa promesas, no callbacks)
//         connection = await db.getConnection();

//         await connection.beginTransaction();

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

//         await connection.commit();
//         res.status(200).json({ message: 'Intercambio realizado con éxito.' });
//     } catch (error) {
//         if (connection) await connection.rollback(); // Revertir la transacción en caso de error
//         console.error("Error al intercambiar secciones:", error);
//         res.status(500).json({ message: 'Hubo un problema al realizar el intercambio', error: error.message });
//     } finally {
//         if (connection) connection.release(); // Liberar la conexión al pool
//     }
// };


export {
    getAllHorarios_Alumnos,
    getHorario_AlumnoById,
    getHorarioById,
    addHorario_Alumno,
    deleteHorario_Alumno,
    updateHorario_Alumno
    // updateHorario_Alumnob,

};