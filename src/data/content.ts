export type Lang = 'pt' | 'en'

export const links = {
  github: 'https://github.com/Thiago-Mateus0',
  linkedin: 'https://www.linkedin.com/in/thiago-mateus-tech',
  email: 'thiago.mateustech@gmail.com',
  cv: '', // TODO: colocar o PDF em public/ e apontar aqui (ex.: '/curriculo-tm.pdf')
}

export interface Project {
  id: string
  name: string
  year: string
  tags: string[]
  repo: string
  demo?: string
  private?: boolean // repo privado: sem link de código
  snippet: string[] // linhas decorativas do banner do card
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
    snippet: ['comanda.abrir(cliente)', 'comanda.lancar(item)', "comanda.fechar()  // → 'fechada'"],
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
    name: 'Arkhé Finance',
    year: '2026',
    tags: ['Python', 'FastAPI', 'SQLite', 'React', 'TypeScript', 'Tailwind', 'Pytest'],
    repo: 'https://github.com/Thiago-Mateus0/finan-as',
    private: true,
    snippet: ['classificar(lancamento)', 'if repasse: ignorar()', 'gasto_real = centavos(int)'],
    pt: {
      tagline: 'App de finanças pessoais que mostra para onde o dinheiro vai.',
      description:
        'Importa o CSV de conta e de fatura do Nubank, separa o que é gasto do que é só dinheiro passando pela conta e categoriza por regras. Roda local, sem enviar dado financeiro a ninguém. Nasceu da minha API de finanças e virou um app completo, com interface para celular.',
      highlights: [
        'Classificação de lançamentos: pagamento de fatura, Pix entre contas e repasses não contam como gasto',
        'Importação idempotente e dinheiro em centavos inteiros, nunca float',
        'Orçamento por categoria, parcelas a vir e assinaturas, cada regra de dinheiro com teste',
        'Decisões documentadas em ADRs; interface React + TypeScript, mobile-first e com tema claro e escuro',
      ],
    },
    en: {
      tagline: 'Personal finance app that shows where the money goes.',
      description:
        'Imports Nubank account and card CSVs, separates real spending from money just passing through the account, and categorizes by rules. Runs locally and sends no financial data to anyone. It grew out of my finance API into a full app with a mobile-first interface.',
      highlights: [
        'Entry classification: card payments, transfers between own accounts and pass-throughs are not counted as spending',
        'Idempotent import and money stored as integer cents, never float',
        'Per-category budget, upcoming installments and subscriptions, every money rule covered by tests',
        'Decisions documented as ADRs; React + TypeScript interface, mobile-first with light and dark themes',
      ],
    },
  },
  {
    id: 'studytrack',
    name: 'Study Track',
    year: '2026',
    tags: ['Python', 'JSON', 'CLI'],
    repo: 'https://github.com/Thiago-Mateus0/Study-Track',
    snippet: ['while True:', '    topico = input()', '    salvar_json(topico, min)'],
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
    { group: 'Ferramentas', items: ['Git e GitHub', 'Docker', 'Testes (Pytest, pgTAP, Node)', 'Agentes de IA no fluxo'] },
    { group: 'Estudando', items: ['IA e Machine Learning', 'Autenticação JWT', 'Deploy em nuvem'] },
  ],
  en: [
    { group: 'Back-end', items: ['Python', 'FastAPI', 'Node.js', 'REST', 'Webhooks'] },
    { group: 'Data', items: ['PostgreSQL', 'PL/pgSQL', 'SQLite', 'Relational modeling'] },
    { group: 'Front-end', items: ['React', 'TypeScript', 'Vite', 'Tailwind'] },
    { group: 'Tooling', items: ['Git & GitHub', 'Docker', 'Testing (pgTAP, Node)', 'AI agents in my workflow'] },
    { group: 'Learning', items: ['AI & Machine Learning', 'JWT authentication', 'Cloud deploy'] },
  ],
}

