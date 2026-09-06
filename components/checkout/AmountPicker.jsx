"use client";

import { amountPresets } from "@/data/gateways";

export default function AmountPicker({ amount, onChange }) {
  const isPreset = amountPresets.some((p) => p.value === amount);

  return (
    <div className="rounded-card border border-ink-600 bg-ink-800 p-4">
      <p className="mb-3 text-[13px] text-muted">Sample order amount</p>
      <div className="flex flex-wrap items-center gap-2">
        {amountPresets.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => onChange(preset.value)}
            className={`focus-ring rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
              amount === preset.value
                ? "border-signal-teal/60 bg-signal-teal/10 text-signal-teal"
                : "border-ink-600 text-paper/80 hover:border-ink-500"
            }`}
          >
            {preset.label}
          </button>
        ))}

        <label
          className={`focus-within:border-signal-teal/60 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] ${
            !isPreset ? "border-signal-teal/60 text-signal-teal" : "border-ink-600 text-paper/60"
          }`}
        >
          <span className="text-muted">₹</span>
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={isPreset ? "" : amount}
            placeholder="custom"
            onChange={(e) => {
              const value = Number(e.target.value);
              if (!Number.isNaN(value) && value >= 0) onChange(value);
            }}
            className="w-16 bg-transparent text-[13px] outline-none placeholder:text-muted"
          />
        </label>
      </div>
    </div>
  );
}
