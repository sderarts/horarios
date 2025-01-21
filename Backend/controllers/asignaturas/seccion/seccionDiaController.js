import SeccionDia from '../../../models/asignaturas/seccion/seccionDiaModel.js'

const getAllSecciones_Dias = (req, res) => {
    SeccionDia.getAllSecciones_Dias((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getSeccion_DiaById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    SeccionDia.getSeccion_DiaById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addSeccion_Dia = (req, res) => {
    const { id_seccion_dia, fk_seccion, fk_dia, nombreRelacion } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!id_seccion_dia || !fk_seccion || !fk_dia || !nombreRelacion) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (id_seccion_dia, fk_seccion, fk_dia, nombreRelacion)' });
    }

    const diaData = { id_seccion_dia, fk_seccion, fk_dia, nombreRelacion };  // Creamos el objeto con los datos a insertar

    SeccionDia.createSeccion_Dia(diaData, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al crear la relación', error: err });
        return res.status(201).json(data);  // Respondemos con el dato creado
    });
};

const deleteSeccion_Dia = (req, res) => {
    const id = req.params.id;

    SeccionDia.deleteSeccion_Dia(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateSeccion_Dia = (req, res) => {
    const id = req.params.id;
    const { fk_seccion, fk_dia, nombreRelacion } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_seccion || !fk_dia || !nombreRelacion) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_seccion, fk_dia, nombreRelacion)' });
    }

    SeccionDia.updateSeccion_Dia(id, fk_seccion, fk_dia, nombreRelacion, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};

export {
    getAllSecciones_Dias,
    getSeccion_DiaById,
    addSeccion_Dia,
    deleteSeccion_Dia,
    updateSeccion_Dia
};