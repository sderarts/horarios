import React from 'react';
import VerBloques from '../Sections/Bloque/Bloques';
import AddBloque from '../Sections/Bloque/AddBloque';
import AddDiaBloque from '../Sections/Dia/AddDiaBloque';
import VerSecciones from '../Sections/Seccion/Secciones';
import AddSeccion from '../Sections/Seccion/AddSeccion';
import AddSeccionDia from '../Sections/Seccion/AddSeccionDia';
import Navbar from '../Layout/Navbar';

function BloquesHorarios() {
    return (
        <div>
            <Navbar />
            <VerBloques />
            {/* <AddBloque /> */}
            <AddDiaBloque />
            <VerSecciones />
            {/* <AddSeccion /> */}
            <AddSeccionDia />
        </div>
    )
}

export default BloquesHorarios