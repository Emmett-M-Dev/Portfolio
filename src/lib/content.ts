// Edit this file to update site copy — components read from here.

type SectionLink = { label: string; href: string };

type EducationYear = {
  year: string;
  title: string;
  description: string;
  link: SectionLink | null;
};

type ProjectPreview = {
  label: string;
  image?: string;
  video?: string;
};

type ProjectEntry = {
  index: string;
  tag: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
  preview: ProjectPreview | null;
  videoUrl?: string;
};

type EducationEntry = {
  index: string;
  institution: string;
  credential: string;
  period: string;
  description: string;
  modules: string[];
  image: string | null;
  imageFit: "cover" | "contain";
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
    { label: "Work Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "// initializing_portfolio.sh",
    headline: [
      { text: "Your ", italic: false },
      { text: "direct access", italic: true },
      { text: " to implementing intelligent AI systems.", italic: false },
    ],
    subtext:
      "Hello 👋, I'm Emmett — I build AI automations and full-stack web applications. I have a BSc in Computing and Information Technology from Queen's University Belfast and I'm currently completing my Master's in Artificial Intelligence at Ulster University. Any opportunity to expand my skillset is welcome — just reach out to me by email or LinkedIn (links below).",
    cta: { label: "View Work", href: "#work" },
    secondaryCta: { label: "Get In Touch", href: "#contact" },
  },
  projects: [
    {
      index: "01",
      tag: "AGENTIC AI — MSC DISSERTATION",
      title: "SME Bottleneck Pipeline",
      description:
        "MSc dissertation research project: an agentic AI pipeline that ingests messy SME operational data, infers schema mappings, detects workflow bottlenecks, and diagnoses fixes via RAG with human-in-the-loop approval gates — complete with a live React & FastAPI management dashboard.",
      tech: ["Python", "LangGraph", "RAG", "ChromaDB", "FastAPI", "React"],
      href: "https://github.com/Emmett-M-Dev/sme-bottleneck-pipeline",
      preview: {
        label: "SME Bottleneck Pipeline — Demo Video",
        image: "/sme-bottleneck-poster.jpg",
        video: "/sme-bottleneck-demo.mp4",
      },
      videoUrl: "/sme-bottleneck-demo.mp4",
    },
    {
      index: "02",
      tag: "FULL-STACK",
      title: "Sleep.io — Sleep Pattern Prediction",
      description:
        "Solo full-stack build: relational schema design, a Python prediction engine over thousands of time-series records, and interactive Chart.js visualizations surfacing personalized sleep insights.",
      tech: ["Python", "MySQL", "JavaScript", "Chart.js"],
      href: "https://github.com/Emmett-M-Dev/sleep-tracking-website",
      preview: { label: "Sleep.io — Dashboard", image: "/sleepdashboards.png" },
    },
    {
      index: "03",
      tag: "FREELANCE",
      title: "Client Web Applications",
      description:
        "End-to-end freelance delivery — requirements through deployment — building front-end and back-end functionality for clients, with AI coding tools folded into the debugging and review workflow.",
      tech: ["Python", "JavaScript"],
      href: "https://foyle.eu/",
      preview: { label: "foyle.eu — Landing Page", image: "/foyle-preview.png" },
    },
  ] as ProjectEntry[],
  education: {
    label: "02 // education",
    entries: [
      {
        index: "01",
        institution: "Ulster University",
        credential: "MSc Artificial Intelligence",
        period: "Sep 2025 — Aug 2026",
        description:
          "Designed and built an agentic AI workflow system for the dissertation — SME operational bottleneck detection, schema inference, and RAG diagnosis with human-in-the-loop approval, orchestrated using Python, LangGraph, and ChromaDB with a FastAPI/React dashboard.",
        modules: [
          "Data Science & Machine Learning",
          "Deep Learning",
          "Robotics & AI",
          "CI/CD & MLOps",
          "Knowledge Engineering",
        ],
        image: "/ulsterlogo.png",
        imageFit: "contain",
        dissertationLink: {
          label: "View SME Bottleneck Pipeline & Demo Video",
          href: "#work",
        },
        years: null,
      },
      {
        index: "02",
        institution: "North West Regional College, Derry",
        credential: "A4Q Certified Software Development Engineer in Test",
        period: "Nov 2024 — Feb 2025",
        description:
          "Completed a 12-week professional course covering the SDLC, automated testing (unit and integration), and CI/CD practices.",
        modules: [],
        image: "/NWRClogo.png",
        imageFit: "contain",
        dissertationLink: null,
        years: null,
      },
      {
        index: "03",
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
        imageFit: "cover",
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
    ] as EducationEntry[],
  },
  experience: {
    label: "03 // work experience",
    entries: [
      {
        index: "01",
        role: "Freelance Web Developer",
        company: "Self-Employed",
        location: "Remote",
        period: "Ongoing",
        bullets: [
          "Owned client web projects end-to-end from requirements-gathering through to deployment, building front-end and back-end functionality and debugging issues independently.",
          "Built with Python, JavaScript, and modern web tooling; incorporated AI coding tools into the workflow for debugging and code review.",
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
    ],
  },
  about: {
    label: "04 // about",
    intro: "From a birds eye view, I am:",
    traits: [
      {
        label: "A tech optimist",
        description:
          "I believe in technological growth — green tech, space-based industries, and specifically AI are all essential industries that will bring a better future.",
      },
      {
        label: "A socialite",
        description:
          "I'm great at meeting people, delivering talks, and building relationships. My friends would all refer to me as \"outgoing\", and are often impressed at how easily I strike up conversations with strangers.",
      },
      {
        label: "An opportunist",
        description:
          "Although I like to think that my career choices have been deliberate and well-planned, most of my successes involve me stumbling on, and then taking advantage of, short-term opportunities. In simple terms, I act first and figure things out later.",
      },
    ],
    stats: [
      { value: "MSc", label: "AI, Ulster Univ. 2026" },
      { value: "A4Q", label: "Certified SDET" },
      { value: "Agentic", label: "AI Dissertation Focus" },
    ],
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
      "Machine Learning",
      "Deep Learning",
      "Prompt Engineering",
      "Vector Databases",
      "Pandas",
      "NumPy",
      "Jupyter",
      "Data Analysis",
      "Knowledge Engineering",
      "Next.js",
      "React",
      "Node.js",
      "Tailwind CSS",
      "HTML / CSS",
      "MySQL",
      "Chart.js",
      "REST APIs",
      "Java",
      "Test Automation",
      "CI/CD",
      "MLOps",
      "Agile / SDLC",
      "System Administration",
      "Windows Server",
      "Cyber Security",
      "GitHub Actions",
      "LangChain",
      "Agentic Workflows",
      "Human-in-the-Loop Systems",
      "Relational Database Design",
      "Time-Series Analysis",
      "Data Visualization",
      "API Design",
      "Requirements Gathering",
      "Technical Documentation",
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
      { label: "GitHub", href: "https://github.com/Emmett-M-Dev" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/emmett-murray-230043223/",
      },
    ],
  },
};
