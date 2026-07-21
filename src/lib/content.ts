// Edit this file to update site copy — components read from here.

type SectionLink = { label: string; href: string };

type EducationYear = {
  year: string;
  title: string;
  description: string;
  link: SectionLink | null;
};

type EducationEntry = {
  index: string;
  institution: string;
  credential: string;
  period: string;
  description: string;
  modules: string[];
  image: string | null;
  dissertationLink: SectionLink | null;
  years: EducationYear[] | null;
};

export const site = {
  name: "Emmett Murray",
  role: "AI Engineer",
  version: "v.1.0",
  navLinks: [
    { label: "Work", href: "#work" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
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
  education: {
    label: "02 // education",
    entries: [
      {
        index: "01",
        institution: "Queen's University Belfast",
        credential: "BSc (Hons) Computing and Information Technology",
        period: "Sep 2020 — Jun 2024",
        description:
          "Built a strong technical foundation in programming, software testing, and structured data handling through academic and project-based work.",
        modules: [
          "Data Analysis",
          "Software Testing",
          "System Administration",
          "Java Design Principles",
          "Cyber Security",
        ],
        image: "/graduation.png",
        dissertationLink: null,
        years: [
          {
            year: "Year 1",
            title: "Foundations",
            description:
              "Core programming and computing fundamentals — the building blocks for everything that followed.",
            link: null,
          },
          {
            year: "Year 2",
            title: "Core Modules",
            description:
              "Data Analysis, Software Testing, Java Design Principles, and Cyber Security — the technical core of the degree.",
            link: null,
          },
          {
            year: "Year 3",
            title: "Work Experience — CCEA",
            description:
              "Placement year as a Systems Support Engineer at CCEA, Belfast — live-environment troubleshooting across a 250+ user estate.",
            link: {
              label: "Read about the CCEA placement",
              href: "#experience",
            },
          },
          {
            year: "Year 4",
            title: "Final Year Dissertation — Sleep.io",
            description:
              "Final year dissertation: a full-stack sleep pattern analysis and prediction system, built solo end-to-end.",
            link: {
              label: "Read the dissertation project",
              href: "#work",
            },
          },
        ],
      },
      {
        index: "02",
        institution: "North West Regional College, Derry",
        credential: "A4Q Certified Software Development Engineer in Test",
        period: "Nov 2024 — Feb 2025",
        description:
          "Completed a 12-week professional course covering the SDLC, automated testing (unit and integration), and CI/CD practices.",
        modules: [],
        image: null,
        dissertationLink: null,
        years: null,
      },
      {
        index: "03",
        institution: "Ulster University",
        credential: "MSc Artificial Intelligence",
        period: "Sep 2025 — Aug 2026",
        description:
          "Designing an agentic AI workflow system for the dissertation — structured intents, tool calls, and validation rules orchestrated with LangGraph, grounded with a RAG layer and human-in-the-loop approval steps.",
        modules: [
          "Data Science & Machine Learning",
          "Deep Learning",
          "Robotics & AI",
          "CI/CD & MLOps",
          "Knowledge Engineering",
        ],
        image: null,
        dissertationLink: {
          label: "Read the dissertation project",
          href: "#work",
        },
        years: null,
      },
    ] as EducationEntry[],
  },
  experience: {
    label: "03 // experience",
    entries: [
      {
        index: "01",
        role: "Systems Support Engineer",
        company: "CCEA",
        location: "Belfast, UK",
        period: "Sep 2022 — Jun 2023",
        bullets: [
          "Diagnosed and resolved 50+ hardware, software, and network issues weekly in a live environment, working independently from a ticketing system and collaborating with senior engineers on issues affecting 250+ users.",
          "Automated recurring device setup tasks using PowerShell scripts, and maintained infrastructure to a high standard, including system updates, patch management, and security audits across Linux and Windows environments.",
          "Documented technical procedures and authored knowledge base articles to improve team-wide troubleshooting and handover.",
        ],
      },
      {
        index: "02",
        role: "Administrator",
        company: "Foyle International Language School",
        location: "Derry, UK",
        period: "Sep 2023 — Oct 2024",
        bullets: [
          "Managed student and accommodation records across internal systems, keeping structured data accurate and secure.",
          "Coordinated accommodation logistics and resolved on-site issues independently, keeping each property safe and ready for use.",
        ],
      },
      {
        index: "03",
        role: "Freelance Web Developer",
        company: "Self-Employed",
        location: "Remote",
        period: "Ongoing",
        bullets: [
          "Owned client web projects end-to-end from requirements-gathering through to deployment, building front-end and back-end functionality and debugging issues independently.",
          "Built with Python, JavaScript, and modern web tooling; incorporated AI coding tools into the workflow for debugging and code review.",
        ],
      },
    ],
  },
  about: {
    label: "04 // about",
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
    label: "05 // contact",
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
