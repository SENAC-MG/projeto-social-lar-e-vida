"use client";

import react from "react";

export default function Header() {
  return (
    <header className="h-16 bg-card border-b border-zinc-700 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <p className="text-sm text-muted-foreground">Bem-Vindo(a),</p>
          <p className="text-sm font-semibold leading-none">Admin</p>
        </div>
      </div>
    </header>
  );
}
