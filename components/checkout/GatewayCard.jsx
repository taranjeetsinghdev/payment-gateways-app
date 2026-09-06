"use client";

import { useState } from "react";
import { ChevronDown, Check, Copy } from "lucide-react";

export default function GatewayCard({ gateway, selected, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  const [copiedVar, setCopiedVar] = useState(null);

  const handleCopy = async (envVar) => {
    try {
      await navigator.clipboard.writeText(envVar);
      setCopiedVar(envVar);
      setTimeout(() => setCopiedVar((v) => (v === envVar ? null : v)), 1400);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context) — fail quietly.
    }
  };

  return (
    <div
      className={`rounded-card border transition-colors ${
        selected
          ? "border-signal-teal/70 bg-ink-700"
          : "border-ink-600 bg-ink-800 hover:border-ink-500"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(gateway.id)}
        aria-pressed={selected}
        className="focus-ring flex w-full items-start gap-3 rounded-card p-4 text-left"
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] font-display text-sm font-700"
          style={{
            backgroundColor: gateway.color,
            color: gateway.textOnColor === "light" ? "#F8F7F3" : "#12161F",
          }}
        >
          {gateway.initials}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="font-display text-[15px] font-500 text-paper">
              {gateway.name}
            </span>
            {selected && (
              <span className="flex items-center gap-1 rounded-full bg-signal-teal/15 px-2 py-0.5 text-[11px] text-signal-teal">
                <Check size={12} strokeWidth={2.5} />
                Selected
              </span>
            )}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-muted">
            {gateway.tagline}
          </span>
        </span>
      </button>

      <div className="border-t border-ink-600/70 px-4 py-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
          className="focus-ring flex w-full items-center justify-between py-1.5 text-[12.5px] text-muted hover:text-paper"
        >
          <span>What you'll need to wire up</span>
          <ChevronDown
            size={15}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {expanded && (
          <div className="space-y-3 pb-3 pt-1">
            <ol className="space-y-1.5">
              {gateway.setupSteps.map((step, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] text-muted">
                  <span className="mt-[1px] font-mono text-[11px] text-signal-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug">{step}</span>
                </li>
              ))}
            </ol>

            <div>
              <p className="mb-1.5 text-[11px] uppercase tracking-wide text-ink-500">
                Env vars
              </p>
              <div className="flex flex-wrap gap-1.5">
                {gateway.envVars.map((envVar) => (
                  <button
                    key={envVar}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(envVar);
                    }}
                    className="focus-ring flex items-center gap-1 rounded-[6px] border border-ink-600 bg-ink-900 px-2 py-1 font-mono text-[11px] text-paper/80 hover:border-ink-500"
                  >
                    {copiedVar === envVar ? (
                      <Check size={11} className="text-signal-teal" />
                    ) : (
                      <Copy size={11} className="text-muted" />
                    )}
                    {envVar}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={gateway.docsUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="focus-ring inline-block text-[12.5px] text-signal-teal underline underline-offset-2 hover:text-signal-teal/80"
            >
              Official docs ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
