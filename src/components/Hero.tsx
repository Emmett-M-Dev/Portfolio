import Image from "next/image";
import { site } from "@/lib/content";
import ParticleField from "./ParticleField";

export default function Hero() {
  const { hero } = site;

  return (
    <section className="relative overflow-hidden border-b border-border pt-32 pb-16 sm:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <ParticleField />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="label mb-6 text-xs text-accent">{hero.eyebrow}</p>

            <h1 className="font-serif text-5xl leading-[1.1] sm:text-6xl md:text-7xl">
              {hero.headline.map((part, i) => (
                <span
                  key={i}
                  className={part.italic ? "italic text-muted" : ""}
                >
                  {part.text}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
              {hero.subtext}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={hero.cta.href}
                className="label border border-foreground px-6 py-3 text-xs transition-colors hover:bg-foreground hover:text-background"
              >
                {hero.cta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="label text-xs text-muted transition-colors hover:text-foreground"
              >
                {hero.secondaryCta.label} &rarr;
              </a>
            </div>
          </div>

          <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-full border border-border shadow-[0_0_80px_-20px_var(--accent-dim)] sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <Image
              src="/profile.png"
              alt="Emmett Murray"
              fill
              priority
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 224px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8">
          {hero.stats.map((stat) => (
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
