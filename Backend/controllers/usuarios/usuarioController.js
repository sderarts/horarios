import Usuario from '../../models/usuarios/usuarioModel.js'

const getAllAlumnos = (req, res) => {
    Usuario.getAllAlumnos((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

const getAllAcademicos = (req, res) => {
    Usuario.getAllAcademicos((err, data) => {
        if (err) return res.status(500).json({ message: 'Error en la base de datos', error: err });
        return res.status(200).json(data);
    });
};

export {
    getAllAlumnos,
    getAllAcademicos
};