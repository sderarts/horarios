import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
function VerSecciones() {

  const [secciones, setSeccion] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8800/secciones")
      .then((response) => {
        console.log('Datos recibidos:', response.data);  // Asegúrate de que los datos llegan aquí
        setSeccion(response.data);  // Guardamos los datos de niveles en el estado
      })
      .catch((error) => {
        console.error("Error al obtener las niveles:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/secciones/${id}`);

      // Actualizar el estado local para reflejar la eliminación sin recargar la página
      setSeccion(secciones.filter(nivel => nivel.id_seccion !== id));
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div>
      <div className="p-12">
        <h1> Listado de Secciones</h1>

        {secciones.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-200 dark:text-black  bg-black">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-amber-400">Siglas sección</th>
                  <th scope="col" className="px-6 py-3 text-amber-400">Actualizar</th>
                  <th scope="col" className="px-6 py-3 text-amber-400">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {secciones.map((e) => (
                  <tr key={e.id_seccion} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                    <td className="px-6 py-4">
                      {e.id_seccion} - {e.nombreSeccion}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/secciones/${e.id_seccion}`}>
                        <button className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
                          Update
                        </button>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                        onClick={() => handleDelete(e.id_seccion)}
                      >
                        Delete
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
    </div>
  )
}


export default VerSecciones