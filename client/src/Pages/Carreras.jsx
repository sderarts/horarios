import React from 'react';
import CarrerasList from '../Sections/Carrera/CarrerasList';
import AddNivelAsignatura from '../Sections/Asignatura/AddNivelAsignatura';
import AsignaturasList from '../Sections/Asignatura/AsignaturasList';
import Navbar from '../Layout/Navbar';
import AddCarreraNivel from '../Sections/Nivel/AddCarreraNivel';
import Footer from '../Layout/Footer';
import VerSecciones from '../Sections/Seccion/Secciones';


function Carreras() {
    return (
        <div className='bg-amber-400'>
            <Navbar />
            <CarrerasList />
            <AsignaturasList/>
            <VerSecciones/>
            <Footer />
        </div>
    )
}

export default Carreras