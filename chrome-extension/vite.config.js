import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',  // Copia manifest.json
          dest: '.'              // A la raíz de dist
        },
        {
          src: 'public/*.png',   // Copia todos los íconos PNG
          dest: '.'              // A la raíz de dist
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: {
        popup: 'popup.html'
      },
      output: {
        entryFileNames: 'src/[name].js',
        chunkFileNames: 'src/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
