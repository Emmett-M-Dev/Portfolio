// Edit this file to update site copy — components read from here.

export const site = {
  name: "Emmett Murray",
  role: "AI Engineer",
  version: "v.1.0",
  navLinks: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "// initializing_portfolio.sh",
    headline: [
      { text: "Building the ", italic: false },
      { text: "architecture", italic: true },
      { text: " of intelligent systems.", italic: false },
    ],
    subtext:
      "MSc AI graduate and full-stack engineer building tested, observable software — from agentic LLM pipelines grounded with RAG to the backend logic and interfaces around them.",
    cta: { label: "View Work", href: "#work" },
    secondaryCta: { label: "Get In Touch", href: "#contact" },
    stats: [
      { value: "MSc", label: "AI, Ulster Univ. 2026" },
      { value: "A4Q", label: "Certified SDET" },
      { value: "Agentic", label: "AI Dissertation Focus" },
    ],
  },
  projects: [
    {
      index: "01",
      tag: "AGENTIC AI",
      title: "Agentic Workflow Optimisation",
      description:
        "MSc dissertation: an agentic pipeline that ingests messy SME data, detects workflow bottlenecks, and proposes next-action fixes under human-in-the-loop approval — LangGraph orchestration with a RAG layer to keep recommendations grounded and auditable.",
      tech: ["Python", "LangGraph", "RAG", "Azure"],
      href: "#",
    },
    {
      index: "02",
      tag: "FULL-STACK",
      title: "Sleep.io — Sleep Pattern Prediction",
      description:
        "Solo full-stack build: relational schema design, a Python prediction engine over thousands of time-series records, and interactive Chart.js visualizations surfacing personalized sleep insights.",
      tech: ["Python", "MySQL", "JavaScript", "Chart.js"],
      href: "#",
    },
    {
      index: "03",
      tag: "FREELANCE",
      title: "Client Web Applications",
      description:
        "End-to-end freelance delivery — requirements through deployment — building front-end and back-end functionality for clients, with AI coding tools folded into the debugging and review workflow.",
      tech: ["Python", "JavaScript"],
      href: "#",
    },
  ],
  about: {
    label: "02 // about",
    paragraph:
      "I'm an MSc Artificial Intelligence graduate (Ulster University, 2026) with a full-stack engineering background and hands-on experience building agentic AI systems for my dissertation. Comfortable across the stack in Python — data pipelines, structured validation, backend logic, testing — with practical experience orchestrating LLM agent workflows in LangGraph and grounding outputs with RAG. A4Q-certified in software testing, looking to move beyond notebooks and demos into tested, observable, production-grade AI systems.",
    skills: [
      "Python",
      "LangGraph",
      "RAG / LLMs",
      "TypeScript",
      "JavaScript",
      "SQL",
      "Docker",
      "Azure",
      "Linux",
      "PowerShell",
      "pytest",
      "Git",
    ],
  },
  contact: {
    label: "03 // contact",
    heading: "Let's build something.",
    subtext:
      "Based in Derry, Northern Ireland — open to Graduate AI Engineer roles and interesting problems, remote or on-site.",
    email: "emmettm785@gmail.com",
    socials: [
      { label: "Email", href: "mailto:emmettm785@gmail.com" },
      { label: "GitHub", href: "https://github.com/EmmettM785" },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/emmett-murray-230043223",
      },
    ],
  },
};
