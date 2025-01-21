import Seccion from '../../../models/asignaturas/seccion/seccionModel.js'

const getAllSecciones = (req, res) => {
    Seccion.getAllSecciones((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

const getSeccionById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    // Llamamos al modelo para obtener la sección por ID
    Seccion.getSeccionById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addSeccion = (req, res) => {
    const seccionData = req.body;
    Seccion.createSeccion(seccionData, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(data);
    });
};

const deleteSeccion = (req, res) => {
    const id = req.params.id;
    Seccion.deleteSeccion(id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha eliminado exitosamente.");
    });
};

const updateSeccion = (req, res) => {
    const id = req.params.id;
    const { nombreSeccion, capacidad, inscripciones } = req.body;
    Seccion.updateSeccion(id, nombreSeccion, capacidad, inscripciones, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha actualizado exitosamente.");
    });
};

export {
    getAllSecciones,
    getSeccionById,
    addSeccion,
    deleteSeccion,
    updateSeccion
};