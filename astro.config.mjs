// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    // tipos de duas versões do vite divergem (astro x tailwind); em runtime funciona
    // @ts-expect-error
    plugins: [tailwindcss()]
  }
});