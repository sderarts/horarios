import React from 'react';
import AsignaturasList from '../Sections/Asignatura/AsignaturasList';
import AddAsignatura from '../Sections/Asignatura/AddAsignatura';
import VerSecciones from '../Sections/Seccion/Secciones';
import AddSeccion from '../Sections/Seccion/AddSeccion';
import AsignaturasSecciones from '../Sections/Horario/AsignaturasSecciones';
import AddAsignaturaSeccion from '../Sections/Horario/AddAsignaturaSeccion';

function Asignaturas() {
    return (
        <div>
            <AsignaturasList />
            <AddAsignatura />
            <VerSecciones />
            <AddSeccion />
            <AsignaturasSecciones />
            <AddAsignaturaSeccion />
        </div>
    )
}

export default Asignaturas