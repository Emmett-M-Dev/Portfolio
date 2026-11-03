import { site } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

export default function Experience() {
  const { experience } = site;

  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="label mb-10 text-xs text-accent">{experience.label}</p>

        <div className="divide-y divide-border border-t border-border">
          {experience.entries.map((entry) => (
            <div key={entry.index} className="py-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="label text-xs text-muted">
                    {entry.index}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl">
                    {entry.role}
                  </h3>
                </div>
                <span className="label text-xs text-muted">
                  {entry.period}
                </span>
              </div>

              <p className="label mt-2 text-xs text-muted">
                {`${entry.company} — ${entry.location}`}
              </p>

              <ul className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="text-accent">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {"link" in entry && entry.link ? (
                <a
                  href={withBasePath(entry.link.href)}
                  className="label mt-5 inline-flex items-center gap-1.5 border border-accent/40 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/10"
                >
                  <span>{entry.link.label}</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
