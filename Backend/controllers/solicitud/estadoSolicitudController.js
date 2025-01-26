import EstadoSolicitud from '../../models/solicitud/estadoSolicitudModel.js'

const getEstados_Solicitudes = (req, res) => {
    EstadoSolicitud.getEstados_Solicitudes((err, data) => {
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

export {
    getEstados_Solicitudes,
    getEstado_SolicitudById
};