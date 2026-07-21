import { site } from "@/lib/content";

export default function Contact() {
  const { contact } = site;

  return (
    <section id="contact">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="label mb-10 text-xs text-accent">{contact.label}</p>

        <h2 className="max-w-xl font-serif text-4xl sm:text-5xl">
          {contact.heading}
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted">{contact.subtext}</p>

        <a
          href={`mailto:${contact.email}`}
          className="label mt-10 inline-block border border-foreground px-6 py-3 text-xs transition-colors hover:bg-foreground hover:text-background"
        >
          Say Hello
        </a>
      </div>
    </section>
  );
}
