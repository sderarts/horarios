import React from 'react';
import AsignaturasList from '../Sections/Asignatura/AsignaturasList';
import VerSecciones from '../Sections/Seccion/Secciones';
import AddSeccion from '../Sections/Seccion/AddSeccion';
import AsignaturasSecciones from '../Sections/Horario/AsignaturasSecciones';
import AddAsignaturaSeccion from '../Sections/Horario/AddAsignaturaSeccion';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import AddCarrera from '../Sections/Carrera/AddCarrera';
import AddCarreraNivel from '../Sections/Nivel/AddCarreraNivel';
import AddAsignatura from '../Sections/Asignatura/AddAsignatura';
import AddNivelAsignatura from '../Sections/Asignatura/AddNivelAsignatura';

function Asignaturas() {
    return (
        <div>
            <Navbar />
            <div className='flex flex-col p-4'>
                <div className='flex flex-row w-full    '>
                    <AddCarrera/>
                    <AddAsignatura/>
                </div>
                <AddCarreraNivel/>
                <AddNivelAsignatura/>
                <AddSeccion/>
                <AddAsignaturaSeccion/>
                <AsignaturasSecciones />
            </div>
            <Footer />
        </div>
    )
}

export default Asignaturas