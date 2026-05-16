"use client";
import { deletar_Funcionario } from "@modulos/funcionarios/controller/funcionarioController";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
export default function BotaoDeletar({ id }) {
  const router = useRouter();

  async function handleDelete() {
    const res = await deletar_Funcionario(id);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
    router.refresh();
  }
  return (
    <button
      onClick={handleDelete}
      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      title="Deletar funcionário"
    >
      <Trash2 size={18} />
    </button>
  );
}
