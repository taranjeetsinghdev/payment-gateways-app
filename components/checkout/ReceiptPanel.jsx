"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";

const FEE_RATE = 0.02;

export default function ReceiptPanel({ gateway, amount }) {
  const [note, setNote] = useState(null);

  const fee = Math.round(amount * FEE_RATE * 100) / 100;
  const total = Math.round((amount + fee) * 100) / 100;
  const stamp = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handlePay = () => {
    if (!gateway) return;
    setNote(
      `This button is a placeholder. Call ${gateway.name}'s checkout from CheckoutBench.jsx — see the TODO left for you there.`
    );
  };

  return (
    <div className="lg:sticky lg:top-6">
      <div className="receipt-edge-top h-2.5 bg-paper" />
      <div className="bg-paper px-5 py-5 font-mono text-paper-ink">
        <div className="mb-3 flex items-center justify-between border-b border-dashed border-paper-ink/25 pb-3">
          <div>
            <p className="text-[13px] font-600 tracking-wide">PAYBENCH RECEIPT</p>
            <p className="text-[10.5px] text-paper-ink/55">{stamp} · draft, not sent</p>
          </div>
          <Terminal size={16} className="text-paper-ink/40" />
        </div>

        <div className="space-y-1.5 border-b border-dashed border-paper-ink/25 pb-3 text-[12.5px]">
          <div className="flex justify-between">
            <span className="text-paper-ink/70">Sample order</span>
            <span>₹{amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-paper-ink/70">Gateway fee (mock, 2%)</span>
            <span>₹{fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-1 text-[13.5px] font-600">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-1.5 border-b border-dashed border-paper-ink/25 py-3 text-[12.5px]">
          <div className="flex justify-between">
            <span className="text-paper-ink/70">Gateway</span>
            <span className="font-600">{gateway ? gateway.name : "— none chosen —"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-paper-ink/70">Status</span>
            <span
              className={
                gateway ? "text-signal-amber" : "text-paper-ink/45"
              }
            >
              {gateway ? "not wired up" : "waiting"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={!gateway}
          className="focus-ring mt-4 w-full rounded-[6px] bg-ink-900 py-2.5 text-[13px] font-600 tracking-wide text-paper transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          {gateway ? `Pay ₹${total.toFixed(2)} with ${gateway.name}` : "Choose a gateway first"}
        </button>

        {note && (
          <p className="mt-3 rounded-[6px] border border-paper-ink/15 bg-paper-dim px-3 py-2 text-[11.5px] leading-snug text-paper-ink/70">
            {note}
          </p>
        )}

        <div
          aria-hidden
          className="mt-5 h-6 w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #1E2430 0 2px, transparent 2px 5px)",
            opacity: 0.55,
          }}
        />
      </div>
      <div className="receipt-edge-bottom h-2.5 bg-paper" />
    </div>
  );
}
