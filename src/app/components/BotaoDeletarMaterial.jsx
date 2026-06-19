"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { deletar_Material } from "@modulos/materiais/controller/materialController";

export default function BotaoDeletarMaterial({ id, onDeleted }) {
    async function handleDelete() {
        const result = await Swal.fire({
            title: "Deseja excluir este material?",
            text: "Essa ação não poderá ser desfeita.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, excluir",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#5B6B7C",
        });

        if (!result.isConfirmed) return;

        const res = await deletar_Material(id);

        if (res.success) {
            toast.success(res.message || "Material deletado com sucesso!");
            onDeleted?.();
        } else {
            toast.error(res.error || "Erro ao deletar material.");
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="cursor-pointer p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 transition-colors"
            title="Excluir material"
        >
            <Trash2 size={16} />
        </button>
    );
}
