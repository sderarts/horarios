
import Carrera from '../../models/asignaturas/carreraModel.js';

const getCarreras = (req, res) => {
    Carrera.getAllCarreras((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.rows);
    });
};

const getCarrera_ById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Carrera.getCarrera_ById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data.rows);  // Devolvemos los datos de la sección encontrada
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
    const { nombrecarrera } = req.body;
    Carrera.updateCarrera(id, nombrecarrera, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha actualizado exitosamente.");
    });
};

export {
    getCarreras,
    getCarrera_ById,
    addCarrera,
    deleteCarrera,
    updateCarrera
};