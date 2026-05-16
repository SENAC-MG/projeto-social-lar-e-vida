"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deletar_Emprestimo } from "@modulos/emprestimos/controller/emprestimoController";

export default function BotaoDeletarEmprestimo({ id, onDeleted }) {
  async function handleDelete() {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este empréstimo?",
    );

    if (!confirmar) return;

    try {
      const resultado = await deletar_Emprestimo(id);

      if (resultado.success) {
        toast.success("Empréstimo deletado com sucesso!");

        if (onDeleted) {
          onDeleted();
        }
      } else {
        toast.error(resultado.error || "Erro ao deletar empréstimo.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro inesperado ao deletar.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="flex items-center justify-center p-2 rounded-lg
      bg-red-500/10 hover:bg-red-500/20
      border border-red-500/20
      text-red-400 hover:text-red-300
      transition-all duration-200"
      title="Excluir empréstimo"
    >
      <Trash2 size={18} />
    </button>
  );
}
