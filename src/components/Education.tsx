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

export default function Education() {
  const { education } = site;
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [yearIndex, setYearIndex] = useState(0);
  const supportsHover = useSyncExternalStore(
    subscribeToHoverCapability,
    getHoverCapability,
    getServerHoverCapability
  );

  return (
    <section id="education" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="label mb-10 text-xs text-accent">{education.label}</p>

        <div className="divide-y divide-border border-t border-border">
          {education.entries.map((entry) => {
            const isOpen = openIndex === entry.index;

            return (
              <div
                key={entry.index}
                className="py-8"
                {...(supportsHover
                  ? {
                      onMouseEnter: () => setOpenIndex(entry.index),
                      onMouseLeave: () =>
                        setOpenIndex((current) =>
                          current === entry.index ? null : current
                        ),
                    }
                  : {})}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenIndex((current) =>
                      current === entry.index ? null : entry.index
                    );
                    setYearIndex(0);
                  }}
                  aria-expanded={isOpen}
                  className="flex w-full flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="label text-xs text-muted">
                      {entry.index}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl">
                      {entry.credential}
                    </h3>
                  </div>
                  <span className="label text-xs text-muted">
                    {entry.period}
                  </span>
                </button>

                <div
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "mt-6 grid-rows-[1fr] opacity-100"
                      : "pointer-events-none grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`grid gap-6 sm:gap-10 ${
                        entry.imageFit === "contain"
                          ? "sm:grid-cols-[240px_1fr]"
                          : "sm:grid-cols-[160px_1fr]"
                      }`}
                    >
                      {entry.image ? (
                        entry.imageFit === "contain" ? (
                          <div className="flex w-full max-w-[240px] items-center">
                            <Image
                              src={withBasePath(entry.image)}
                              alt={entry.institution}
                              width={480}
                              height={270}
                              sizes="240px"
                              className="h-auto w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-[3/4] w-full max-w-[160px] overflow-hidden border border-border">
                            <Image
                              src={withBasePath(entry.image)}
                              alt={entry.institution}
                              fill
                              sizes="160px"
                              className="object-cover"
                            />
                          </div>
                        )
                      ) : (
                        <div className="flex aspect-[3/4] w-full max-w-[160px] items-center justify-center border border-dashed border-border">
                          <p className="label text-center text-[10px] leading-relaxed text-muted">
                            Photo
                            <br />
                            Pending
                          </p>
                        </div>
                      )}

                      <div>
                        <p className="text-sm text-muted">
                          {entry.institution}
                        </p>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                          {entry.description}
                        </p>

                        {entry.modules.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {entry.modules.map((module) => (
                              <span
                                key={module}
                                className="label border border-border px-2 py-1 text-[10px] text-muted"
                              >
                                {module}
                              </span>
                            ))}
                          </div>
                        )}

                        {entry.dissertationLink && (
                          <a
                            href={entry.dissertationLink.href}
                            className="label mt-6 inline-block text-xs text-accent transition-colors hover:text-foreground"
                          >
                            {entry.dissertationLink.label} &rarr;
                          </a>
                        )}

                        {entry.years && (
                          <div className="mt-6 border border-border p-6">
                            <div className="flex items-center justify-between">
                              <p className="label text-xs text-muted">
                                {`${entry.years[yearIndex].year} of ${entry.years.length}`}
                              </p>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  aria-label="Previous year"
                                  onClick={() =>
                                    setYearIndex(
                                      (i) =>
                                        (i - 1 + entry.years!.length) %
                                        entry.years!.length
                                    )
                                  }
                                  className="label border border-border px-2 py-1 text-xs text-muted transition-colors hover:text-foreground"
                                >
                                  &larr;
                                </button>
                                <button
                                  type="button"
                                  aria-label="Next year"
                                  onClick={() =>
                                    setYearIndex(
                                      (i) => (i + 1) % entry.years!.length
                                    )
                                  }
                                  className="label border border-border px-2 py-1 text-xs text-muted transition-colors hover:text-foreground"
                                >
                                  &rarr;
                                </button>
                              </div>
                            </div>

                            <h4 className="mt-4 font-serif text-xl">
                              {entry.years[yearIndex].title}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                              {entry.years[yearIndex].description}
                            </p>

                            {entry.years[yearIndex].link && (
                              <a
                                href={entry.years[yearIndex].link!.href}
                                className="label mt-4 inline-block text-xs text-accent transition-colors hover:text-foreground"
                              >
                                {entry.years[yearIndex].link!.label} &rarr;
                              </a>
                            )}

                            <div className="mt-5 flex gap-2">
                              {entry.years.map((y, i) => (
                                <button
                                  key={y.year}
                                  type="button"
                                  aria-label={y.year}
                                  onClick={() => setYearIndex(i)}
                                  className={`h-1.5 w-6 transition-colors ${
                                    i === yearIndex
                                      ? "bg-accent"
                                      : "bg-border"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
