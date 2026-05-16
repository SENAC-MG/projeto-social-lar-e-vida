"use client";

import { deletar_Funcionario } from "@modulos/funcionarios/controller/funcionarioController";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function BotaoDeletar({ id, onDeleted }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const res = await deletar_Funcionario(id);

    if (res.success) {
      toast.success(res.message);
      await onDeleted();
    } else {
      toast.error(res.error);
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      title="Deletar funcionário"
    >
      <Trash2 size={18} />
    </button>
  );
}
