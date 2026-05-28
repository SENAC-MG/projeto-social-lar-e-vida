"use client";

import React, { useState } from "react";
import { Save, RotateCcw, User } from "lucide-react";
import { toast } from "sonner";
import { cadastrar_Emprestimo } from "@modulos/emprestimos/controller/emprestimoController";
import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";

export default function ModalNovoEmprestimo({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const inputClass =
    "bg-card w-full border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await cadastrar_Emprestimo(formData);

    if (result.success) {
      toast.success(result.message || "Empréstimo cadastrado com sucesso!");
      onSuccess?.();
      onClose();
    } else {
      toast.error(result.error || "Erro ao cadastrar empréstimo.");
    }

    setLoading(false);
  }

  return (
    <Modal title="Novo Empréstimo" onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="bg-[#F7F9FC] dark:bg-background p-6 space-y-8 overflow-y-auto max-h-[85vh] custom-scrollbar"
      >
        <section>
          <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Dados Pessoais
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                Nome <span className="text-primary">*</span>
              </label>
              <input
                name="nome"
                type="text"
                placeholder="Nome completo"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                CPF <span className="text-primary">*</span>
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
                RG <span className="text-primary">*</span>
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
                Nascimento <span className="text-primary">*</span>
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
                Data do Empréstimo <span className="text-primary">*</span>
              </label>
              <input
                name="dataEmprestimo"
                type="date"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                Quantidade <span className="text-primary">*</span>
              </label>
              <input
                name="quantidade"
                type="number"
                min="1"
                required
                placeholder="1"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                Status <span className="text-primary">*</span>
              </label>
              <select
                name="status"
                required
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="">Selecione...</option>
                <option value="ativo">Ativo</option>
                <option value="devolvido">Devolvido</option>
                <option value="atrasado">Atrasado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                Previsão de Devolução
              </label>
              <input
                name="previsaoDevolucao"
                type="date"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                Data de Devolução
              </label>
              <input name="dataDevolucao" type="date" className={inputClass} />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Materiais Emprestados <span className="text-primary">*</span>
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
          <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Endereço
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                Rua <span className="text-primary">*</span>
              </label>
              <input name="rua" type="text" required className={inputClass} />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                Número <span className="text-primary">*</span>
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
                CEP <span className="text-primary">*</span>
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
                Bairro <span className="text-primary">*</span>
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
                Cidade <span className="text-primary">*</span>
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
          <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Contato
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                Telefone 1 <span className="text-primary">*</span>
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
                Telefone 2 <span className="text-primary">*</span>
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

        <div className="flex gap-3 pt-4 border-t border-border">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer flex items-center gap-2 bg-[#5C7A53] hover:bg-[#5C7A53] text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-[#5C7A53]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {loading ? "Salvando..." : "Salvar"}
          </button>

          <button
            type="reset"
            disabled={loading}
            className="cursor-pointer flex items-center gap-2 bg-[#5B6B7C] border border-gray-700 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
          >
            <RotateCcw size={18} />
            Limpar
          </button>
        </div>
      </form>
    </Modal>
  );
}
