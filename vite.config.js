import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [nodePolyfills()],
  resolve: {
    alias: {
      jimp: fileURLToPath(
        new URL('./node_modules/jimp/dist/esm/index.js', import.meta.url),
      ),
    },
  },
  optimizeDeps: {
    include: ['jimp'],
  },
})
