import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddSeccion from './AddSeccion'; // Asegúrate de que este componente se mantiene, ya que lo estás usando en el layout

function VerSecciones() {
  const [secciones, setSeccion] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idSeccionToDelete, setIdSeccionToDelete] = useState(null);
  const [idSeccionToEdit, setIdSeccionToEdit] = useState(null);

  const [seccionToEdit, setSeccionToEdit] = useState({
    nombreSeccion: '',
    capacidad: '',
    inscripciones: ''
  });

  useEffect(() => {
    // Fetching secciones data
    axios.get("http://localhost:8800/secciones")
      .then((response) => {
        setSeccion(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las secciones:", error);
      });
  }, []);

  const openDeleteModal = (id) => {
    setIdSeccionToDelete(id);
    setShowDeleteModal(true);
  };

  const openEditModal = (id, nombreSeccion, capacidad, inscripciones) => {
    setIdSeccionToEdit(id);
    setSeccionToEdit({ nombreSeccion, capacidad, inscripciones });
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/secciones/${idSeccionToDelete}`);
      setSeccion(secciones.filter(seccion => seccion.id_seccion !== idSeccionToDelete));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar la sección", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8800/secciones/${idSeccionToEdit}`, seccionToEdit);
      setSeccion(secciones.map(seccion =>
        seccion.id_seccion === idSeccionToEdit ? { ...seccion, ...seccionToEdit } : seccion
      ));
      setShowEditModal(false);
    } catch (error) {
      console.error("Error al actualizar la sección", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeccionToEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='flex flex-row w-1/2 bg-amber-400'>
      <div className="p-12">
        <div className='w-full justify-center items-center p-4'>
          <p className='text-black font-semibold text-xl'>Listado de secciones</p>
        </div>

        {secciones.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black  bg-black">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-amber-400">Siglas sección</th>
                  <th scope="col" className="px-6 py-3 text-amber-400">Inscripciones</th>
                  <th scope="col" className="px-6 py-3 text-amber-400">Actualizar</th>
                  <th scope="col" className="px-6 py-3 text-amber-400">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {secciones.map((e) => (
                  <tr key={e.id_seccion} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                    <td className="px-6 py-4 font-semibold bg-black text-white">
                      {e.id_seccion} - {e.nombreSeccion}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {e.inscripciones}/{e.capacidad}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-bold text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => openEditModal(e.id_seccion, e.nombreSeccion, e.capacidad, e.inscripciones)}
                      >
                        Actualizar
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                        onClick={() => openDeleteModal(e.id_seccion)}
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
          <p>No hay secciones disponibles.</p>
        )}
      </div>

      {/* Modal de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold">¿Confirmar eliminación?</h2>
            <p>¿Seguro que deseas eliminar esta sección?</p>
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
            <h2 className="text-lg font-bold">Actualizar sección</h2>
            <div className="flex flex-wrap -mx-3 mb-6 form">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nombreSeccion">
                  Nombre de la sección
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Nombre de la sección"
                  name="nombreSeccion"
                  value={seccionToEdit.nombreSeccion}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="capacidad">
                  Capacidad
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  placeholder="Capacidad"
                  name="capacidad"
                  value={seccionToEdit.capacidad}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="inscripciones">
                  Inscripciones
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  placeholder="Inscripciones"
                  name="inscripciones"
                  value={seccionToEdit.inscripciones}
                  onChange={handleChange}
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

      {/* Componente para agregar una nueva sección */}
    </div>
  );
}

export default VerSecciones;
