import express from 'express';
const router = express.Router();
import verifyIdToken from "../../config/firebaseConfig.js";
import db from '../../config/db.js';  // Esto debería ser tu archivo de conexión a la base de datos MySQL

router.post('/auth/register', async (req, res) => {
    try {
        const { idToken, rol, carreraSeleccionada, nivelSeleccionado } = req.body;
        const decodedToken = await verifyIdToken(idToken);
        const { uid, email, displayName } = decodedToken;

        const limitedUid = uid.substring(0, 200);  // Limitar la UID
        const isAcademico = email && email.endsWith('@duocuc.cl'); // Verificar si el correo termina con '@duocuc.cl'
        const [firstName, lastName] = displayName ? displayName.split(' ') : ['Desconocido', 'Desconocido'];

        let query;
        let params;

        if (isAcademico) {
            // Si es académico, asignar rol 1
            query = `INSERT INTO academico (id_academico, correoAcademico, nombreAcademico, apellidoAcademico, fk_rol) VALUES (?, ?, ?, ?, ?)`;
            params = [limitedUid, email, firstName, lastName, 1];  // fk_rol para académico es 1
        } else {
            // Si no es académico, asignar rol 2 (alumno)
            query = `INSERT INTO alumno (ID_ALUMNO, correoAlumno, nombreAlumno, apellidoAlumno, fk_carrera, fk_carrera_nivel, fk_rol) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            params = [limitedUid, email, firstName, lastName, carreraSeleccionada, nivelSeleccionado, 2];  // fk_rol para alumno es 2
        }

        db.query(query, params, (err, result) => {
            if (err) {
                console.error('Error al insertar en la base de datos:', err);
                return res.status(500).json({ message: 'Error al insertar en la base de datos' });
            }

            // Si la inserción fue exitosa
            return res.status(200).json({ message: 'Usuario registrado correctamente', user: decodedToken });
        });
    } catch (error) {
        console.error('Error de autenticación:', error);
        return res.status(500).json({ message: 'Autenticación fallida', error: error.message });
    }
});


router.get('/auth/checkUser/:uid', async (req, res) => {
    let { uid } = req.params;

    // Limitar el UID a los primeros 28 caracteres, ya que en la base de datos tienes un valor recortado
    uid = uid.substring(0, 28);  // Recorta el UID a los primeros 28 caracteres

    if (!uid) {
        return res.status(400).json({ message: 'UID no proporcionado' });
    }

    try {
        const queryAlumno = `SELECT * FROM alumno WHERE id_alumno = ?`;
        const queryAcademico = `SELECT * FROM academico WHERE id_academico = ?`;

        // Consultar si la UID recortada ya existe en alumno
        db.query(queryAlumno, [uid], (err, alumnoResult) => {
            if (err) {
                console.error('Error al verificar el usuario (alumno):', err);
                return res.status(500).json({ message: 'Error interno', error: err.message });
            }

            if (alumnoResult.length > 0) {
                // Si es alumno, enviar también su id_alumno
                return res.status(200).json({
                    exists: true,
                    rol: 2,  // Rol 2 para alumno
                    id_alumno: alumnoResult[0].id_alumno  // Devolver el id_alumno
                });
            }

            // Si no se encontró en la tabla alumno, consultar en academico
            db.query(queryAcademico, [uid], (err, academicoResult) => {
                if (err) {
                    console.error('Error al verificar el usuario (academico):', err);
                    return res.status(500).json({ message: 'Error interno', error: err.message });
                }

                if (academicoResult.length > 0) {
                    return res.status(200).json({
                        exists: true,
                        rol: 1,  // Rol 1 para academico
                        id_academico: academicoResult[0].id_academico  // Devolver id_academico
                    });
                }

                // Si no se encuentra en ninguna tabla
                return res.status(200).json({ exists: false });
            });
        });
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        return res.status(500).json({ message: 'Error interno', error: error.message });
    }
});




export default router;
