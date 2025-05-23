import Seccion from '../../../models/asignaturas/seccion/seccionModel.js'
import db from '../../../config/db.js'

const getAllSecciones = (req, res) => {
    Seccion.getAllSecciones((err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.rows);
    });
};

const getSeccionById = (req, res) => {
    const id = req.params.id;  // Obtener el ID desde los parámetros de la URL

    // Llamamos al modelo para obtener la sección por ID
    Seccion.getSeccionById(id, (err, data) => {
        if (err) {
            if (err.message === 'Sección no encontrada') {
                return res.status(404).json({ message: err.message });  // Si no se encuentra la sección
            }
            return res.status(500).json({ message: 'Error en la base de datos', error: err });
        }

        return res.status(200).json(data);  // Devolvemos los datos de la sección encontrada
    });
};

const addSeccion = (req, res) => {
    const seccionData = req.body;
    Seccion.createSeccion(seccionData, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(data);
    });
};

const deleteSeccion = (req, res) => {
    const id = req.params.id;
    Seccion.deleteSeccion(id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha eliminado exitosamente.");
    });
};

const updateSeccion = (req, res) => {
    const id = req.params.id;
    const { nombreseccion, capacidad, inscripciones } = req.body;
    Seccion.updateSeccion(id, nombreseccion, capacidad, inscripciones, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Se ha actualizado exitosamente.");
    });
};

const updateInscripcion = (req, res) => {
    const id = req.params.id;
    const { nombreseccion, capacidad } = req.body;

    // 1. Primero obtenemos el valor actual de 'inscripciones' y 'capacidad' de la base de datos
    db.query('SELECT inscripciones, capacidad FROM seccion WHERE id_seccion = $1', [id], (err, result) => {
        if (err) return res.status(500).json(err);
    
        // Mostrar el contenido de 'result' para depuración
        console.log('Resultado de la consulta:', result);
    
        // Si no se encuentra la sección, retornamos un error
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Sección no encontrada." });
        }
    
        const currentInscripciones = result.rows[0].inscripciones; // Acceder a result.rows[0]
        const currentCapacidad = result.rows[0].capacidad; // Acceder a result.rows[0]
    
        console.log("Inscripciones actuales:", currentInscripciones);
        console.log("Capacidad actual:", currentCapacidad);
    
        // 2. Verificamos si las inscripciones han alcanzado o superado la capacidad
        if (currentInscripciones >= currentCapacidad) {
            return res.status(400).json({ message: "No hay capacidad suficiente para esta sección." });
        }
    
        // 3. Si no hemos llegado al límite, incrementamos las inscripciones
        const inscripciones = currentInscripciones + 1;
    
        // 4. Llamamos al modelo para actualizar la sección
        Seccion.updateSeccion(id, nombreseccion, capacidad, inscripciones, (updateErr, data) => {
            if (updateErr) return res.status(500).json(updateErr);
    
            return res.status(200).json("Sección actualizada exitosamente.");
        });
    });    
};


export {
    getAllSecciones,
    getSeccionById,
    addSeccion,
    deleteSeccion,
    updateSeccion,
    updateInscripcion
};