import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: true,
  //   watch: {
  //     ignored: ['**/.env', '**/vite.config.ts']
  //   },
  // },
  plugins: [react()],
})
