import express from 'express';
const router = express.Router();
import verifyIdToken from "../../config/firebaseConfig.js";
import db from '../../config/db.js';  // Esto debería ser tu archivo de conexión a la base de datos MySQL

router.post('/auth', async (req, res) => {
    try {
        const { idToken, rol, carreraSeleccionada, nivelSeleccionado } = req.body;
        const decodedToken = await verifyIdToken(idToken);
        const { uid, email, displayName } = decodedToken;

        const limitedUid = uid.substring(0, 200);  // Limitar la UID
        const isAcademico = rol === 1;
        const [firstName, lastName] = displayName ? displayName.split(' ') : ['Desconocido', 'Desconocido'];

        let query;
        let params;

        if (isAcademico) {
            query = `INSERT INTO academico (id_academico, correoAcademico, nombreAcademico, apellidoAcademico, fk_rol) VALUES (?, ?, ?, ?, ?)`;
            params = [limitedUid, email, firstName, lastName, rol];
        } else {
            query = `INSERT INTO alumno (id_alumno, correoAlumno, nombreAlumno, apellidoAlumno, fk_carrera, fk_nivel_carrera, fk_rol) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            params = [limitedUid, email, firstName, lastName, carreraSeleccionada, nivelSeleccionado, rol];
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

    // Limitar la UID a los primeros 200 caracteres
    uid = uid.substring(0, 200);  // Recorta la UID a 200 caracteres

    if (!uid) {
        return res.status(400).json({ message: 'UID no proporcionado' });
    }

    try {
        const queryAlumno = `SELECT * FROM alumno WHERE id_alumno = ?`;
        const queryAcademico = `SELECT * FROM academico WHERE id_academico = ?`;

        // Consultar si la UID recortada ya existe en alumno o academico
        db.query(queryAlumno, [uid], (err, alumnoResult) => {
            if (err) {
                console.error('Error al verificar el usuario (alumno):', err);
                return res.status(500).json({ message: 'Error interno', error: err.message });
            }

            if (alumnoResult.length > 0) {
                return res.status(200).json({ exists: true, rol: 2 });
            }

            // Si no se encontró en la tabla alumno, consultar en academico
            db.query(queryAcademico, [uid], (err, academicoResult) => {
                if (err) {
                    console.error('Error al verificar el usuario (academico):', err);
                    return res.status(500).json({ message: 'Error interno', error: err.message });
                }

                if (academicoResult.length > 0) {
                    return res.status(200).json({ exists: true, rol: 1 });
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
