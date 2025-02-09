/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    include: [
      'src/**/*.{test,spec}.{ts,tsx}', // Matches files like Component.test.tsx or Component.spec.tsx
      'src/**/__tests__/**/*.{ts,tsx}', // Matches files inside __tests__ folders
    ],
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/tests/setup.ts',
      ],
    },
  },
});
