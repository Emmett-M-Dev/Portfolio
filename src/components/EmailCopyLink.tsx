"use client";

import { useState } from "react";

export default function EmailCopyLink({
  email,
  href,
}: {
  email: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group/email relative inline-flex items-center">
      <a
        href={href}
        className="label text-xs text-muted transition-colors hover:text-foreground"
      >
        Email
      </a>

      <div className="pointer-events-none absolute left-full top-1/2 z-20 flex -translate-x-2 -translate-y-1/2 items-center gap-2 pl-3 opacity-0 transition-all duration-300 ease-out group-hover/email:pointer-events-auto group-hover/email:translate-x-0 group-hover/email:opacity-100 group-focus-within/email:pointer-events-auto group-focus-within/email:translate-x-0 group-focus-within/email:opacity-100">
        <span className="label whitespace-nowrap border border-border bg-background px-2 py-1 text-xs text-foreground">
          {email}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy email address"
          className="border border-border p-1.5 text-muted transition-colors hover:border-foreground hover:text-foreground"
        >
          {copied ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="1" />
              <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
