import Horario_Alumno from '../../models/horario/horarioAlumnoModel.js'

const getAllHorarios_Alumnos = (req, res) => {
    Horario_Alumno.getAllHorarios_Alumnos((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getHorario_AlumnoById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    Horario_Alumno.getHorario_AlumnoById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addHorario_Alumno = (req, res) => {
    const { id_horario, fk_horario, fk_alumno } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!id_horario || !fk_horario || !fk_alumno) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (id_horario, fk_horario, fk_alumno)' });
    }

    const carrera_NivelData = { id_horario, fk_horario, fk_alumno };  // Creamos el objeto con los datos a insertar

    Horario_Alumno.createHorario_Alumno(carrera_NivelData, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al crear la relación', error: err });
        return res.status(201).json(data);  // Respondemos con el dato creado
    });
};

const deleteHorario_Alumno = (req, res) => {
    const id = req.params.id;

    Horario_Alumno.deleteHorario_Alumno(id, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la relación', error: err });
        return res.status(200).json({ message: 'Se ha eliminado exitosamente.' });
    });
};

const updateHorario_Alumno = (req, res) => {
    const id = req.params.id;
    const { fk_alumno, fk_horario } = req.body;  // Recibimos las claves foráneas y otros datos

    // Verificamos que los valores obligatorios estén presentes
    if (!fk_alumno || !fk_horario) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (fk_alumno, fk_horario)' });
    }

    Horario_Alumno.updateHorario_Alumno(id, fk_alumno, fk_horario, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la relación', error: err });
        return res.status(200).json({ message: 'Se ha actualizado exitosamente.' });
    });
};

export {
    getAllHorarios_Alumnos,
    getHorario_AlumnoById,
    addHorario_Alumno,
    deleteHorario_Alumno,
    updateHorario_Alumno
};