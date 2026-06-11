"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ChartSection({ titulo, children }) {
    const [aberto, setAberto] = useState(true);

    return (
        <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold dark:text-white">{titulo}</h2>

                <button
                    type="button"
                    onClick={() => setAberto(!aberto)}
                    className="p-2 rounded-lg bg-[#5c7a53] transition"
                >
                    {aberto ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                </button>
            </div>

            {aberto && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">{children}</div>
            )}
        </section>
    );
}
