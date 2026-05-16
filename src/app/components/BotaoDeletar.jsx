"use client";

import { deletar_Funcionario } from "@modulos/funcionarios/controller/funcionarioController";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function BotaoDeletar({ id, onDeleted }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmar = window.confirm(
      "Tem certeza que deseja deletar este funcionário?",
    );

    if (!confirmar) return;

    try {
      setLoading(true);

      const res = await deletar_Funcionario(id);

      if (res?.success) {
        toast.success(res.message || "Funcionário deletado com sucesso!");

        if (onDeleted) {
          await onDeleted();
        }
      } else {
        toast.error(res?.error || "Erro ao deletar funcionário.");
      }
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);

      toast.error("Erro inesperado ao deletar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title="Deletar funcionário"
      className="
        flex items-center justify-center
        w-10 h-10
        rounded-xl
        border border-red-500/10
        bg-red-500/5
        text-red-400
        hover:bg-red-500/15
        hover:border-red-500/20
        hover:scale-105
        transition-all duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
      "
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button> 
  );
}
