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

const intercambiarSecciones = async (req, res) => {
    const id_solicitud = req.params.id; // Verificar que esté llegando correctamente
    console.log("ID Solicitud:", id_solicitud);
    const { new_seccion_alumno_b } = req.body; // Verificar la nueva sección
    console.log("Nueva sección para Alumno B:", new_seccion_alumno_b);

    try {
        await intercambiarSeccionesDeAlumno(id_solicitud, new_seccion_alumno_b);
        res.status(200).json({ message: 'Intercambio realizado con éxito.' });
    } catch (error) {
        console.error("Error al intercambiar secciones:", error);
        res.status(500).json({ message: 'Hubo un problema al realizar el intercambio', error });
    }
};


export {
    getAllAcademico_Solicitudes,
    getSolicitud_AcademicoById,
    addSolicitud_Academico,
    deleteSolicitud_Academico,
    updateSolicitud_Academico,
    intercambiarSecciones
};