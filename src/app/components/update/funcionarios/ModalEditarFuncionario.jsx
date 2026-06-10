"use client";

import React, { useState } from "react";
import { Save, User } from "lucide-react";
import { toast } from "sonner";
import { updateFuncionarioAction } from "@modulos/funcionarios/controller/funcionarioController";

import Modal from "@/shared/ui/Modal";

export default function ModalEditarFuncionario({
  funcionario,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const inputClass =
    "bg-card w-full border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await updateFuncionarioAction(funcionario.id, formData);

    if (res.success) {
      toast.success(res.message);
      onSuccess?.();
      onClose();
    } else {
      toast.error(res.error || "Erro ao atualizar funcionário.");
    }

    setLoading(false);
  }

  return (
    <Modal title="Editar Funcionário" onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="bg-[#F7F9FC] dark:bg-background p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar"
      >
        <section>
          <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <User size={14} /> Dados do Funcionário
          </h3>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-400">
                Nome Completo
              </label>
              <input
                name="nome"
                type="text"
                defaultValue={funcionario.nome}
                placeholder="Nome Completo"
                className={inputClass}
              />
            </div>

            <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-400">Cargo</label>
              <input
                name="cargo"
                type="text"
                defaultValue={funcionario.cargo}
                placeholder="Cargo"
                className={inputClass}
              />
            </div>

            <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-400">
                Status
              </label>
              <select
                name="status"
                defaultValue={funcionario.status || "ativo"}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="">Não alterar</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="afastado">Afastado</option>
              </select>
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-400">Email</label>
              <input
                name="email"
                type="email"
                defaultValue={funcionario.email}
                placeholder="exemplo@email.com"
                className={inputClass}
              />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-400">
                Telefone
              </label>
              <input
                name="telefone"
                type="text"
                defaultValue={funcionario.telefone}
                placeholder="Telefone"
                className={inputClass}
              />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-400">
                Data de Contratação
              </label>
              <input
                name="dataContratacao"
                type="date"
                defaultValue={
                  funcionario.dataContratacao
                    ? new Date(funcionario.dataContratacao)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 !bg-[#5C7A53] hover:!bg-[#5C7A53] text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-[#5C7A53]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
