import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // This should be inside the client directory
  },
  server: {
    port: 3000,
  },
  base: './',
});
