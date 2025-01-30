import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import AddBloque from './AddBloque';
import VerSecciones from '../Seccion/Secciones';

function VerBloques() {

    const [bloques, setBloques] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [idBloqueToDelete, setIdBloqueToDelete] = useState(null);
    const [idBloqueToEdit, setIdBloqueToEdit] = useState(null);
    const [bloqueToEdit, setBloqueToEdit] = useState({
        nombreBloqueHora: ''
    });

    useEffect(() => {
        axios.get("http://localhost:8800/bloques")
            .then((response) => {
                setBloques(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los bloques:", error);
            });
    }, []);

    // Abrir el modal para eliminar
    const openDeleteModal = (id) => {
        setIdBloqueToDelete(id);
        setShowDeleteModal(true);
    };

    // Abrir el modal para editar
    const openEditModal = (id, nombreBloqueHora) => {
        setIdBloqueToEdit(id);
        setBloqueToEdit({ nombreBloqueHora });
        setShowEditModal(true);
    };

    // Función para manejar eliminación de bloque
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8800/bloques/${idBloqueToDelete}`);
            setBloques(bloques.filter(bloque => bloque.id_bloque !== idBloqueToDelete));
            setShowDeleteModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    // Función para manejar la actualización de bloque
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8800/bloques/${idBloqueToEdit}`, bloqueToEdit);
            setBloques(bloques.map(bloque =>
                bloque.id_bloque === idBloqueToEdit ? { ...bloque, ...bloqueToEdit } : bloque
            ));
            setShowEditModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-row bg-amber-400 w-full'>
            <div className='p-12'>
                <div className='w-full justify-center items-center p-4'>
                    <p className='text-black font-semibold text-xl'>Bloques de horarios</p>
                </div>

                {bloques.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black bg-black">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Bloques de Horarios</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Actualizar</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bloques.map((e) => (
                                    <tr key={e.id_bloque} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                        <td className="px-6 py-4 font-semibold bg-black text-white">
                                            {e.id_bloque} - {e.nombreBloqueHora}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="font-bold text-blue-600 dark:text-blue-500 hover:underline"
                                                onClick={() => openEditModal(e.id_bloque, e.nombreBloqueHora)}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                                onClick={() => openDeleteModal(e.id_bloque)}
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
                    <p>No hay bloques disponibles.</p>
                )}
            </div>
            <div>
                <VerSecciones />
            </div>

            {/* Modal de eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                        <h2 className="text-lg font-bold">¿Confirmar eliminación?</h2>
                        <p>¿Seguro que deseas eliminar este bloque?</p>
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
                        <h2 className="text-lg font-bold">Actualizar bloque</h2>
                        <div className="flex flex-wrap -mx-3 mb-6 form">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Nombre del bloque
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    placeholder="Nombre del bloque"
                                    name="nombreBloqueHora"
                                    value={bloqueToEdit.nombreBloqueHora}
                                    onChange={(e) => setBloqueToEdit({ ...bloqueToEdit, nombreBloqueHora: e.target.value })}
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

export default VerBloques;
