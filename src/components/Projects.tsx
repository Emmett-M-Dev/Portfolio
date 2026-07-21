import { site } from "@/lib/content";

export default function Projects() {
  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="label mb-10 text-xs text-accent">01 // work</p>

        <div className="grid divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-b">
          {site.projects.map((project) => (
            <a
              key={project.index}
              href={project.href}
              className="group flex flex-col justify-between gap-8 px-6 py-8 transition-colors hover:bg-foreground/[0.03] sm:px-8 sm:py-10"
            >
              <div>
                <p className="label text-xs text-muted">
                  {`${project.index} // ${project.tag}`}
                </p>
                <h3 className="mt-4 font-serif text-2xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="label border border-border px-2 py-1 text-[10px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
