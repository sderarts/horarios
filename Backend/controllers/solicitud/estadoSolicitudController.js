import EstadoSolicitud from '../../models/solicitud/estadoSolicitudModel.js'

const getAllEstados_Solicitudes = (req, res) => {
    EstadoSolicitud.getAllEstados_Solicitudes((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getEstado_SolicitudById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    EstadoSolicitud.getEstado_SolicitudById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addEstado_Solicitud = (req, res) => {
    const {  fk_academico, nombreEstado, mensajeSolicitud } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_academico || !nombreEstado || !mensajeSolicitud) {
        return res.status(400).json({ message: 'Faltan datos obligatorios ( fk_academico, nombreEstado, mensajeSolicitud)' });
    }

    const estado_SolicitudData = {  fk_academico, nombreEstado, mensajeSolicitud };  // Creamos el objeto con los datos a insertar

    EstadoSolicitud.createEstado_Solicitud(estado_SolicitudData, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al crear la relación', error: err });
        return res.status(201).json(data);  // Respondemos con el dato creado
    });
};

const deleteEstado_Solicitud = (req, res) => {
    const id = req.params.id;

    EstadoSolicitud.deleteEstado_Solicitud(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateEstado_Solicitud = (req, res) => {
    const id = req.params.id;
    const { fk_alumno, fk_academico, nombreEstado, mensajeSolicitud } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_alumno || !fk_academico || !nombreEstado || !mensajeSolicitud) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_alumno, fk_academico, nombreEstado, mensajeSolicitud)' });
    }

    EstadoSolicitud.updateEstado_Solicitud(id, fk_alumno, fk_academico, nombreEstado, mensajeSolicitud, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};

export {
    getAllEstados_Solicitudes,
    getEstado_SolicitudById,
    addEstado_Solicitud,
    deleteEstado_Solicitud,
    updateEstado_Solicitud
};