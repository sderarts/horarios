
import Nivel from '../../models/asignaturas/nivelModel.js';

const getNiveles = (req, res) => {
    Nivel.getAllNiveles((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

const addNivel = (req, res) => {
    const nivelData = req.body;
    Nivel.createNivel(nivelData, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(data);
    });
};

const deleteNivel = (req, res) => {
    const id = req.params.id;
    Nivel.deleteNivel(id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha eliminado exitosamente.");
    });
};

const updateNivel = (req, res) => {
    const id = req.params.id;
    const { nombreNivel } = req.body;
    Nivel.updateNivel(id, nombreNivel, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha actualizado exitosamente.");
    });
};

export {
    getNiveles,
    addNivel,
    deleteNivel,
    updateNivel
};