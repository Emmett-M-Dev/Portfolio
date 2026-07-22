"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { site } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeToHoverCapability(callback: () => void) {
  const mql = window.matchMedia(HOVER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getHoverCapability() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function getServerHoverCapability() {
  return false;
}

export default function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);
  const supportsHover = useSyncExternalStore(
    subscribeToHoverCapability,
    getHoverCapability,
    getServerHoverCapability
  );

  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="label mb-10 text-xs text-accent">01 // project</p>

        <div className="flex flex-col divide-y divide-border border-t border-border sm:h-[440px] sm:flex-row sm:items-stretch sm:divide-x sm:divide-y-0 sm:border-b">
          {site.projects.map((project) => {
            const isHovered = supportsHover && hovered === project.index;
            const isDimmed = supportsHover && hovered !== null && hovered !== project.index;
            const hideDetails = isDimmed;

            return (
              <a
                key={project.index}
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                className={`flex flex-col justify-between gap-8 overflow-hidden px-6 py-8 transition-all duration-500 ease-out hover:bg-foreground/[0.03] sm:px-8 sm:py-10 ${
                  isHovered
                    ? "sm:flex-[2.4] sm:opacity-100"
                    : isDimmed
                      ? "sm:flex-[0.7] sm:opacity-70"
                      : "sm:flex-1 sm:opacity-100"
                }`}
                onMouseEnter={() => setHovered(project.index)}
                onMouseLeave={() =>
                  setHovered((current) => (current === project.index ? null : current))
                }
              >
                <div className="flex flex-1 flex-col gap-8 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="label text-xs text-muted">
                      {`${project.index} // ${project.tag}`}
                    </p>
                    <h3 className="mt-4 line-clamp-2 font-serif text-2xl">{project.title}</h3>
                    <p
                      className={`mt-3 line-clamp-4 text-sm leading-relaxed text-muted transition-opacity duration-300 ease-out ${
                        hideDetails ? "sm:pointer-events-none sm:opacity-0" : "opacity-100"
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {project.preview && (
                    <div
                      aria-hidden
                      className={`shrink-0 overflow-hidden transition-all duration-500 ease-out ${
                        isHovered ? "sm:w-64 sm:opacity-100" : "sm:w-0 sm:opacity-0"
                      }`}
                    >
                      {project.preview.image ? (
                        <div className="relative aspect-video w-64 overflow-hidden border border-border">
                          <Image
                            src={withBasePath(project.preview.image)}
                            alt={project.preview.label}
                            fill
                            sizes="256px"
                            className="object-cover object-top"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-video w-64 items-center justify-center border border-dashed border-border bg-foreground/[0.03]">
                          <p className="label px-2 text-center text-[9px] leading-relaxed text-muted">
                            {project.preview.label}
                            <br />
                            Image Pending
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div
                  className={`flex flex-wrap gap-2 transition-opacity duration-300 ease-out ${
                    hideDetails ? "sm:pointer-events-none sm:opacity-0" : "opacity-100"
                  }`}
                >
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
