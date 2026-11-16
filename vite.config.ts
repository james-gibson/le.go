import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this project site from /le.go/, so production builds are
// mounted there. Dev keeps the root so local URLs stay short.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/le.go/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark') || id.includes('node_modules/micromark') || id.includes('node_modules/unified'))
            return 'vendor-markdown'
          if (id.includes('node_modules/react')) return 'vendor-react'
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons'
        },
      },
    },
  },
}))
