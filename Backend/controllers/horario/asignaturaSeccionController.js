import Asignatura_Seccion from '../../models/horario/asignaturaSeccionModel.js'

const getAllAsignaturas_Secciones = (req, res) => {
    Asignatura_Seccion.getAllAsignaturas_Secciones((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data.rows);
    });
};

const getAsignatura_SeccionById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Asignatura_Seccion.getAsignatura_SeccionById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data.rows);  // Devolvemos los datos de la sección encontrada
    });
};
const getAsignatura_SeccionById2 = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Asignatura_Seccion.getAsignatura_SeccionById2(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const getAsignatura_SeccionByAlumno = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Asignatura_Seccion.getAsignatura_SeccionByAlumno(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addAsignatura_Seccion = (req, res) => {
    const { fk_seccion, fk_asignatura, nombrerelacion, nombredocente } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_seccion || !fk_asignatura || !nombrerelacion || !nombredocente) {
        return res.status(400).json({ message: 'Faltan datos obligatorios ( fk_seccion, fk_asignatura,  nombrerelacion, nombredocente)' });
    }

    const carrera_NivelData = { fk_seccion, fk_asignatura, nombrerelacion, nombredocente };  // Creamos el objeto con los datos a insertar

    Asignatura_Seccion.createAsignatura_Seccion(carrera_NivelData, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al crear la relación', error: err });
        return res.status(201).json(data);  // Respondemos con el dato creado
    });
};

const deleteAsignatura_Seccion = (req, res) => {
    const id = req.params.id;

    Asignatura_Seccion.deleteAsignatura_Seccion(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateAsignatura_Seccion = (req, res) => {
    const id = req.params.id;
    const { fk_asignatura, fk_seccion, nombrerelacion, nombredocente } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_asignatura || !fk_seccion || !nombrerelacion || !nombredocente) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_asignatura, fk_seccion, nombrerelacion, nombredocente)' });
    }

    Asignatura_Seccion.updateAsignatura_Seccion(id, fk_asignatura, fk_seccion, nombrerelacion, nombredocente, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};

export {
    getAllAsignaturas_Secciones,
    getAsignatura_SeccionById,
    getAsignatura_SeccionById2,
    getAsignatura_SeccionByAlumno,
    addAsignatura_Seccion,
    deleteAsignatura_Seccion,
    updateAsignatura_Seccion
};