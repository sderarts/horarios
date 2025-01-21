import DiaBloque from '../../../models/asignaturas/seccion/diaBloqueModel.js'

const getAllDias_Bloques = (req, res) => {
    DiaBloque.getAllDias_Bloques((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getDia_BloqueById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    DiaBloque.getDia_BloqueById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addDia_Bloque = (req, res) => {
    const { id_dia_bloque, fk_dia, fk_bloque, nombreRelacion } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!id_dia_bloque || !fk_dia || !fk_bloque || !nombreRelacion) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (id_dia_bloque, fk_dia, fk_bloque, nombreRelacion)' });
    }

    const diaData = { id_dia_bloque, fk_dia, fk_bloque, nombreRelacion };  // Creamos el objeto con los datos a insertar

    DiaBloque.createDia_Bloque(diaData, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al crear la relación', error: err });
        return res.status(201).json(data);  // Respondemos con el dato creado
    });
};

const deleteDia_Bloque = (req, res) => {
    const id = req.params.id;

    DiaBloque.deleteDia_Bloque(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateDia_Bloque = (req, res) => {
    const id = req.params.id;
    const { fk_dia, fk_bloque, nombreRelacion } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_dia || !fk_bloque || !nombreRelacion) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_dia, fk_bloque, nombreRelacion)' });
    }

    DiaBloque.updateDia_Bloque(id, fk_dia, fk_bloque, nombreRelacion, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};

export {
    getAllDias_Bloques,
    getDia_BloqueById,
    addDia_Bloque,
    deleteDia_Bloque,
    updateDia_Bloque
};