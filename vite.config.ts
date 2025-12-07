
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'figma:asset/1b0deca266db272ece610c5c199de3f86ef26a14.png': path.resolve(__dirname, './src/assets/1b0deca266db272ece610c5c199de3f86ef26a14.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      }
    },
  });