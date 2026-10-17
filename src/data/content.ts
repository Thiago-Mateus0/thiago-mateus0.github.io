export type Lang = 'pt' | 'en'

export const links = {
  github: 'https://github.com/Thiago-Mateus0',
  linkedin: '', // TODO: preencher
  email: '', // TODO: preencher
  cv: '', // TODO: colocar o PDF em public/ e apontar aqui (ex.: '/curriculo-tm.pdf')
}

export interface Project {
  id: string
  name: string
  year: string
  tags: string[]
  repo: string
  demo?: string
  pt: { tagline: string; description: string; highlights: string[] }
  en: { tagline: string; description: string; highlights: string[] }
}

export const projects: Project[] = [
  {
    id: 'lifetrailer',
    name: 'Lifetrailer Studio',
    year: '2026',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Node.js', 'Docker'],
    repo: 'https://github.com/Thiago-Mateus0/lifetrailer-studio',
    pt: {
      tagline: 'Gestão operacional de um estúdio de fotografia, em produção.',
      description:
        'Sistema que roda em tablet, no balcão, e substitui quadro, papel e caderno. Integra com o Altegio, a plataforma de agendamento do estúdio, de forma unidirecional via webhook. O repositório público usa dados fictícios.',
      highlights: [
        'Comanda como máquina de estados explícita e testável',
        'Regras financeiras em funções PL/pgSQL, para nunca deixar estado inconsistente',
        'Specs e ADRs escritos por mim; parte do código feita com agentes de IA sob essa direção',
      ],
    },
    en: {
      tagline: 'Operations management for a photography studio, in production.',
      description:
        'Tablet-based system at the front desk that replaces whiteboards, paper and notebooks. It integrates one-way with Altegio, the studio\'s booking platform, via webhook. The public repository uses fictional data.',
      highlights: [
        'Order tab ("comanda") modeled as an explicit, testable state machine',
        'Financial rules in PL/pgSQL functions so state is never left inconsistent',
        'Specs and ADRs written by me; part of the code built with AI agents under that direction',
      ],
    },
  },
  {
    id: 'arkhe',
    name: 'Arkhé Finance API',
    year: '2026',
    tags: ['Python', 'FastAPI', 'SQLite', 'REST'],
    repo: 'https://github.com/Thiago-Mateus0/arkhe-finance-api',
    demo: 'https://arkhe-finance-api.onrender.com/docs',
    pt: {
      tagline: 'API REST de controle financeiro pessoal, no ar.',
      description:
        'Evolução do meu primeiro app de finanças para uma API: transações de entrada e saída, categorias, filtros e um resumo consolidado. Publicada no Render, com documentação Swagger.',
      highlights: [
        'CRUD completo com filtros por tipo e categoria',
        'Rotas organizadas em módulos (transações, categorias, dashboard)',
        'Próximos passos: PostgreSQL, JWT e testes com Pytest',
      ],
    },
    en: {
      tagline: 'Personal finance REST API, live.',
      description:
        'An evolution of my first finance app into an API: income and expense transactions, categories, filters and a consolidated summary. Deployed on Render with Swagger docs.',
      highlights: [
        'Full CRUD with filters by type and category',
        'Routes organized in modules (transactions, categories, dashboard)',
        'Next: PostgreSQL, JWT auth and Pytest tests',
      ],
    },
  },
  {
    id: 'studytrack',
    name: 'Study Track',
    year: '2026',
    tags: ['Python', 'JSON', 'CLI'],
    repo: 'https://github.com/Thiago-Mateus0/Study-Track',
    pt: {
      tagline: 'Meu primeiro código: acompanhar meus estudos.',
      description:
        'App de terminal para registrar tópicos estudados, tempo dedicado e meta diária, salvando tudo em JSON. Feito só com o que eu sabia explicar na época, e mantido como marco do começo.',
      highlights: [
        'Registro de sessões e total de minutos',
        'Persistência em arquivo JSON',
        'Mostra de onde eu vim: do while/input ao sistema em produção',
      ],
    },
    en: {
      tagline: 'My first code: tracking my own study time.',
      description:
        'A terminal app to log topics studied, time spent and a daily goal, saved to JSON. Built only with what I could explain at the time, and kept as a milestone of where I started.',
      highlights: [
        'Session log with total minutes',
        'Persistence in a JSON file',
        'Shows the path from while/input to a production system',
      ],
    },
  },
]

export const stack = {
  pt: [
    { group: 'Back-end', items: ['Python', 'FastAPI', 'Node.js', 'REST', 'Webhooks'] },
    { group: 'Dados', items: ['PostgreSQL', 'PL/pgSQL', 'SQLite', 'Modelagem relacional'] },
    { group: 'Front-end', items: ['React', 'TypeScript', 'Vite', 'Tailwind'] },
    { group: 'Ferramentas', items: ['Git e GitHub', 'Docker', 'Testes (pgTAP, Node)', 'Agentes de IA no fluxo'] },
    { group: 'Estudando', items: ['IA e Machine Learning', 'Testes automatizados', 'Autenticação JWT'] },
  ],
  en: [
    { group: 'Back-end', items: ['Python', 'FastAPI', 'Node.js', 'REST', 'Webhooks'] },
    { group: 'Data', items: ['PostgreSQL', 'PL/pgSQL', 'SQLite', 'Relational modeling'] },
    { group: 'Front-end', items: ['React', 'TypeScript', 'Vite', 'Tailwind'] },
    { group: 'Tooling', items: ['Git & GitHub', 'Docker', 'Testing (pgTAP, Node)', 'AI agents in my workflow'] },
    { group: 'Learning', items: ['AI & Machine Learning', 'Automated testing', 'JWT authentication'] },
  ],
}

