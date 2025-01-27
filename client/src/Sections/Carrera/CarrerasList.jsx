import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import AddCarrera from './AddCarrera';

function CarrerasList() {
    const [carreras, setCarreras] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [idCarreraToDelete, setIdCarreraToDelete] = useState(null);
    const [idCarreraToEdit, setIdCarreraToEdit] = useState(null);

    // State para almacenar los datos de la carrera a editar
    const [carreraToEdit, setCarreraToEdit] = useState({
        nombreCarrera: ""
    });

    useEffect(() => {
        // Fetching carreras data
        axios.get("http://localhost:8800/carreras")
            .then((response) => {
                setCarreras(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las carreras:", error);
            });
    }, []);

    // Abrir el modal para eliminar
    const openDeleteModal = (id) => {
        setIdCarreraToDelete(id);
        setShowDeleteModal(true);
    };

    // Abrir el modal para editar
    const openEditModal = (id, nombreCarrera) => {
        setIdCarreraToEdit(id);
        setCarreraToEdit({ nombreCarrera });
        setShowEditModal(true);
    };

    // Función para manejar eliminación de carrera
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8800/carreras/${idCarreraToDelete}`);
            setCarreras(carreras.filter(carrera => carrera.id_carrera !== idCarreraToDelete));
            setShowDeleteModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    // Función para manejar la actualización de carrera
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8800/carreras/${idCarreraToEdit}`, carreraToEdit);
            setCarreras(carreras.map(carrera =>
                carrera.id_carrera === idCarreraToEdit ? { ...carrera, ...carreraToEdit } : carrera
            ));
            setShowEditModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex w-full h-full flex-row bg-amber-400'>
            <div className='p-24 '>
                <div className='w-full justify-center items-center'>
                    <p className='text-black font-semibold text-xl'>Carreras</p>
                </div>
                {carreras.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black  bg-black">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Nombre de la Carrera</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carreras.map((e) => (
                                    <tr key={e.id_carrera} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                        <td className="px-6 py-4">
                                            {e.id_carrera} - {e.nombreCarrera}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                className="font-bold text-blue-600 dark:text-blue-500 hover:underline"
                                                onClick={() => openEditModal(e.id_carrera, e.nombreCarrera)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                                onClick={() => openDeleteModal(e.id_carrera)}
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
                    <p>No hay carreras disponibles.</p>
                )}
            </div>
            <div>
                <AddCarrera />
            </div>

            {/* Modal de eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                        <h2 className="text-lg font-bold">¿Confirmar eliminación?</h2>
                        <p>¿Seguro que deseas eliminar esta carrera?</p>
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
                        <h2 className="text-lg font-bold">Actualizar carrera</h2>
                        <div className="flex flex-wrap -mx-3 mb-6 form">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Nombre de la carrera
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="nombreCarrera"
                                    value={carreraToEdit.nombreCarrera}
                                    onChange={(e) => setCarreraToEdit({ ...carreraToEdit, nombreCarrera: e.target.value })}
                                />
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                                    onClick={handleUpdate}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="flex-shrink-0 bg-gray-400 text-white text-sm border-4 py-1 px-2 rounded"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarrerasList;
