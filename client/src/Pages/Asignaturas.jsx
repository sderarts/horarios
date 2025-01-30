import React from 'react';
import AsignaturasList from '../Sections/Asignatura/AsignaturasList';
import VerSecciones from '../Sections/Seccion/Secciones';
import AddSeccion from '../Sections/Seccion/AddSeccion';
import AsignaturasSecciones from '../Sections/Horario/AsignaturasSecciones';
import AddAsignaturaSeccion from '../Sections/Horario/AddAsignaturaSeccion';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

function Asignaturas() {
    return (
        <div>
            <Navbar />

            <AsignaturasList />
            {/* <AddSeccion /> */}
            <AsignaturasSecciones />
            <Footer />
        </div>
    )
}

export default Asignaturas