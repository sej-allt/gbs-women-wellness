import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    host: 'localhost',
    port: 5173, // Ensure this matches your frontend port
    strictPort: true,
    hmr: {
      port: 5173, // Explicitly set the HMR WebSocket port
    },
  },
});
