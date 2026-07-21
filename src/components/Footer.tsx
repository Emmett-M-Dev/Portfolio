import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-[10px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex gap-6">
          {site.contact.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="label transition-colors hover:text-foreground"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className="label">SYS_STATUS: ONLINE</p>
      </div>
    </footer>
  );
}
