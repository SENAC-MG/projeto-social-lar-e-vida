"use client";

import { Pencil } from "lucide-react";

export default function BotaoEditarEmprestimo({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Editar empréstimo"
      className="flex items-center justify-center w-10 h-10 rounded-xl border border-blue-500/10 bg-blue-500/5 text-blue-400 hover:bg-blue-500/15 hover:border-blue-500/20 hover:scale-105 transition-all duration-200"
    >
      <Pencil size={18} />
    </button>
  );
}
