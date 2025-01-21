
import Asignatura from '../../models/asignaturas/asignaturaModel.js';

const getAsignatura = (req, res) => {
    Asignatura.getAllAsignaturas((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
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
    addAsignatura,
    deleteAsignatura,
    updateAsignatura
};