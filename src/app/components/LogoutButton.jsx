"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/features/auth/actions/auth-actions";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        title="Sair"
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-xl
          text-zinc-400
          hover:text-red-500
          hover:bg-red-500/10
          transition-all
        "
      >
        <LogOut size={22} />
      </button>
    </form>
  );
}
