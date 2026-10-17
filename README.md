# Portfólio — TM

Site pessoal de Thiago Mateus (TM), desenvolvedor full stack. React + Vite + TypeScript + Tailwind + Framer Motion.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # confere tipos e gera dist/
```

## Onde editar o conteúdo

Tudo que é texto fica em `src/data/content.ts`, em português e inglês: projetos, stack, trajetória e links.
Para ativar os botões de contato, preencha `links.linkedin`, `links.email` e `links.cv` (coloque o PDF em `public/`).

## Publicar

Vercel ou Netlify: importe o repositório. Build `npm run build`, pasta de saída `dist`.
