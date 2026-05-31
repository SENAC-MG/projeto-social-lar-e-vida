"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  paginaAtual,
  totalPaginas,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-between border-t border-border px-6 py-4">
      <span className="text-sm text-muted-foreground font-medium">
        Página {paginaAtual} de {totalPaginas}
      </span>

      <div className="flex items-center overflow-hidden rounded-lg border border-border">
        <button
          type="button"
          disabled={paginaAtual === 1}
          onClick={() => onPageChange(paginaAtual - 1)}
          className="
            h-12 w-12 flex items-center justify-center
            bg-card hover:bg-primary/10
            border-r border-border
            transition-colors
            disabled:opacity-40
            disabled:cursor-not-allowed
            text-foreground
          "
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          disabled={paginaAtual === totalPaginas}
          onClick={() => onPageChange(paginaAtual + 1)}
          className="
            h-12 w-12 flex items-center justify-center
            bg-card hover:bg-primary/10
            transition-colors
            disabled:opacity-40
            disabled:cursor-not-allowed
            text-foreground
          "
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