export const timeline = {
  pt: [
    { when: 'Mar 2026', title: 'Study Track', text: 'Primeiro projeto, com if, while e JSON.' },
    { when: 'Abr 2026', title: 'Arkhé Finance', text: 'De uma API de finanças ao app completo, com interface e testes.' },
    { when: '2026', title: 'Lifetrailer Studio', text: 'Sistema real, em produção, usado pela equipe de um estúdio.' },
    { when: 'Agora', title: 'IA e Machine Learning', text: 'Aprofundando back-end e dados rumo a IA.' },
  ],
  en: [
    { when: 'Mar 2026', title: 'Study Track', text: 'First project, with if, while and JSON.' },
    { when: 'Apr 2026', title: 'Arkhé Finance', text: 'From a finance API to a complete app with UI and tests.' },
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
      cmd: 'Dica: clique em qualquer lugar. Cada clique é diferente. Ctrl+K navega.',
      roles: ['Back-end', 'Full Stack', 'Dados', 'IA & ML'],
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
    projects: { eyebrow: '02 / projetos', title: 'Projetos', all: 'Todos', more: 'Detalhes', less: 'Fechar', repo: 'Código', demo: 'Demo', private: 'Repositório privado' },
    stack: { eyebrow: '03 / stack', title: 'Tecnologias' },
    path: { eyebrow: '04 / trajetória', title: 'De onde vim e para onde vou' },
    contact: {
      eyebrow: '05 / contato',
      title: 'Vamos conversar?',
      text: 'Estou buscando minha vaga e adoraria saber mais sobre a sua.',
      cv: 'Baixar currículo',
      soon: 'Em breve',
    },
    stats: { projects: 'Projetos', tech: 'Tecnologias', langs: 'Idiomas' },
    intro: {
      skip: 'clique ou Esc para pular',
      lines: ['$ ssh tm@maceio.dev', '> autenticando... ok', '> carregando projetos... ok', '> stack: python · typescript · sql', '> acesso liberado ✓'],
      role: 'Full Stack · Back-end & IA',
    },
    copy: { idle: 'Copiar e-mail', done: 'Copiado ✓' },
    footer: 'Feito por TM · React + Vite · psst: tente ↑ ↑ ↓ ↓ ← → ← → B A',
    palette: { placeholder: 'Ir para…', theme: 'Alternar tema', lang: 'Mudar idioma (EN)', empty: 'Nada encontrado', intro: 'Rever abertura' },
  },
  en: {
    nav: { about: 'About', projects: 'Projects', stack: 'Stack', path: 'Path', contact: 'Contact' },
    hero: {
      status: 'Open to opportunities · Maceió, Brazil · remote or on-site',
      role: 'Full Stack Developer · Back-end & AI',
      lead: 'Computer Science student building real systems. Focused on back-end, data, and next, AI and machine learning.',
      cta1: 'See projects',
      cta2: 'Get in touch',
      cmd: 'Tip: click anywhere. Every click is different. Ctrl+K navigates.',
      roles: ['Back-end', 'Full Stack', 'Data', 'AI & ML'],
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
    projects: { eyebrow: '02 / projects', title: 'Projects', all: 'All', more: 'Details', less: 'Close', repo: 'Code', demo: 'Demo', private: 'Private repository' },
    stack: { eyebrow: '03 / stack', title: 'Technologies' },
    path: { eyebrow: '04 / path', title: 'Where I come from and where I\'m going' },
    contact: {
      eyebrow: '05 / contact',
      title: 'Let\'s talk?',
      text: 'I\'m looking for my next role and would love to hear about yours.',
      cv: 'Download résumé',
      soon: 'Coming soon',
    },
    stats: { projects: 'Projects', tech: 'Technologies', langs: 'Languages' },
    intro: {
      skip: 'click or Esc to skip',
      lines: ['$ ssh tm@maceio.dev', '> authenticating... ok', '> loading projects... ok', '> stack: python · typescript · sql', '> access granted ✓'],
      role: 'Full Stack · Back-end & AI',
    },
    copy: { idle: 'Copy e-mail', done: 'Copied ✓' },
    footer: 'Built by TM · React + Vite · psst: try ↑ ↑ ↓ ↓ ← → ← → B A',
    palette: { placeholder: 'Go to…', theme: 'Toggle theme', lang: 'Switch language (PT)', empty: 'Nothing found', intro: 'Replay intro' },
  },
}
