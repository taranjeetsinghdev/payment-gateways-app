"use client";

import { categoryLabels } from "@/data/gateways";

const order = ["all", "upi", "aggregator", "global"];

export default function CategoryTabs({ active, onChange, counts }) {
  return (
    <div className="flex flex-wrap gap-1.5 border-b border-ink-600 pb-3">
      {order.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`focus-ring rounded-[6px] px-3 py-1.5 text-[13px] transition-colors ${
            active === key
              ? "bg-ink-700 text-paper"
              : "text-muted hover:text-paper"
          }`}
        >
          {categoryLabels[key]}
          <span className="ml-1.5 text-[11px] text-muted">{counts[key] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
