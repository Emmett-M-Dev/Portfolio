"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
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

type ActiveVideoModal = {
  url: string;
  poster?: string;
  title: string;
  tag: string;
  githubHref: string;
};

export default function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<ActiveVideoModal | null>(null);

  const supportsHover = useSyncExternalStore(
    subscribeToHoverCapability,
    getHoverCapability,
    getServerHoverCapability
  );

  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-center justify-between">
          <p className="label text-xs text-accent">01 // project</p>
          <p className="label text-[11px] text-muted hidden sm:block">
            Hover to expand preview // Click project or video button to view
          </p>
        </div>

        <div className="flex flex-col divide-y divide-border border-t border-border min-h-[460px] sm:flex-row sm:items-stretch sm:divide-x sm:divide-y-0 sm:border-b">
          {site.projects.map((project) => {
            const isHovered = supportsHover && hovered === project.index;
            const isDimmed = supportsHover && hovered !== null && hovered !== project.index;
            const hideDetails = isDimmed;

            return (
              <div
                key={project.index}
                className={`group flex flex-col justify-between gap-8 overflow-hidden px-6 py-8 transition-all duration-500 ease-out hover:bg-foreground/[0.03] sm:px-8 sm:py-10 ${
                  isHovered
                    ? "sm:flex-[2.6] sm:opacity-100"
                    : isDimmed
                      ? "sm:flex-[0.7] sm:opacity-70"
                      : "sm:flex-1 sm:opacity-100"
                }`}
                onMouseEnter={() => setHovered(project.index)}
                onMouseLeave={() =>
                  setHovered((current) => (current === project.index ? null : current))
                }
              >
                <div className="flex flex-1 flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <p className="label text-xs text-muted">
                        {`${project.index} // ${project.tag}`}
                      </p>
                      {project.videoUrl && (
                        <span className="label rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[9px] font-semibold text-accent">
                          DEMO VIDEO
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 font-serif text-2xl text-balance">
                      <a
                        href={project.href}
                        target={project.href.startsWith("http") ? "_blank" : undefined}
                        rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                        className="transition-colors hover:text-accent"
                      >
                        {project.title}
                      </a>
                    </h3>

                    <p
                      className={`mt-3 line-clamp-5 text-sm leading-relaxed text-muted transition-opacity duration-300 ease-out text-pretty ${
                        hideDetails ? "sm:pointer-events-none sm:opacity-0" : "opacity-100"
                      }`}
                    >
                      {project.description}
                    </p>

                    <div
                      className={`mt-6 flex flex-wrap items-center gap-3 transition-opacity duration-300 ease-out ${
                        hideDetails ? "sm:pointer-events-none sm:opacity-0" : "opacity-100"
                      }`}
                    >
                      {project.videoUrl && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideo({
                              url: project.videoUrl!,
                              poster: project.preview?.image,
                              title: project.title,
                              tag: project.tag,
                              githubHref: project.href,
                            });
                          }}
                          className="label cursor-pointer inline-flex items-center gap-2 border border-accent bg-accent/10 px-3 py-1.5 text-xs text-accent transition-all duration-200 hover:bg-accent hover:text-background active:scale-[0.98]"
                        >
                          <svg
                            className="h-3.5 w-3.5 fill-current"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Watch Demo Video</span>
                        </button>
                      )}

                      <a
                        href={project.href}
                        target={project.href.startsWith("http") ? "_blank" : undefined}
                        rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                        className="label inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs text-muted transition-all duration-200 hover:border-foreground hover:text-foreground active:scale-[0.98]"
                      >
                        <span>{project.href.includes("github.com") ? "GitHub Repo" : "View Project"}</span>
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>

                  {project.preview && (
                    <div
                      className={`shrink-0 overflow-hidden transition-all duration-500 ease-out ${
                        isHovered ? "sm:w-72 sm:opacity-100" : "sm:w-0 sm:opacity-0"
                      }`}
                    >
                      <div className="relative aspect-video w-72 overflow-hidden border border-border bg-foreground/[0.03]">
                        {project.preview.video ? (
                          <div
                            className="group/vid relative h-full w-full cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (project.videoUrl) {
                                setActiveVideo({
                                  url: project.videoUrl,
                                  poster: project.preview?.image,
                                  title: project.title,
                                  tag: project.tag,
                                  githubHref: project.href,
                                });
                              }
                            }}
                          >
                            <video
                              src={withBasePath(project.preview.video)}
                              poster={project.preview.image ? withBasePath(project.preview.image) : undefined}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="h-full w-full object-cover object-top"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/vid:opacity-100 backdrop-blur-[2px]">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background shadow-lg transition-transform duration-200 group-hover/vid:scale-110">
                                <svg
                                  className="h-5 w-5 translate-x-0.5 fill-current"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                              <span className="label mt-2 text-[10px] text-white">
                                Click to Play Demo Video
                              </span>
                            </div>
                          </div>
                        ) : project.preview.image ? (
                          <Image
                            src={withBasePath(project.preview.image)}
                            alt={project.preview.label}
                            fill
                            sizes="288px"
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center border border-dashed border-border">
                            <p className="label px-2 text-center text-[9px] leading-relaxed text-muted">
                              {project.preview.label}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`flex flex-wrap gap-2 pt-4 border-t border-border/50 transition-opacity duration-300 ease-out ${
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setActiveVideo(null)}
          />

          <div className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden border border-border bg-background shadow-2xl rounded-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <p className="label text-[10px] text-accent">{activeVideo.tag}</p>
                <h4 className="font-serif text-lg text-foreground sm:text-xl">
                  {activeVideo.title} — Demo Walkthrough
                </h4>
              </div>

              <button
                type="button"
                aria-label="Close demo video"
                onClick={() => setActiveVideo(null)}
                className="flex h-11 w-11 items-center justify-center border border-border text-muted transition-colors hover:border-foreground hover:text-foreground rounded-lg"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Video Content */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={withBasePath(activeVideo.url)}
                poster={activeVideo.poster ? withBasePath(activeVideo.poster) : undefined}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-4 bg-foreground/[0.02]">
              <p className="text-xs text-muted">
                Press <kbd className="rounded border border-border bg-foreground/[0.05] px-1.5 py-0.5 text-[10px] text-foreground font-mono">ESC</kbd> or click outside to close
              </p>

              <div className="flex items-center gap-3">
                {activeVideo.githubHref && (
                  <a
                    href={activeVideo.githubHref}
                    target="_blank"
                    rel="noreferrer"
                    className="label inline-flex items-center gap-1.5 border border-border px-4 py-2 text-xs text-foreground transition-colors hover:bg-foreground hover:text-background rounded-md"
                  >
                    <span>View Repository on GitHub</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="label border border-border px-4 py-2 text-xs text-muted transition-colors hover:text-foreground rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

