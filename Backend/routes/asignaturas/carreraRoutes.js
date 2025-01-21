// routes/carreraRoutes.js
import express from 'express';
const router = express.Router();
import * as carreraController from '../../controllers/asignaturas/carreraController.js';

// Ruta para obtener todas las carreras
router.get('/', carreraController.getCarreras);

// Ruta para agregar una nueva carrera
router.post('/', carreraController.addCarrera);

// Ruta para eliminar una carrera por ID
router.delete('/:id', carreraController.deleteCarrera);

// Ruta para actualizar una carrera por ID
router.put('/:id', carreraController.updateCarrera);

export default router;