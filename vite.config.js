import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'serve-root-images',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.startsWith('/images/') || req.url.startsWith('images/'))) {
            const cleanUrl = req.url.replace(/^\/?images\//, '');
            const filePath = path.join(__dirname, 'images', decodeURIComponent(cleanUrl));
            
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeTypes = {
                '.svg': 'image/svg+xml',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.webp': 'image/webp'
              };
              if (mimeTypes[ext]) {
                res.setHeader('Content-Type', mimeTypes[ext]);
              }
              return fs.createReadStream(filePath).pipe(res);
            }
          }
          next();
        });
      },
      closeBundle() {
        const srcDir = path.join(__dirname, 'images');
        const distDir = path.join(__dirname, 'dist', 'images');
        if (fs.existsSync(srcDir)) {
          fs.cpSync(srcDir, distDir, { recursive: true });
        }
        const noJekyllPath = path.join(__dirname, 'dist', '.nojekyll');
        fs.writeFileSync(noJekyllPath, '');
      }
    }
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
