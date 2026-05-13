import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures assets use relative paths for Itch.io compatibility
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
