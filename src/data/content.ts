export type L = { pt: string; en: string };

export const profile = {
  name: "Thiago Mateus",
  location: "Maceió - AL",
  github: "https://github.com/Thiago-Mateus0",
  linkedin: "https://www.linkedin.com/in/thiago-mateus-91180a3a8",
  // preencha para exibir o botão de e-mail no contato
  email: "" as string,
  role: {
    pt: "Desenvolvedor full-stack",
    en: "Full-stack developer",
  } as L,
  bio: {
    pt: "Construo aplicações web de ponta a ponta e estou me aprofundando em IA, aprendizado de máquina e dados.",
    en: "I build web applications end to end and I'm going deeper into AI, machine learning and data.",
  } as L,
};

export type Project = {
  slug: string;
  name: string;
  desc: L;
  stack: string[];
  tags: ("web" | "ai")[];
  link?: string;
  // preencha para exibir os botões nos cards
  demo?: string;
  repo?: string;
  // screenshot do card (1600×1000, 16:10) em public/projetos/<slug>.png; sem isso o card não mostra imagem
  image?: string;
  // módulo de IA destacado dentro do projeto
  ai?: { name: string; desc: L; stack: string[] };
};

export const projects: Project[] = [
  {
    slug: "lifetrailer",
    image: "/projetos/lifetrailer.png",
    name: "LifeTrailer",
    desc: {
      pt: "Sistema de gestão em modo quiosque (tablet) para um estúdio fotográfico de Maceió, em uso real. Substitui quadros e comandas de papel com 8 módulos: Comanda, Checklist, Estoque, Escala, Horas extras, Avisos, Achados e Treinamento. Integra com o Altegio por webhook, com log de auditoria append-only garantido no banco e autenticação por PIN por aparelho.",
      en: "Kiosk-mode (tablet) management system for a photo studio in Maceió, in real use. Replaces paper boards and tabs with 8 modules: Orders, Checklist, Inventory, Schedule, Overtime, Notices, Lost & Found and Training. Integrates with Altegio via webhook, with an append-only audit log enforced at the database level and per-device PIN authentication.",
    },
    stack: ["React", "Vite", "TypeScript", "Node.js", "PostgreSQL", "PL/pgSQL", "Claude API"],
    tags: ["web", "ai"],
    repo: "https://github.com/Thiago-Mateus0/lifetrailer-studio",
    ai: {
      name: "Merida",
      desc: {
        pt: "Assistente de IA no botão Ajuda do menu lateral. Responde dúvidas de uso com base no guia do sistema e nos tutoriais, e prepara rascunhos de Avisos, Lembretes, Achados (inclusive a partir de uma foto) e justificativas de checklist. Ela lê e sugere, mas nunca grava: a pessoa abre o rascunho no formulário normal, revisa e confirma, e o audit log registra quais campos foram alterados em relação à sugestão. O backend Node chama a API da Anthropic (Claude Haiku) com uma única ferramenta de schema estrito; o servidor valida a saída e descarta qualquer item que não tenha sido oferecido ao modelo. Guardrails: acesso conforme o perfil da sessão, interruptores e tetos de uso (mensal e diário por aparelho), tudo desligado por padrão; dados de clientes são mascarados antes de sair do servidor; assuntos financeiros e de permissão ficam fora do escopo; cada chamada registra tokens e custo, sem guardar o conteúdo enviado. Próximo uso de IA: extrair os itens da foto de uma nota fiscal e gravar tudo ou nada, só depois da confirmação humana.",
        en: "AI assistant behind the Help button in the side menu. Answers usage questions from the system guide and tutorials, and drafts Notices, Reminders, Lost & Found items (including from a photo) and checklist justifications. It reads and suggests but never writes: the user opens the draft in the regular form, reviews and confirms, and the audit log records which fields were changed from the suggestion. The Node backend calls the Anthropic API (Claude Haiku) with a single strict-schema tool; the server validates the output and discards any item that wasn't offered to the model. Guardrails: access follows the session profile, usage switches and caps (monthly and daily per device), everything off by default; customer data is masked before leaving the server; financial and permission topics are out of scope; each call logs tokens and cost without storing the content sent. Next AI use: extract line items from an invoice photo and save all-or-nothing, only after human confirmation.",
      },
      stack: ["Claude API", "tool use", "human-in-the-loop", "Node.js", "PostgreSQL"],
    },
  },
  {
    slug: "arkhe-finance",
    image: "/projetos/arkhe-finance.png",
    name: "Arkhé Finance",
    desc: {
      pt: "App de finanças pessoais que importa o CSV de conta e de fatura do Nubank, separa o que é gasto do que é só dinheiro passando pela conta (pagamento de fatura, Pix entre contas próprias, repasses), categoriza por regras e mostra orçamento, parcelas a vir e assinaturas no celular. Roda local, com SQLite e dinheiro em centavos inteiros, e a importação é idempotente. Tem 25 decisões de arquitetura (ADRs), testes automatizados e CI, e usa dados 100% fictícios na demonstração. A sincronização automática pelo Meu Pluggy é opcional.",
      en: "Personal finance app that imports Nubank account and card CSVs, separates real spending from money merely passing through the account (card bill payments, Pix between own accounts, pass-throughs), categorizes by rules, and shows budgets, upcoming installments and subscriptions on mobile. Runs locally on SQLite with integer-cent money, and imports are idempotent. It has 25 architecture decision records, automated tests and CI, and its demo uses 100% fictional data. Automatic sync through Meu Pluggy is optional.",
    },
    stack: ["Python", "FastAPI", "SQLite", "React", "TypeScript", "Tailwind", "pytest"],
    tags: ["web"],
  },
  {
    slug: "extrator-enem",
    name: "Extrator ENEM",
    desc: {
      pt: "Lê a prova e o gabarito oficiais do ENEM em PDF e entrega cada questão em JSON: enunciado, alternativas, figuras, tabelas, fórmulas e a resposta certa. Foi feito para a plataforma de estudos que desenvolvo com um sócio. O que o programa não tem certeza de ter lido direito vira alerta para conferência, em vez de passar batido. A leitura é geométrica, sem IA e sem rede, e roda dentro de um sandbox (bubblewrap ou Docker) que recusa executar se o isolamento falhar. Extraiu as 90 questões do 2º dia de 2024 e de 2025, com testes e CI.",
      en: "Reads the official ENEM exam and answer-key PDFs and outputs each question as JSON: stem, choices, figures, tables, formulas and the correct answer. Built for the study platform I'm developing with a partner. Anything it isn't sure it read correctly becomes a warning for review instead of slipping through. Reading is geometric, with no AI and no network, and runs inside a sandbox (bubblewrap or Docker) that refuses to run if isolation fails. It extracted all 90 questions of day 2 from the 2024 and 2025 exams, with tests and CI.",
    },
    stack: ["Python", "PyMuPDF", "pytest", "Docker", "bubblewrap", "GitHub Actions"],
    tags: [],
  },
  {
    slug: "study-track",
    image: "/projetos/study-track.png",
    name: "Study Track",
    desc: {
      pt: "CLI em Python para acompanhar estudos. Cada sessão registra o tópico e o tempo, o programa mostra o total estudado e controla uma meta diária. Os dados ficam em JSON. Foi meu primeiro projeto no GitHub.",
      en: "Python CLI to track studying. Each session records the topic and time, and the program shows the total studied and tracks a daily goal. Data is stored in JSON. It was my first project on GitHub.",
    },
    stack: ["Python", "JSON"],
    tags: ["web"],
  },
];

export const focus: L = {
  pt: "Foco atual: IA, ML e engenharia de IA",
  en: "Current focus: AI, ML and AI engineering",
};

export type TimelineItem = {
  period: string;
  title: L;
  place?: string;
  kind: "work" | "edu";
};

export const timeline: TimelineItem[] = [
  {
    period: "jul 2026 — ",
    title: {
      pt: "Desenvolvedor in-house (atual)",
      en: "In-house developer (current)",
    },
    place: "LifeTrailer Studio",
    kind: "work",
  },
  {
    period: "fev 2026 — ",
    title: {
      pt: "Bacharelado em Ciência da Computação (atual)",
      en: "B.Sc. in Computer Science (current)",
    },
    place: "Afya UNIMA",
    kind: "edu",
  },
];

export const learning = ["IA", "Machine Learning", "Dados"];
