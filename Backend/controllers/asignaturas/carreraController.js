
import Carrera from '../../models/asignaturas/carreraModel.js';

const getCarreras = (req, res) => {
    Carrera.getAllCarreras((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

const addCarrera = (req, res) => {
    const carreraData = req.body;
    Carrera.createCarrera(carreraData, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(data);
    });
};

const deleteCarrera = (req, res) => {
    const id = req.params.id;
    Carrera.deleteCarrera(id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha eliminado exitosamente.");
    });
};

const updateCarrera = (req, res) => {
    const id = req.params.id;
    const { nombreCarrera } = req.body;
    Carrera.updateCarrera(id, nombreCarrera, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha actualizado exitosamente.");
    });
};

export {
    getCarreras,
    addCarrera,
    deleteCarrera,
    updateCarrera
};