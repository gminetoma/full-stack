/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsConfigPaths from 'vite-tsconfig-paths'
import config from './config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
    },
  },
  server: {
    port: config.get('port'),
  },
  build: {
    chunkSizeWarningLimit: 550,
  },
  plugins: [
    svgr(), // https://www.npmjs.com/package/vite-plugin-svgr
    tsConfigPaths(),
    tanstackStart(),
    viteReact(), // react's vite plugin must come after start's vite plugin
    tailwindcss(),
  ],
})
