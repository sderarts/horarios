import Carrera_Nivel from '../../models/asignaturas/carreraNivelModel.js'

const getAllCarreras_Niveles = (req, res) => {
    Carrera_Nivel.getAllCarreras_Niveles((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getCarrera_NivelById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Carrera_Nivel.getCarrera_NivelById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addCarrera_Nivel = (req, res) => {
    const { id_carrera_nivel, fk_carrera, fk_nivel, relacionNombre } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!id_carrera_nivel || !fk_carrera || !fk_nivel || !relacionNombre) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (id_carrera_nivel, fk_carrera, fk_nivel, relacionNombre)' });
    }

    const carrera_NivelData = { id_carrera_nivel, fk_carrera, fk_nivel, relacionNombre };  // Creamos el objeto con los datos a insertar

    Carrera_Nivel.createCarrera_Nivel(carrera_NivelData, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al crear la relación', error: err });
        return res.status(201).json(data);  // Respondemos con el dato creado
    });
};

const deleteCarrera_Nivel = (req, res) => {
    const id = req.params.id;

    Carrera_Nivel.deleteCarrera_Nivel(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateCarrera_Nivel = (req, res) => {
    const id = req.params.id;
    const { fk_carrera, fk_nivel, relacionNombre } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_carrera || !fk_nivel || !relacionNombre) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_carrera, fk_nivel, relacionNombre)' });
    }

    Carrera_Nivel.updateCarrera_Nivel(id, fk_carrera, fk_nivel, relacionNombre, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};

export {
    getAllCarreras_Niveles,
    getCarrera_NivelById,
    addCarrera_Nivel,
    deleteCarrera_Nivel,
    updateCarrera_Nivel
};