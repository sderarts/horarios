import Nivel_Asignatura from '../../models/asignaturas/nivelAsignaturaModel.js'

const getAllNiveles_Asignaturas = (req, res) => {
    Nivel_Asignatura.getAllNiveles_Asignaturas((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getNivel_AsignaturaById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Nivel_Asignatura.getNivel_AsignaturaById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addNivel_Asignatura = (req, res) => {
    const { fk_nivel, fk_asignatura, relacionNombre } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_nivel || !fk_asignatura || !relacionNombre) {
        return res.status(400).json({ message: 'Faltan datos obligatorios ( fk_nivel, fk_asignatura,  relacionNombre)' });
    }

    const carrera_NivelData = { fk_nivel, fk_asignatura, relacionNombre };  // Creamos el objeto con los datos a insertar

    Nivel_Asignatura.createNivel_Asignatura(carrera_NivelData, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al crear la relación', error: err });
        return res.status(201).json(data);  // Respondemos con el dato creado
    });
};

const deleteNivel_Asignatura = (req, res) => {
    const id = req.params.id;

    Nivel_Asignatura.deleteNivel_Asignatura(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateNivel_Asignatura = (req, res) => {
    const id = req.params.id;
    const { fk_asignatura, fk_nivel, relacionNombre } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_asignatura || !fk_nivel || !relacionNombre) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_asignatura, fk_nivel, relacionNombre)' });
    }

    Nivel_Asignatura.updateNivel_Asignatura(id, fk_asignatura, fk_nivel, relacionNombre, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};

export {
    getAllNiveles_Asignaturas,
    getNivel_AsignaturaById,
    addNivel_Asignatura,
    deleteNivel_Asignatura,
    updateNivel_Asignatura
};