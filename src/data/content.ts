export type L = { pt: string; en: string };

export const profile = {
  name: "Thiago Mateus",
  location: "Maceió - AL",
  github: "https://github.com/Thiago-Mateus0",
  linkedin: "https://www.linkedin.com/in/thiago-mateus-tech/",
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
  // módulo de IA destacado dentro do projeto
  ai?: { name: string; desc: L; stack: string[] };
};

export const projects: Project[] = [
  {
    slug: "lifetrailer",
    name: "LifeTrailer",
    desc: {
      pt: "Sistema de gestão em modo quiosque (tablet) para um estúdio fotográfico de Maceió, em uso real. Substitui quadros e comandas de papel com 8 módulos: Comanda, Checklist, Estoque, Escala, Horas extras, Avisos, Achados e Treinamento. Integra com o Altegio por webhook, com log de auditoria append-only garantido no banco e autenticação por PIN por aparelho.",
      en: "Kiosk-mode (tablet) management system for a photo studio in Maceió, in real use. Replaces paper boards and tabs with 8 modules: Orders, Checklist, Inventory, Schedule, Overtime, Notices, Lost & Found and Training. Integrates with Altegio via webhook, with an append-only audit log enforced at the database level and per-device PIN authentication.",
    },
    stack: ["Next.js", "TypeScript", "PostgreSQL", "PL/pgSQL", "Claude API"],
    tags: ["web", "ai"],
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
    name: "Arkhé Finance",
    desc: {
      pt: "Aplicação de finanças pessoais que evoluiu de CLI em Python para uma API REST. Obtém transações via Open Finance (Pluggy), categoriza e permite lançamentos manuais, e importa extratos em CSV. Frontend no GitHub Pages e API no Render.",
      en: "Personal finance app that evolved from a Python CLI into a REST API. Fetches transactions via Open Finance (Pluggy), categorizes them, supports manual entries, and imports CSV statements. Frontend on GitHub Pages and API on Render.",
    },
    stack: ["Python", "FastAPI", "SQLite", "Pluggy (Open Finance)", "Render", "GitHub Pages"],
    tags: ["web"],
  },
  {
    slug: "study-track",
    name: "Study Track",
    desc: {
      pt: "CLI em Python para acompanhar estudos. Cada sessão registra matéria, tempo e data, e o programa calcula os totais mensais. Os dados ficam em JSON. Foi meu primeiro projeto no GitHub.",
      en: "Python CLI to track studying. Each session records subject, time and date, and the program computes monthly totals. Data is stored in JSON. It was my first project on GitHub.",
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
