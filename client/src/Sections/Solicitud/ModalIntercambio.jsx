import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModalIntercambio = ({ selectedSolicitud, closeModal, fk_alumno_a, fk_alumno_b, setSolicitud }) => {
    const [asignaturasA, setAsignaturasA] = useState([]);
    const [asignaturasB, setAsignaturasB] = useState([]);
    const [seccionA, setSeccionA] = useState(null);
    const [seccionB, setSeccionB] = useState(null);
    const [idHorarioA, setIdHorarioA] = useState(null);
    const [idHorarioB, setIdHorarioB] = useState(null);

    const { fk_seccion_asignatura } = selectedSolicitud;

    // Obtener el id_horario de alumno A
    useEffect(() => {
        axios.get(`http://localhost:8800/academico_solicitudes/horario/${fk_alumno_a}/${fk_seccion_asignatura}`)
            .then(response => {
                setIdHorarioA(response.data.id_horario);
            })
            .catch(error => {
                console.error('Error al obtener el id_horario de alumno A:', error);
            });
    }, [fk_alumno_a, fk_seccion_asignatura]);

    // Obtener las asignaturas de alumno B
    useEffect(() => {
        axios.get(`http://localhost:8800/horario_alumnos/${fk_alumno_b}`)
            .then(response => {
                setAsignaturasB(response.data);
            })
            .catch(error => {
                console.error('Error al obtener asignaturas de alumno B:', error);
            });
    }, [fk_alumno_b]);

    // Obtener asignaturas de alumno A
    useEffect(() => {
        axios.get(`http://localhost:8800/asignatura_secciones/id/${fk_seccion_asignatura}`)
            .then(response => {
                setAsignaturasA(response.data);
                setSeccionA(response.data.id_asignatura_seccion);
            })
            .catch(error => {
                console.error('Error al obtener la asignatura de alumno A:', error);
            });
    }, [fk_seccion_asignatura]);

    const handleSelectSeccionB = (e) => {
        const selectedFkSeccion = e.target.value;
        setSeccionB(selectedFkSeccion);

        axios.get(`http://localhost:8800/academico_solicitudes/horario/${fk_alumno_b}/${selectedFkSeccion}`)
            .then(response => {
                setIdHorarioB(response.data.id_horario);
            })
            .catch(error => {
                console.error('Error al obtener el id_horario de alumno B:', error);
            });
    };

    const handleIntercambiar = () => {
        if (!seccionA || !seccionB || !idHorarioA || !idHorarioB) {
            alert("Por favor selecciona las secciones de ambos alumnos y asegúrate de que los horarios estén definidos.");
            return;
        }

        const intercambioDataA = {
            fk_seccion_asignatura: parseInt(seccionB, 10), // Asegúrate de que se está asignando la sección correcta a cada alumno
            fk_alumno: fk_alumno_a,  // Aquí es alumno A, no B
            id_horario: idHorarioA,
        };

        const intercambioDataB = {
            fk_seccion_asignatura: parseInt(seccionA, 10),  // Aquí asigna la sección del alumno A a B
            fk_alumno: fk_alumno_b,  // Y viceversa
            id_horario: idHorarioB,
        };

        // Primero intentamos la actualización del primer alumno
        axios.put(`http://localhost:8800/horario_alumnos/${fk_alumno_a}/${idHorarioA}`, intercambioDataA)
            .then(responseA => {
                console.log('Respuesta A:', responseA);

                // Ahora actualizamos el segundo alumno, sólo si la primera solicitud fue exitosa
                return axios.put(`http://localhost:8800/horario_alumnos/${fk_alumno_b}/${idHorarioB}`, intercambioDataB);
            })
            .then(responseB => {
                console.log('Respuesta B:', responseB);

                // Si ambas solicitudes fueron exitosas, se actualizan las solicitudes en el frontend
                setSolicitud((prevSolicitudes) =>
                    prevSolicitudes.filter(solicitud => solicitud.id_solicitud !== selectedSolicitud.id_solicitud)
                );

                alert("Intercambio realizado con éxito.");
                closeModal();
            })
            .catch(error => {
                console.error('Error al realizar el intercambio:', error);
                alert("Hubo un error al realizar el intercambio.");
            });
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="modal-content bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                <span
                    className="close text-2xl font-bold absolute top-2 right-2 cursor-pointer text-gray-700"
                    onClick={closeModal}
                >
                    &times;
                </span>

                <h2 className="text-2xl font-semibold text-center mb-6">Intercambiar Sección</h2>

                <div className="mb-4">
                    <h3 className="text-lg font-medium">Selecciona la sección para el alumno A: ${fk_alumno_a}:</h3>
                    <select
                        onChange={(e) => setSeccionA(e.target.value)}
                        value={seccionA}
                        className="w-full p-2 mt-2 border rounded-lg"
                    >
                        <option value="">Selecciona una asignatura</option>
                        {Array.isArray(asignaturasA) && asignaturasA.map((asignatura) => (
                            <option key={asignatura.id_asignatura_seccion} value={asignatura.id_asignatura_seccion}>
                                {asignatura.nombreRelacion}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium">Selecciona la sección para el alumno B: ${fk_alumno_b}:</h3>
                    <select
                        onChange={handleSelectSeccionB}
                        value={seccionB}
                        className="w-full p-2 mt-2 border rounded-lg"
                    >
                        <option value="">Selecciona una asignatura</option>
                        {Array.isArray(asignaturasB) && asignaturasB.map(asignatura => (
                            <option key={asignatura.fk_seccion_asignatura} value={asignatura.fk_seccion_asignatura}>
                                {asignatura.nombreRelacion} - {asignatura.nombreAsignatura}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleIntercambiar}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Intercambiar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalIntercambio;
