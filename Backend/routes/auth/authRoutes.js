import express from 'express';
const router = express.Router();
import verifyIdToken from "../../config/firebaseConfig.js";
import db from '../../config/db.js';  // Esto debería ser tu archivo de conexión a la base de datos MySQL

router.post('/auth/register', async (req, res) => {
    try {
        const { idToken, rol, carreraSeleccionada, nivelSeleccionado } = req.body;
        const decodedToken = await verifyIdToken(idToken);
        const { uid, email, displayName } = decodedToken;

        const limitedUid = uid.substring(0, 28);
        const isAcademico = email && (email.endsWith('@duocuc.cl') || email.endsWith('@duoc.cl') || email.endsWith('@profesor.duoc.cl'));
        const nameParts = displayName ? displayName.split(' ') : ['Desconocido'];
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || 'Desconocido';

        // Verificar si ya existe
        const checkQuery = isAcademico
            ? `SELECT * FROM academico WHERE id_academico = $1`
            : `SELECT * FROM alumno WHERE id_alumno = $1`;

        const checkResult = await db.query(checkQuery, [limitedUid]);

        if (checkResult.rowCount > 0) {
            return res.status(400).json({ message: 'El usuario ya existe en la base de datos' });
        }

        // Insertar usuario nuevo
        let query, params;

        if (isAcademico) {
            query = `INSERT INTO academico (id_academico, correoAcademico, nombreAcademico, apellidoAcademico, fk_rol) VALUES ($1, $2, $3, $4, $5)`;
            params = [limitedUid, email, firstName, lastName, 1];
        } else {
            query = `INSERT INTO alumno (ID_ALUMNO, correoAlumno, nombreAlumno, apellidoAlumno, fk_carrera, fk_carrera_nivel, fk_rol) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            params = [limitedUid, email, firstName, lastName, carreraSeleccionada, nivelSeleccionado, 2];
        }

        await db.query(query, params);

        return res.status(200).json({ message: 'Usuario registrado correctamente', user: decodedToken });

    } catch (error) {
        console.error('Error de autenticación o registro:', error);
        return res.status(500).json({ message: 'Autenticación fallida', error: error.message });
    }
});



router.get('/auth/checkUser/:uid', async (req, res) => {
    let { uid } = req.params;
    uid = uid.substring(0, 28);

    console.log("🔍 Verificando UID:", uid);

    if (!uid) {
        return res.status(400).json({ message: 'UID no proporcionado' });
    }

    try {
        const queryAlumno = `SELECT * FROM alumno WHERE id_alumno = $1`;
        const queryAcademico = `SELECT * FROM academico WHERE id_academico = $1`;

        db.query(queryAlumno, [uid], (err, alumnoResult) => {
            if (err) {
                console.error('❌ Error al verificar el usuario (alumno):', err);
                return res.status(500).json({ message: 'Error interno', error: err.message });
            }

            if (alumnoResult.rowCount > 0) {
                return res.status(200).json({
                    exists: true,
                    rol: 2,
                    id_alumno: alumnoResult.rows[0].id_alumno
                });
            }

            db.query(queryAcademico, [uid], (err, academicoResult) => {
                if (err) {
                    console.error('❌ Error al verificar el usuario (academico):', err);
                    return res.status(500).json({ message: 'Error interno', error: err.message });
                }

                if (academicoResult.rowCount > 0) {
                    return res.status(200).json({
                        exists: true,
                        rol: 1,
                        id_academico: academicoResult.rows[0].id_academico
                    });
                }

                return res.status(200).json({ exists: false });
            });
        });
    } catch (error) {
        console.error('❌ Error al verificar el usuario (try/catch):', error);
        return res.status(500).json({ message: 'Error interno', error: error.message });
    }
});


router.get('/test-users', (req, res) => {
    db.query('SELECT * FROM academico LIMIT 5', [], (err, result) => {
        if (err) {
            console.error('❌ Error al hacer consulta a alumno:', err);
            return res.status(500).json({ message: 'Error en la consulta' });
        }

        console.log('✅ Resultado:', result);
        return res.status(200).json({ message: 'Consulta exitosa', data: result });
    });
});





export default router;
