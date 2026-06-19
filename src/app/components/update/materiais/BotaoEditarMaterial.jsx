"use client";

import { Pencil } from "lucide-react";

export default function BotaoEditarMaterial({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 transition-colors"
            title="Editar material"
        >
            <Pencil size={16} />
        </button>
    );
}
