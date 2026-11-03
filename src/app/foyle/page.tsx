import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Instrument_Sans, Newsreader } from "next/font/google";
import Footer from "@/components/Footer";
import LoopVideo from "@/components/foyle/LoopVideo";
import { foyle } from "@/lib/foyle";
import { site } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

const newsreader = Newsreader({ variable: "--font-brand-body", subsets: ["latin"] });
const instrument = Instrument_Sans({ variable: "--font-brand-ui", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-brand-script", subsets: ["latin"] });

export const metadata: Metadata = {
  title: foyle.meta.title,
  description: foyle.meta.description,
};

const BRAND_FONT: Record<string, string> = {
  Display: "var(--font-serif)",
  Body: "var(--font-brand-body)",
  UI: "var(--font-brand-ui)",
  Script: "var(--font-brand-script)",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="label mb-6 text-xs text-accent">{children}</p>;
}

function Stats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="border-r border-b border-border px-5 py-6">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-serif text-3xl sm:text-4xl">{stat.value}</dd>
          <dd className="label mt-2 text-[10px] text-muted">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function FoyleCaseStudy() {
  const { hero, audit, painMap, silverwind, hosting, aib, brand, engineering, results, closing } = foyle;

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs">
          <Link href="/" className="label flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-accent" />
            {site.name.toUpperCase()} / {site.version}
          </Link>
          <Link href="/#work" className="label text-muted transition-colors hover:text-foreground">
            ← All work
          </Link>
        </div>
      </header>

      <main className={`flex-1 pt-16 ${newsreader.variable} ${instrument.variable} ${caveat.variable}`}>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
            <p className="label mb-8 text-xs text-muted">{hero.eyebrow}</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl">
              {hero.headline.map((part) =>
                part.italic ? (
                  <em key={part.text} className="text-accent">{part.text}</em>
                ) : (
                  <span key={part.text}>{part.text}</span>
                ),
              )}
            </h1>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted text-pretty">{hero.intro}</p>
            <div className="mt-12">
              <Stats stats={hero.stats} />
            </div>
            <div className="mt-12">
              <LoopVideo src="/foyle/matching.mp4" poster="/foyle/matching.jpg" title="Silverwind accommodation board and Find a host" />
            </div>
          </div>
        </section>

        {/* Audit */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionLabel>{audit.label}</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl">{audit.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{audit.intro}</p>
            <div className="mt-10 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
              {audit.people.map((person, i) => (
                <article key={person.pseudonym} className="flex flex-col border-r border-b border-border p-6">
                  <p className="label text-[10px] text-muted">{`0${i + 1} // ${person.role}`}</p>
                  <h3 className="mt-3 font-serif text-2xl">{person.pseudonym}</h3>
                  <p className="mt-4 flex-1 font-serif text-lg italic leading-snug text-foreground/90">“{person.quote}”</p>
                  <p className="mt-4 text-xs leading-relaxed text-muted">{person.pain}</p>
                </article>
              ))}
            </div>
            <p className="label mt-3 text-[10px] text-muted">{audit.namesNote}</p>
            <div className="mt-12">
              <p className="label mb-4 text-[11px] text-foreground">What the audit found</p>
              <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
                {audit.findings.map((finding) => (
                  <li key={finding} className="flex gap-3">
                    <span className="text-accent">—</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pain map */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionLabel>{painMap.label}</SectionLabel>
            <div className="divide-y divide-border border-y border-border">
              {painMap.items.map((item) => (
                <a key={item.anchor} href={item.anchor} className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-8">
                  <span className="text-sm text-muted">{item.pain}</span>
                  <span className="label hidden text-accent sm:block">→</span>
                  <span className="font-serif text-xl transition-colors group-hover:text-accent">{item.solution}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Silverwind feature tour */}
        <section id="silverwind" className="scroll-mt-20 border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionLabel>{silverwind.label}</SectionLabel>
            <h2 className="max-w-3xl font-serif text-3xl sm:text-5xl text-balance">{silverwind.title}</h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">{silverwind.intro}</p>

            <div className="mt-16 space-y-20">
              {silverwind.features.map((feature, i) => (
                <article
                  key={feature.id}
                  className={`grid items-center gap-8 lg:gap-12 ${feature.portrait ? "lg:grid-cols-[1fr_minmax(0,320px)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)]"}`}
                >
                  <div className={feature.portrait ? "" : i % 2 === 1 ? "lg:order-2" : ""}>
                    <p className="label text-[10px] text-muted">{`${String(i + 1).padStart(2, "0")} // fixes: ${feature.fixes}`}</p>
                    <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-balance">{feature.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted text-pretty">{feature.body}</p>
                  </div>
                  <LoopVideo
                    src={feature.video}
                    poster={feature.poster}
                    title={feature.title}
                    className={feature.portrait ? "mx-auto w-full max-w-[320px] rounded-[22px]" : ""}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Extras */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionLabel>04 // beyond silverwind</SectionLabel>

            {/* Hosting */}
            <article id={hosting.id} className="scroll-mt-20">
              <h2 className="font-serif text-3xl sm:text-4xl">{hosting.title}</h2>
              <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted">
                {hosting.body.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-[1.6fr_1fr]">
                <Image src={withBasePath(hosting.images[0].src)} alt={hosting.images[0].alt} width={1280} height={700} className="h-auto w-full border border-border" />
                <Image src={withBasePath(hosting.images[2].src)} alt={hosting.images[2].alt} width={1040} height={1050} className="h-auto w-full border border-border" />
              </div>
              <div className="mt-4 grid items-center gap-4 md:grid-cols-[1fr_1.6fr]">
                <Image src={withBasePath(hosting.images[1].src)} alt={hosting.images[1].alt} width={680} height={500} className="h-auto w-full border border-border" />
                <div>
                  <LoopVideo src={hosting.video} poster={hosting.poster} title="Silverwind host enquiries pipeline" />
                  <p className="label mt-2 text-[10px] text-muted">Each enquiry from the page, in Silverwind: call → home visit → references → AccessNI</p>
                </div>
              </div>
            </article>

            {/* AIB */}
            <article id={aib.id} className="mt-24 scroll-mt-20">
              <h2 className="font-serif text-3xl sm:text-4xl">{aib.title}</h2>
              <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted">
                {aib.body.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {aib.videos.map((video) => (
                  <figure key={video.src}>
                    <LoopVideo src={video.src} poster={video.poster} title={video.caption} />
                    <figcaption className="label mt-2 text-[10px] text-muted">{video.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <figure className="mt-6">
                <pre className="overflow-x-auto border border-border bg-foreground/[0.03] p-5 text-[11px] leading-relaxed text-foreground/80">
                  {aib.csv.join("\n")}
                </pre>
                <figcaption className="label mt-2 text-[10px] text-muted">{aib.csvNote}</figcaption>
              </figure>
            </article>

            {/* Brand kit */}
            <article id={brand.id} className="mt-24 scroll-mt-20">
              <h2 className="font-serif text-3xl sm:text-4xl">{brand.title}</h2>
              <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted">
                {brand.body.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="mt-10 overflow-hidden border border-border" style={{ background: "#faf8f3", color: "#1a1a18" }}>
                <Image src={withBasePath(brand.image.src)} alt={brand.image.alt} width={1280} height={640} className="h-auto w-full" />
                <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2">
                  <div>
                    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ fontFamily: "var(--font-brand-ui)", color: "#545450" }}>01 — Colour</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {brand.tokens.colours.map((c) => (
                        <div key={c.name}>
                          <div className="h-14 w-full rounded-[8px] border" style={{ background: c.hex, borderColor: "#e2ddd0" }} />
                          <p className="mt-2 text-[11px] font-medium" style={{ fontFamily: "var(--font-brand-ui)" }}>{c.name}</p>
                          <p className="text-[10px]" style={{ fontFamily: "var(--font-brand-ui)", color: "#545450" }}>{c.hex}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ fontFamily: "var(--font-brand-ui)", color: "#545450" }}>02 — Type</p>
                    <div className="divide-y" style={{ borderColor: "#e2ddd0" }}>
                      {brand.tokens.type.map((t) => (
                        <div key={t.role} className="flex items-baseline justify-between gap-4 py-3" style={{ borderColor: "#e2ddd0" }}>
                          <span className="text-2xl" style={{ fontFamily: BRAND_FONT[t.role], color: t.role === "Script" ? "#3fa535" : undefined }}>{t.sample}</span>
                          <span className="shrink-0 text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--font-brand-ui)", color: "#545450" }}>{`${t.role} · ${t.family}`}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3" style={{ fontFamily: "var(--font-brand-ui)" }}>
                      <span className="rounded-full px-6 py-3 text-sm font-medium text-white" style={{ background: "#0a0a0a" }}>Explore Courses →</span>
                      <span className="rounded-full px-6 py-3 text-sm font-medium text-black" style={{ background: "#3fa535" }}>Enquire →</span>
                      <span className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em]" style={{ background: "#d9eed4" }}>Internship</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Engineering */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionLabel>{engineering.label}</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl">{engineering.title}</h2>
            <ul className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted">
              {engineering.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="text-accent">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {engineering.stack.map((tech) => (
                <span key={tech} className="label border border-border px-3 py-1 text-[10px] text-muted">{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionLabel>{results.label}</SectionLabel>
            <h2 className="font-serif text-4xl sm:text-6xl">
              <em className="text-accent">{results.title}</em>
            </h2>
            <div className="mt-10 grid border-t border-l border-border sm:grid-cols-3">
              {results.stats.map((stat) => (
                <div key={stat.label} className="border-r border-b border-border px-5 py-6">
                  <p className="font-serif text-4xl">{stat.value}</p>
                  <p className="label mt-2 text-[10px] text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <ul className="mt-10 max-w-2xl space-y-3 text-sm leading-relaxed text-muted">
              {results.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3">
                  <span className="text-accent">—</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <p className="label mt-16 max-w-2xl text-[10px] leading-relaxed text-muted">{closing.text}</p>
            <Link href={closing.back.href} className="label mt-6 inline-block text-xs text-accent hover:underline">
              {closing.back.label}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
