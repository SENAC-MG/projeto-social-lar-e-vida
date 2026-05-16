"use client";

import React, { useState } from "react";
import { X, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cadastrar_Emprestimo } from "@modulos/emprestimos/controller/emprestimoController";

export default function ModalNovoEmprestimo({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await cadastrar_Emprestimo(formData);

    if (res.success) {
      toast.success(res.message);
      onSuccess?.();
      onClose();
    } else {
      toast.error(res.error);
    }

    setLoading(false);
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const inputClass =
    "w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-all placeholder:text-gray-600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-4xl bg-[#11141d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-[#11141d]">
          <h2 className="text-white font-bold text-lg">Novo Empréstimo</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-md"
          >
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-8 overflow-y-auto max-h-[85vh] custom-scrollbar"
        >
          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
              Dados Pessoais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Nome *
                </label>
                <input
                  name="nome"
                  type="text"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  CPF *
                </label>
                <input
                  name="cpf"
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  RG *
                </label>
                <input
                  name="rg"
                  type="text"
                  required
                  placeholder="MG-00-000-00"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Nascimento *
                </label>
                <input
                  name="nascimento"
                  type="date"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Data do Empréstimo *
                </label>
                <input
                  name="dataEmprestimo"
                  type="date"
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
              Materiais Emprestados *
            </h3>

            <textarea
              name="materiaisEmprestados"
              rows="3"
              required
              placeholder="Descreva os materiais"
              className={`${inputClass} resize-none min-h-[80px]`}
            />

            <p className="text-gray-500 text-[11px] italic font-medium mt-1">
              Dica: Liste todos os itens e acessórios incluídos no empréstimo.
            </p>
          </section>

          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
              Endereço
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Rua *
                </label>
                <input name="rua" type="text" required className={inputClass} />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Número *
                </label>
                <input
                  name="numero"
                  type="text"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  CEP *
                </label>
                <input
                  name="cep"
                  type="text"
                  required
                  placeholder="00000-000"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Bairro *
                </label>
                <input
                  name="bairro"
                  type="text"
                  required
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Cidade *
                </label>
                <input
                  name="cidade"
                  type="text"
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
              Contato
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Telefone 1 *
                </label>
                <input
                  name="telefone1"
                  type="text"
                  required
                  placeholder="(00) 00000-0000"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Telefone 2 *
                </label>
                <input
                  name="telefone2"
                  type="text"
                  required
                  placeholder="(00) 00000-0000"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#e85a1a] text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-orange-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {loading ? "Salvando..." : "Salvar"}
            </button>

            <button
              type="reset"
              disabled={loading}
              className="flex items-center gap-2 border border-gray-700 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
            >
              <RotateCcw size={18} />
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
