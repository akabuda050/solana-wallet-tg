import { fileURLToPath, URL } from 'node:url'
import inject from '@rollup/plugin-inject'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/solana-wallet-tg/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
		rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
		},
	},
})
