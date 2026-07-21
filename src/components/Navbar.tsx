import { site } from "@/lib/content";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs">
        <a href="#" className="label flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-accent" />
          {site.name.toUpperCase()} / {site.version}
        </a>
        <nav className="hidden gap-8 sm:flex">
          {site.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={site.contact.socials[0].href}
          className="label hidden text-muted transition-colors hover:text-foreground sm:block"
        >
          {site.contact.email}
        </a>
      </div>
    </header>
  );
}
