// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        environment: 'jsdom', // Asegúrate de que jsdom esté configurado
        globals: true, // Esto permite que Vitest reconozca las funciones globales como describe y it
    },
});
