import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa: o build funciona na raiz de um domínio ou dentro de uma subpasta
export default defineConfig({ base: './', plugins: [react()] })
