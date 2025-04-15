import express from 'express'
import carreraRoutes from './routes/asignaturas/carreraRoutes.js';
import nivelRoutes from './routes/asignaturas/nivelRoutes.js';
import asignaturaRoutes from './routes/asignaturas/asignaturaRoutes.js';
import seccionRoutes from './routes/asignaturas/seccion/seccionRoutes.js';
import diaRoutes from './routes/asignaturas/seccion/diaRoutes.js';
import bloqueRoutes from './routes/asignaturas/seccion/bloqueRoutes.js';
import diaBloqueRoutes from './routes/asignaturas/seccion/diaBloqueRoutes.js';
import carreraNivelRoutes from './routes/asignaturas/carreraNivelRoutes.js';
import seccionDiaRoutes from './routes/asignaturas/seccion/seccionDiaRoutes.js';
import nivelAsignaturaRoutes from './routes/asignaturas/nivelAsignaturaRoutes.js';
import asignaturaSeccionRoutes from './routes/horario/asignaturaSeccionRoutes.js';
import horarioAlumnoRoutes from './routes/horario/horarioAlumnoRoutes.js';
import solicitudRoutes from './routes/solicitud/solicitudRoutes.js';
import solicitudAcademicoRoutes from './routes/solicitud/solicitudAcademicoRoutes.js';
import tipoSolicitudRoutes from './routes/solicitud/tipoSolicitudRoutes.js';
import estadoSolicitudRoutes from './routes/solicitud/estadoSolicitudRoutes.js';

import cors from 'cors'
import authRoutes from './routes/auth/authRoutes.js'
import usuarioRoutes from './routes/usuarios/usuarioRoutes.js'

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.use(authRoutes);




app.use('/carreras', carreraRoutes);
app.use('/niveles', nivelRoutes);
app.use('/asignaturas', asignaturaRoutes);
app.use('/secciones', seccionRoutes);
app.use('/dias', diaRoutes);
app.use('/bloques', bloqueRoutes);
app.use('/dia_bloques', diaBloqueRoutes);
app.use('/carrera_niveles', carreraNivelRoutes);
app.use('/seccion_dias', seccionDiaRoutes);
app.use('/nivel_asignaturas', nivelAsignaturaRoutes);
app.use('/asignatura_secciones', asignaturaSeccionRoutes);
app.use('/horario_alumnos', horarioAlumnoRoutes);
app.use('/solicitudes', solicitudRoutes);
app.use('/academico_solicitudes', solicitudAcademicoRoutes);
app.use('/tipo_solicitudes', tipoSolicitudRoutes);
app.use('/estado_solicitudes', estadoSolicitudRoutes);
app.use('/usuarios', usuarioRoutes);


app.listen(8800, () => {
    console.log("🚀 Servidor backend corriendo en http://localhost:8800");
    console.log("🛢️ Conectado a la base de datos PostgreSQL en el puerto 5432");
});
