"use client";

import React, { useState } from "react";
import { X, Save, User } from "lucide-react";
import { toast } from "sonner";
import { updateFuncionarioAction } from "@modulos/funcionarios/controller/funcionarioController";

export default function ModalEditarFuncionario({
  funcionario,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF7517] focus:ring-1 focus:ring-[#FF7517] outline-none transition-all placeholder:text-gray-600";

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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#11141d] w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#1a1f2e]">
          <h2 className="text-xl font-bold text-white">Editar Funcionário</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-md"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar"
        >
          <section>
            <h3 className="text-[#FF7517] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
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
                <label className="text-sm font-medium text-gray-400">
                  Cargo
                </label>
                <input
                  name="cargo"
                  type="text"
                  defaultValue={funcionario.cargo}
                  placeholder="Cargo"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Email
                </label>
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
            </div>
          </section>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#FF7517] hover:bg-[#FF7517] text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-[#FF7517]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

