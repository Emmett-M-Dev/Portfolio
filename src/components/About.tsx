import { site } from "@/lib/content";

export default function About() {
  const { about } = site;

  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="label mb-10 text-xs text-accent">{about.label}</p>

        <div className="grid gap-12 sm:grid-cols-2">
          <p className="max-w-md font-serif text-2xl leading-snug sm:text-3xl">
            {about.paragraph}
          </p>

          <div className="flex flex-wrap content-start gap-2">
            {about.skills.map((skill) => (
              <span
                key={skill}
                className="label border border-border px-3 py-1.5 text-[10px] text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
