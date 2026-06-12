"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/features/auth/actions/auth-actions";

export default function LogoutButton() {
    return (
        <form action={logoutAction}>
            <button
                type="submit"
                title="Sair"
                className="flex items-center w-full py-2 rounded-lg gap-3 px-4 text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
            >
                <LogOut size={20} className="flex-shrink-0" />
                <span className="font-medium text-sm truncate">Sair</span>
            </button>
        </form>
    );
}
