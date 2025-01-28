import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CarrerasList from './CarrerasList';
import axios from 'axios';

// Simulamos axios
vi.mock('axios');

describe('CarrerasList', () => {
    it('should display a list of carreras', async () => {
        // Simulamos la respuesta de la API
        axios.get.mockResolvedValue({
            data: [
                { id_carrera: 1, nombreCarrera: 'Carrera 1' },
                { id_carrera: 2, nombreCarrera: 'Carrera 2' }
            ]
        });

        render(
            <MemoryRouter>
                <CarrerasList />
            </MemoryRouter>
        );

        // Esperamos que las carreras se hayan renderizado correctamente
        await waitFor(() => {
            expect(screen.getByText('Carrera 1')).toBeInTheDocument();
            expect(screen.getByText('Carrera 2')).toBeInTheDocument();
        });
    });

    it('should display "No hay carreras disponibles" when no carreras are loaded', async () => {
        // Simulamos una respuesta vacía de la API
        axios.get.mockResolvedValue({
            data: []
        });

        render(
            <MemoryRouter>
                <CarrerasList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('No hay carreras disponibles.')).toBeInTheDocument();
        });
    });
});
