import Solicitud from '../../models/solicitud/solicitudModel.js'

const getAllSolicitudes = (req, res) => {
    Solicitud.getAllSolicitudes((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};
const getAllSolicitudes2 = (req, res) => {
    Solicitud.getAllSolicitudes2((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getSolicitudById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Solicitud.getSolicitudById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addSolicitud = (req, res) => {
    const { fk_tipo_solicitud, fk_alumno, fk_seccion_asignatura } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_tipo_solicitud || !fk_alumno || !fk_seccion_asignatura) {
        return res.status(400).json({ message: 'Faltan datos obligatorios ( fk_tipo_solicitud, fk_alumno,  fk_seccion_asignatura)' });
    }

    const SolicitudData = { fk_tipo_solicitud, fk_alumno, fk_seccion_asignatura };  // Creamos el objeto con los datos a insertar

    Solicitud.createSolicitud(SolicitudData, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al crear la relación', error: err });
        return res.status(201).json(data);  // Respondemos con el dato creado
    });
};

const deleteSolicitud = (req, res) => {
    const id = req.params.id;

    Solicitud.deleteSolicitud(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateSolicitud = (req, res) => {
    const id = req.params.id;
    const { fk_alumno, fk_alumno_b, fk_tipo_solicitud, fk_seccion_asignatura } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_alumno || !fk_alumno_b || !fk_tipo_solicitud || !fk_seccion_asignatura) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_alumno, fk_alumno_b, fk_tipo_solicitud, fk_seccion_asignatura)' });
    }

    // Si fk_alumno_b no está presente, lo asignamos a null
    if (!fk_alumno_b) {
        fk_alumno_b = null;  // Esto es importante si el campo es opcional
    }

    // Llamamos al modelo para actualizar la solicitud
    Solicitud.updateSolicitud(id, fk_alumno, fk_alumno_b, fk_tipo_solicitud, fk_seccion_asignatura, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};

export {
    getAllSolicitudes,
    getAllSolicitudes2,
    getSolicitudById,
    addSolicitud,
    deleteSolicitud,
    updateSolicitud
};