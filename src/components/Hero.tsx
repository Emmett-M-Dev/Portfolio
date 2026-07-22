import Image from "next/image";
import { site } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";
import ParticleField from "./ParticleField";
import EmailCopyLink from "./EmailCopyLink";

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

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
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
              src={withBasePath("/profile.png")}
              alt="Emmett Murray"
              fill
              priority
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 224px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 flex max-w-xl flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-8">
          {site.contact.socials.map((social) =>
            social.label === "Email" ? (
              <EmailCopyLink
                key={social.label}
                email={site.contact.email}
                href={social.href}
              />
            ) : (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                className="label text-xs text-muted transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
