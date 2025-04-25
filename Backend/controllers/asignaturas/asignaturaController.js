
import Asignatura from '../../models/asignaturas/asignaturaModel.js';

const getAsignatura = (req, res) => {
    Asignatura.getAllAsignaturas((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.rows);
    });
};
const getAsignatura2 = (req, res) => {
    Asignatura.getAllAsignaturas2((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.rows);
    });
};

const getAsignaturaById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Asignatura.getAsignaturaById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addAsignatura = (req, res) => {
    const asignaturaData = req.body;
    Asignatura.createAsignatura(asignaturaData, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(data);
    });
};

const deleteAsignatura = (req, res) => {
    const id = req.params.id;
    Asignatura.deleteAsignatura(id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha eliminado exitosamente.");
    });
};

const updateAsignatura = (req, res) => {
    const id = req.params.id;
    const { nombreAsignatura } = req.body;
    Asignatura.updateAsignatura(id, nombreAsignatura, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha actualizado exitosamente.");
    });
};

export {
    getAsignatura,
    getAsignatura2,
    getAsignaturaById,
    addAsignatura,
    deleteAsignatura,
    updateAsignatura
};