export const timeline = {
  pt: [
    { when: 'Mar 2026', title: 'Study Track', text: 'Primeiro projeto, com if, while e JSON.' },
    { when: 'Abr 2026', title: 'Arkhé Finance', text: 'Do app de finanças para uma API REST publicada.' },
    { when: '2026', title: 'Lifetrailer Studio', text: 'Sistema real, em produção, usado pela equipe de um estúdio.' },
    { when: 'Agora', title: 'IA e Machine Learning', text: 'Aprofundando back-end e dados rumo a IA.' },
  ],
  en: [
    { when: 'Mar 2026', title: 'Study Track', text: 'First project, with if, while and JSON.' },
    { when: 'Apr 2026', title: 'Arkhé Finance', text: 'From a finance app to a deployed REST API.' },
    { when: '2026', title: 'Lifetrailer Studio', text: 'A real system in production, used by a studio\'s team.' },
    { when: 'Now', title: 'AI & Machine Learning', text: 'Going deeper into back-end and data, heading to AI.' },
  ],
}

export const t = {
  pt: {
    nav: { about: 'Sobre', projects: 'Projetos', stack: 'Stack', path: 'Trajetória', contact: 'Contato' },
    hero: {
      status: 'Aberto a oportunidades · Maceió, AL · remoto ou presencial',
      role: 'Desenvolvedor Full Stack · Back-end & IA',
      lead: 'Estudante de Ciência da Computação construindo sistemas reais. Foco em back-end, dados e, em seguida, IA e machine learning.',
      cta1: 'Ver projetos',
      cta2: 'Falar comigo',
      cmd: 'Dica: pressione Ctrl+K para navegar',
    },
    about: {
      eyebrow: '01 / sobre',
      title: 'Quem está por trás do código',
      p1: 'Sou muito focado no que faço. Prefiro entender o problema de verdade antes de escrever a primeira linha, e entregar algo que as pessoas usam no dia a dia.',
      p2: 'Estou em formação e procuro minha vaga: qualquer oportunidade para crescer em time, de preferência em back-end, full stack, IA ou machine learning.',
      skills: [
        { t: 'Comunicação', d: 'Explico o técnico de forma simples, para quem decide e para quem usa.' },
        { t: 'Liderança', d: 'Gosto de organizar, alinhar o time e levar a tarefa até o fim.' },
        { t: 'Trabalho em equipe', d: 'Convivo bem com equipes diferentes e aprendo rápido com elas.' },
        { t: 'Foco', d: 'Uma coisa por vez, bem feita, com teste e documentação.' },
      ],
    },
    projects: { eyebrow: '02 / projetos', title: 'Projetos', all: 'Todos', more: 'Detalhes', less: 'Fechar', repo: 'Código', demo: 'Demo' },
    stack: { eyebrow: '03 / stack', title: 'Tecnologias' },
    path: { eyebrow: '04 / trajetória', title: 'De onde vim e para onde vou' },
    contact: {
      eyebrow: '05 / contato',
      title: 'Vamos conversar?',
      text: 'Estou buscando minha vaga e adoraria saber mais sobre a sua.',
      cv: 'Baixar currículo',
      soon: 'Em breve',
    },
    footer: 'Feito por TM · React + Vite',
    palette: { placeholder: 'Ir para…', theme: 'Alternar tema', lang: 'Mudar idioma (EN)', empty: 'Nada encontrado' },
  },
  en: {
    nav: { about: 'About', projects: 'Projects', stack: 'Stack', path: 'Path', contact: 'Contact' },
    hero: {
      status: 'Open to opportunities · Maceió, Brazil · remote or on-site',
      role: 'Full Stack Developer · Back-end & AI',
      lead: 'Computer Science student building real systems. Focused on back-end, data, and next, AI and machine learning.',
      cta1: 'See projects',
      cta2: 'Get in touch',
      cmd: 'Tip: press Ctrl+K to navigate',
    },
    about: {
      eyebrow: '01 / about',
      title: 'The person behind the code',
      p1: 'I\'m very focused on what I do. I prefer to truly understand the problem before writing the first line, and to ship something people use every day.',
      p2: 'I\'m still in training and looking for my first role: any chance to grow in a team, preferably in back-end, full stack, AI or machine learning.',
      skills: [
        { t: 'Communication', d: 'I explain technical things simply, for those who decide and those who use.' },
        { t: 'Leadership', d: 'I like organizing, aligning the team and following through.' },
        { t: 'Teamwork', d: 'I get along with different teams and learn fast from them.' },
        { t: 'Focus', d: 'One thing at a time, done well, with tests and docs.' },
      ],
    },
    projects: { eyebrow: '02 / projects', title: 'Projects', all: 'All', more: 'Details', less: 'Close', repo: 'Code', demo: 'Demo' },
    stack: { eyebrow: '03 / stack', title: 'Technologies' },
    path: { eyebrow: '04 / path', title: 'Where I come from and where I\'m going' },
    contact: {
      eyebrow: '05 / contact',
      title: 'Let\'s talk?',
      text: 'I\'m looking for my next role and would love to hear about yours.',
      cv: 'Download résumé',
      soon: 'Coming soon',
    },
    footer: 'Built by TM · React + Vite',
    palette: { placeholder: 'Go to…', theme: 'Toggle theme', lang: 'Switch language (PT)', empty: 'Nothing found' },
  },
}
