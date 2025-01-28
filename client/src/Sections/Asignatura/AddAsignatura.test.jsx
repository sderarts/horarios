import React from "react";
import { render, screen } from '@testing-library/react';
import AddAsignatura from "./AddAsignatura";
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Importar MemoryRouter
import "@testing-library/jest-dom/vitest";

describe("AddAsignatura", () => {

    it("renders a default asignatura", () => {
        render(
            <MemoryRouter>
                <AddAsignatura />
            </MemoryRouter>
        );
        expect(screen.getByText("Asignatura")).toBeInTheDocument();
    });

    it("renders a default asignatura", () => {
        render(
            <MemoryRouter>
                <AddAsignatura />
            </MemoryRouter>
        );
        expect(screen.getByText("Asignatura")).toBeInTheDocument();
    });


});
