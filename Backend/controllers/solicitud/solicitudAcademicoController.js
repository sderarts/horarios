import SolicitudAcademico from '../../models/solicitud/solicitudAcademicoModel.js'
import db from '../../config/db.js'

const getAllAcademico_Solicitudes = (req, res) => {
    SolicitudAcademico.getAllAcademico_Solicitudes((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getSolicitud_AcademicoById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    SolicitudAcademico.getSolicitud_AcademicoById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addSolicitud_Academico = (req, res) => {
    const { fk_academico, fk_estado, fk_solicitud, mensaje } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_academico || !fk_estado || !fk_solicitud || !mensaje) {
        return res.status(400).json({ message: 'Faltan datos obligatorios ( fk_academico, fk_estado, fk_solicitud, mensaje)' });
    }

    const estado_SolicitudData = { fk_academico, fk_estado, fk_solicitud, mensaje };  // Creamos el objeto con los datos a insertar

    SolicitudAcademico.createSolicitud_Academico(estado_SolicitudData, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al crear la relación', error: err });
        return res.status(201).json(data);  // Respondemos con el dato creado
    });
};

const deleteSolicitud_Academico = (req, res) => {
    const id = req.params.id;

    SolicitudAcademico.deleteSolicitud_Academico(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateSolicitud_Academico = (req, res) => {
    const id = req.params.id;
    const { fk_academico, fk_estado, fk_solicitud, mensaje } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_academico || !fk_estado || !fk_solicitud || !mensaje) {
        return res.status(400).json({ message: 'Faltan datos obligatorios  fk_academico, fk_estado, fk_solicitud, mensaje)' });
    }

    SolicitudAcademico.updateSolicitud_Academico(id, fk_academico, fk_estado, fk_solicitud, mensaje, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};

// Controlador para obtener el id_horario
const obtenerIdHorario = (req, res) => {
    const { fk_alumno, fk_seccion_asignatura } = req.params;

    SolicitudAcademico.obtenerIdHorario(fk_alumno, fk_seccion_asignatura, (err, result) => {
        if (err) {
            console.error('Error al obtener el id_horario:', err);
            return res.status(500).json({ message: 'Error al obtener el id_horario', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontró el horario' });
        }

        const id_horario = result[0].id_horario;
        res.status(200).json({ id_horario });
    });
};





export {
    getAllAcademico_Solicitudes,
    getSolicitud_AcademicoById,
    addSolicitud_Academico,
    deleteSolicitud_Academico,
    updateSolicitud_Academico,
    obtenerIdHorario
};