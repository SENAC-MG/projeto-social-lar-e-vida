"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { deletar_Emprestimo } from "@modulos/emprestimos/controller/emprestimoController";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BotaoDeletarEmprestimo({ id, onDeleted }) {
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
 
    const router = useRouter();
 
   async function handleDelete() {
     const result = await Swal.fire({
       title: "Digite 123 para confirmar exclusão",
       input: "text",
       text: "Essa ação não poderá ser desfeita",
       inputPlaceholder: "Digite 123",
       showCancelButton: true,
       confirmButtonText: "Deletar",
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
 
     if (!result.isConfirmed) {
       return;
     }
 
     setLoading(true);
 
    try {
      const res = await deletar_Emprestimo(id);
 
       if (res.success) {
         toast.success(res.message);
 
         Swal.fire({
           icon: "success",
           title: "Registro deletado com sucesso!",
           timer: 2000,
           showConfirmButton: false,
         });
       } else {
        toast.error(res.error || "Erro ao deletar empréstimo.");
       }
     } catch (error) {
      toast.error(error?.message || "Erro inesperado ao deletar empréstimo.");
    } finally {
      setLoading(false);
      try {
        if (onDeleted && typeof onDeleted === "function") {
          await onDeleted();
        }
      } catch (e) {
        // ignore
      }

      try {
        router.refresh();
      } catch (e) {
        // ignore
      }
    }
   }
=======
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
      const res = await deletar_Emprestimo(id);

      if (res.success) {
        toast.success(res.message || "Empréstimo deletado com sucesso!");

        Swal.fire({
          icon: "success",
          title: "Empréstimo deletado com sucesso!",
          timer: 2000,
          showConfirmButton: false,
        });

        if (onDeleted) {
          await onDeleted();
        }
      } else {
        toast.error(res.error || "Erro ao deletar empréstimo.");
      }
    } catch (error) {
      toast.error(error?.message || "Erro inesperado ao deletar empréstimo.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

>>>>>>> 28bd967c19790e58ebd792fb2224e1f9de840acf
  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center justify-center p-2 rounded-lg
      bg-red-500/10 hover:bg-red-500/20
      border border-red-500/20
      text-red-400 hover:text-red-300
      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Excluir empréstimo"
    >
      <Trash2 size={18} />
    </button>
  );
}
