import Dia from '../../../models/asignaturas/seccion/diaModel.js'

const getAllDias = (req, res) => {
    Dia.getAllDias((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

const getDiaById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    // Llamamos al modelo para obtener la sección por ID
    Dia.getDiaById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addDia = (req, res) => {
    const diaData = req.body;
    Dia.createDia(diaData, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(data);
    });
};

const deleteDia = (req, res) => {
    const id = req.params.id;
    Dia.deleteDia(id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha eliminado exitosamente.");
    });
};

const updateDia = (req, res) => {
    const id = req.params.id;
    const { nombreDia, capacidad, inscripciones } = req.body;
    Dia.updateDia(id, nombreDia, capacidad, inscripciones, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha actualizado exitosamente.");
    });
};

export {
    getAllDias,
    getDiaById,
    addDia,
    deleteDia,
    updateDia
};