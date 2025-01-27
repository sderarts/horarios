import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAsignaturaSeccion from './AddAsignaturaSeccion';

function AsignaturasSecciones() {
    const [asignaturaSeccion, setAsignaturaSeccion] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [idAsignaturaSeccionToDelete, setIdAsignaturaSeccionToDelete] = useState(null);
    const [idAsignaturaSeccionToEdit, setIdAsignaturaSeccionToEdit] = useState(null);

    // Estado para cargar las asignaturas y secciones en el modal de edición
    const [asignaturas, setAsignaturas] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [asignaturaSeccionToEdit, setAsignaturaSeccionToEdit] = useState({
        nombreRelacion: "",
        nombreDocente: "",
        fk_asignatura: "",
        fk_seccion: ""
    });

    useEffect(() => {
        // Obtener las asignaturas y secciones
        const fetchAsignaturasSecciones = async () => {
            try {
                const [asignaturasRes, seccionesRes] = await Promise.all([
                    axios.get("http://localhost:8800/asignaturas"),
                    axios.get("http://localhost:8800/secciones")
                ]);
                setAsignaturas(asignaturasRes.data);
                setSecciones(seccionesRes.data);
            } catch (error) {
                console.error("Error al cargar asignaturas o secciones:", error);
            }
        };

        fetchAsignaturasSecciones();
    }, []);

    // useEffect para cargar asignaturas-secciones al cargar el componente
    useEffect(() => {
        const fetchAsignaturaSecciones = async () => {
            try {
                const response = await axios.get("http://localhost:8800/asignatura_secciones");
                console.log("Datos de asignaturaSeccion:", response.data); // Ver los datos
                setAsignaturaSeccion(response.data); // Establecer los datos en el estado
            } catch (error) {
                console.error("Error al obtener los registros de asignaturaSeccion", error);
            }
        };

        fetchAsignaturaSecciones();
    }, []); // Solo se ejecuta al cargar el componente

    // Función para eliminar
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8800/asignatura_secciones/${idAsignaturaSeccionToDelete}`);
            setAsignaturaSeccion(asignaturaSeccion.filter(e => e.id_asignatura_seccion !== idAsignaturaSeccionToDelete));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error al eliminar asignatura-sección:", error);
        }
    };

    // Función para actualizar la asignatura-sección
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8800/asignatura_secciones/${idAsignaturaSeccionToEdit}`, asignaturaSeccionToEdit);
            setAsignaturaSeccion(asignaturaSeccion.map(e =>
                e.id_asignatura_seccion === idAsignaturaSeccionToEdit
                    ? { ...e, ...asignaturaSeccionToEdit }
                    : e
            ));
            setShowEditModal(false);
        } catch (error) {
            console.error("Error al actualizar asignatura-sección:", error);
        }
    };

    // Abrir modal de eliminación
    const openDeleteModal = (id) => {
        setIdAsignaturaSeccionToDelete(id);
        setShowDeleteModal(true);
    };

    // Abrir modal de edición
    const openEditModal = (id) => {
        setIdAsignaturaSeccionToEdit(id);
        setShowEditModal(true);
    };

    return (
        <div className='flex flex-row bg-amber-400'>
            <div className="p-12 ">
            <div className='w-full justify-center items-center p-4'>
                    <p className='text-black font-semibold text-xl'>Editar Asignatura-Sección</p>
                </div>
                {asignaturaSeccion.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black bg-black">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Nombre relación</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Asignatura</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Sección</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Docente</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Actualizar</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {asignaturaSeccion.map((e) => (
                                    <tr key={e.id_asignatura_seccion} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                        <td className="px-6 py-4 font-semibold bg-black text-white" >
                                            {e.id_asignatura_seccion} - {e.nombreRelacion}
                                        </td>
                                        <td className="px-6 py-4 font-semibold">
                                            {e.nombreAsignatura}
                                        </td>
                                        <td className="px-6 py-4 font-semibold">
                                            {e.nombreSeccion}
                                        </td>
                                        <td className="px-6 py-4 font-semibold">
                                            {e.nombreDocente}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="font-bold text-blue-600 dark:text-blue-500 hover:underline"
                                                onClick={() => openEditModal(e.id_asignatura_seccion)}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                                onClick={() => openDeleteModal(e.id_asignatura_seccion)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No hay asignaturas disponibles.</p>
                )}
            </div>

            {/* Modal de eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                        <h2 className="text-lg font-bold">¿Confirmar eliminación?</h2>
                        <p>¿Seguro que deseas eliminar esta asignatura-sección?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="mr-2 bg-red-600 text-white p-2 rounded"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                            <button
                                className="bg-gray-400 text-white p-2 rounded"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de edición */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                        <h2 className="text-lg font-bold">Actualizar asignatura-sección</h2>
                        <div className="mb-4">
                            <label className="block">Nombre relación</label>
                            <input
                                type="text"
                                value={asignaturaSeccionToEdit.nombreRelacion}
                                onChange={(e) => setAsignaturaSeccionToEdit({ ...asignaturaSeccionToEdit, nombreRelacion: e.target.value })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Nombre docente</label>
                            <input
                                type="text"
                                value={asignaturaSeccionToEdit.nombreDocente}
                                onChange={(e) => setAsignaturaSeccionToEdit({ ...asignaturaSeccionToEdit, nombreDocente: e.target.value })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block">Asignatura</label>
                            <select
                                value={asignaturaSeccionToEdit.fk_asignatura}
                                onChange={(e) => setAsignaturaSeccionToEdit({ ...asignaturaSeccionToEdit, fk_asignatura: e.target.value })}
                                className="w-full border rounded p-2"
                            >
                                <option value="">Selecciona asignatura</option>
                                {asignaturas.map(asignatura => (
                                    <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                                        {asignatura.nombreAsignatura}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block">Sección</label>
                            <select
                                value={asignaturaSeccionToEdit.fk_seccion}
                                onChange={(e) => setAsignaturaSeccionToEdit({ ...asignaturaSeccionToEdit, fk_seccion: e.target.value })}
                                className="w-full border rounded p-2"
                            >
                                <option value="">Selecciona sección</option>
                                {secciones.map(seccion => (
                                    <option key={seccion.id_seccion} value={seccion.id_seccion}>
                                        {seccion.nombreSeccion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="mr-2 bg-teal-500 text-white p-2 rounded"
                                onClick={handleUpdate}
                            >
                                Actualizar
                            </button>
                            <button
                                className="bg-gray-400 text-white p-2 rounded"
                                onClick={() => setShowEditModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AddAsignaturaSeccion />
        </div>
    );
}

export default AsignaturasSecciones;
