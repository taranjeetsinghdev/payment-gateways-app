"use client";

import { useMemo, useState } from "react";
import { gateways } from "@/data/gateways";
import AmountPicker from "@/components/checkout/AmountPicker";
import CategoryTabs from "@/components/checkout/CategoryTabs";
import GatewayCard from "@/components/checkout/GatewayCard";
import ReceiptPanel from "@/components/checkout/ReceiptPanel";

export default function CheckoutBench() {
  const [amount, setAmount] = useState(2499);
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const counts = useMemo(() => {
    const base = {
      all: gateways.length,
      upi: 0,
      aggregator: 0,
      global: 0,
    };
    gateways.forEach((g) => {
      base[g.category] = (base[g.category] ?? 0) + 1;
    });
    return base;
  }, []);

  const visibleGateways = useMemo(
    () => (category === "all" ? gateways : gateways.filter((g) => g.category === category)),
    [category]
  );

  const selectedGateway = gateways.find((g) => g.id === selectedId) ?? null;

  // NOTE for whoever is wiring this up: selecting a card only updates local
  // React state below. There is no network call, no server action, and no
  // app/api route in this project on purpose — that's the part left for you
  // to build once you're ready to integrate each gateway's real checkout.

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
      <header className="mb-10 flex flex-col gap-2 border-b border-ink-600 pb-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-signal-teal font-display text-[15px] font-700 text-ink-900">
            ₹
          </span>
          <span className="font-display text-lg font-500 text-paper">PayBench</span>
        </div>
        <p className="max-w-xl text-[14px] leading-relaxed text-muted">
          A workbench for laying out payment gateway options before you write a
          single line of integration code. Pick a gateway below to see how the
          checkout summary reacts — the actual SDK calls are yours to add.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <main className="min-w-0">
          <div className="mb-6">
            <AmountPicker amount={amount} onChange={setAmount} />
          </div>

          <div className="mb-5">
            <CategoryTabs active={category} onChange={setCategory} counts={counts} />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {visibleGateways.map((gateway) => (
              <GatewayCard
                key={gateway.id}
                gateway={gateway}
                selected={gateway.id === selectedId}
                onSelect={(id) => setSelectedId((current) => (current === id ? null : id))}
              />
            ))}
          </div>
        </main>

        <aside className="min-w-0">
          <ReceiptPanel gateway={selectedGateway} amount={amount} />
        </aside>
      </div>
    </div>
  );
}
