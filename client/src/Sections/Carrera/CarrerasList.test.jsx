import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CarrerasList from './CarrerasList'; // Ajusta la ruta a tu componente
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';  // Importa MemoryRouter

// Simulamos el módulo axios para que no haga una solicitud real
vi.mock('axios');

describe('CarrerasList', () => {
    it('debe mostrar las carreras correctamente al obtener datos de la API', async () => {
        // Simulamos una respuesta exitosa de la API
        axios.get.mockResolvedValue({
            data: [
                { id_carrera: 16, nombreCarrera: 'Ingeniería' },
                { id_carrera: 17, nombreCarrera: 'Medicina' },
            ],
        });

        // Envuelve el componente con MemoryRouter
        render(
            <MemoryRouter>
                <CarrerasList />
            </MemoryRouter>
        );

        // Esperamos que la API haya respondido y los datos se hayan renderizado
        await waitFor(() => screen.getByText('Ingeniería'));
        expect(screen.getByText('Ingeniería')).toBeInTheDocument();
        expect(screen.getByText('Medicina')).toBeInTheDocument();
    });

    // it('debe mostrar un mensaje si no hay carreras', async () => {
    //     // Simulamos una respuesta con un array vacío
    //     axios.get.mockResolvedValue({ data: [] });

    //     // Envuelve el componente con MemoryRouter
    //     render(
    //         <MemoryRouter>
    //             <CarrerasList />
    //         </MemoryRouter>
    //     );

    //     await waitFor(() => screen.getByText('No hay carreras disponibles.'));
    //     expect(screen.getByText('No hay carreras disponibles.')).toBeInTheDocument();
    // });

    // it('debe manejar errores correctamente', async () => {
    //     // Simulamos un error en la solicitud
    //     axios.get.mockRejectedValue(new Error('Error al obtener las carreras'));

    //     // Envuelve el componente con MemoryRouter
    //     render(
    //         <MemoryRouter>
    //             <CarrerasList />
    //         </MemoryRouter>
    //     );

    //     // Verificamos que no se rompa la aplicación (en tu caso, solo loguea el error)
    //     await waitFor(() => expect(screen.getByText('No hay carreras disponibles.')).toBeInTheDocument());
    // });
});
