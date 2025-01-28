import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModalIntercambio = ({ selectedSolicitud, closeModal, fkAcademico }) => {
    const [asignaturasA, setAsignaturasA] = useState([]);
    const [asignaturasB, setAsignaturasB] = useState([]);
    const [seccionA, setSeccionA] = useState(null);
    const [seccionB, setSeccionB] = useState(null);

    useEffect(() => {
        // Cargar las asignaturas de ambos alumnos cuando se abre el modal
        const { fk_alumno_b } = selectedSolicitud;

        // Obtener asignaturas de alumno A (deberías agregar la lógica para esto)
        axios.get(`http://localhost:8800/horario_alumnos/${fkAcademico}`)
            .then(response => {
                setAsignaturasA(response.data);
            });

        // Obtener asignaturas de alumno B
        axios.get(`http://localhost:8800/horario_alumnos/${fk_alumno_b}`)
            .then(response => {
                setAsignaturasB(response.data);
            });
    }, [selectedSolicitud, fkAcademico]);

    const handleIntercambiar = async () => {
        try {
            const response = await axios.put(`http://localhost:8800/solicitudes/intercambiar/${selectedSolicitud.id_solicitud}`, {
                fk_seccion_asignatura_a: seccionA,
                fk_seccion_asignatura_b: seccionB,
            });
            console.log("Intercambio realizado con éxito:", response.data);
            alert("Intercambio realizado con éxito.");
            closeModal();  // Cerrar modal después de realizar el intercambio
        } catch (error) {
            console.error('Error al realizar el intercambio:', error);
            alert("Hubo un error al realizar el intercambio.");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Intercambiar Sección</h2>
                <div>
                    <h3>Selecciona la sección para el alumno A:</h3>
                    <select onChange={(e) => setSeccionA(e.target.value)} value={seccionA}>
                        <option value="">Selecciona una asignatura</option>
                        {asignaturasA.map(asignatura => (
                            <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                                {asignatura.nombre_asignatura} - {asignatura.nombre_seccion}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <h3>Selecciona la sección para el alumno B:</h3>
                    <select onChange={(e) => setSeccionB(e.target.value)} value={seccionB}>
                        <option value="">Selecciona una asignatura</option>
                        {asignaturasB.map(asignatura => (
                            <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                                {asignatura.nombre_asignatura} - {asignatura.nombre_seccion}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={handleIntercambiar}>Intercambiar</button>
            </div>
        </div>
    );
};

export default ModalIntercambio;
