"use client";

import { deletar_Servico } from "@modulos/servicos/controller/servicoController";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function BotaoDeletarServico({ id, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Digite 123 para confirmar exclusão",
      input: "text",
      text: "Essa ação não poderá ser desfeita",
      inputPlaceholder: "Digite 123",
      showCancelButton: true,
      confirmButtonText: "Deletar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",

      preConfirm: (valorDigitado) => {
        if (valorDigitado !== "123") {
          Swal.showValidationMessage(
            "Código incorreto. Digite 123 para deletar.",
          );
          return false;
        }

        return true;
      },

      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const res = await deletar_Servico(id);

      if (res.success) {
        toast.success(res.message || "Serviço deletado com sucesso!");

        Swal.fire({
          icon: "success",
          title: "Serviço deletado com sucesso!",
          timer: 2000,
          showConfirmButton: false,
        });

        if (onDeleted) {
          await onDeleted();
        }
      } else {
        toast.error(res.error || "Erro ao deletar serviço.");
      }
    } catch (error) {
      toast.error(error?.message || "Erro inesperado ao deletar serviço.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      title="Deletar serviço"
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
