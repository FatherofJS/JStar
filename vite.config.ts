import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    // Expose environment variables to the client
    // VITE_* variables are exposed to the client
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'http://localhost:5001'),
    },
    server: {
      // In development, we can still use proxy to avoid CORS issues
      // Remove this proxy if you want to test the full URL configuration
      proxy: env.VITE_USE_PROXY === 'true' ? {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true,
        }
      } : undefined
    }
  }
})
