import { site } from "@/lib/content";

const HIGHLIGHTED_SKILLS = new Set([
  "Python",
  "RAG / LLMs",
  "LangChain",
  "Git",
  "React",
  "Test Automation",
  "Agentic Workflows",
  "API Design",
  "Deep Learning",
  "Data Analysis",
]);

export default function About() {
  const { about } = site;

  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="label mb-10 text-xs text-accent">{about.label}</p>

        <div className="grid gap-12 sm:grid-cols-2">
          <div className="max-w-md">
            <p className="font-serif text-2xl leading-snug sm:text-3xl">
              {about.intro}
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {about.traits.map((trait) => (
                <p
                  key={trait.label}
                  className="text-sm leading-relaxed text-muted"
                >
                  <span className="font-serif text-base text-foreground">
                    {trait.label}:
                  </span>{" "}
                  {trait.description}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap content-start gap-2">
            {about.skills.map((skill) => (
              <span
                key={skill}
                className={`label border px-3 py-1.5 text-[10px] ${
                  HIGHLIGHTED_SKILLS.has(skill)
                    ? "border-accent-dim text-accent"
                    : "border-border text-muted"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8">
          {about.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl sm:text-3xl">{stat.value}</p>
              <p className="label mt-1 text-[10px] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
