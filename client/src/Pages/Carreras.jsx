import React from 'react';
import CarrerasList from '../Sections/Carrera/CarrerasList';
import AddNivelAsignatura from '../Sections/Asignatura/AddNivelAsignatura';
import AsignaturasList from '../Sections/Asignatura/AsignaturasList';
import Navbar from '../Layout/Navbar';
import AddCarreraNivel from '../Sections/Nivel/AddCarreraNivel';
import Footer from '../Layout/Footer';


function Carreras() {
    return (
        <div className='bg-amber-400'>
            <Navbar />
            <CarrerasList />
            <AddCarreraNivel />
            <Footer />
        </div>
    )
}

export default Carreras