
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          path.resolve(__dirname, 'node_modules'),
        ],
      },
    },
  },
});