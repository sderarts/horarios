import Bloque from '../../../models/asignaturas/seccion/bloqueModel.js'

const getAllBloques = (req, res) => {
    Bloque.getAllBloques((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

const getBloqueById = (req, res) => {
    const id = req.params.id;
    Bloque.getBloqueById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);
    });
};

const addBloque = (req, res) => {
    const bloqueData = req.body;
    Bloque.createBloque(bloqueData, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(data);
    });
};

const deleteBloque = (req, res) => {
    const id = req.params.id;
    Bloque.deleteBloque(id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha eliminado exitosamente.");
    });
};

const updateBloque = (req, res) => {
    const id = req.params.id;
    const { nombreBloqueHora } = req.body;
    Bloque.updateBloque(id, nombreBloqueHora, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha actualizado exitosamente.");
    });
};

export {
    getAllBloques,
    getBloqueById,
    addBloque,
    deleteBloque,
    updateBloque
};