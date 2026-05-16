"use client";

import React, { useState } from "react";
import {
  X,
  Save,
  RotateCcw,
  User,
  Phone,
  MapPin,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { cadastrar_Paciente } from "@modulos/pacientes/controller/pacienteController";

export default function ModalNovoPaciente({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await cadastrar_Paciente(formData);

    if (res.success) {
      toast.success(res.message);
      onSuccess?.();
      onClose();
    } else {
      toast.error(res.error);
    }

    setLoading(false);
  }

  const inputClass =
    "w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-all placeholder:text-gray-600";

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#11141d] w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#1a1f2e]">
          <h2 className="text-xl font-bold text-white">Novo Paciente</h2>

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
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <User size={14} /> Dados Pessoais
            </h3>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-8 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Nome Completo <span className="text-[#F97316]">*</span>
                </label>
                <input
                  name="nome"
                  type="text"
                  placeholder="Nome Completo"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Status <span className="text-[#F97316]">*</span>
                </label>
                <select
                  name="status"
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  CPF *
                </label>
                <input
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  RG *
                </label>
                <input
                  name="rg"
                  type="text"
                  placeholder="RG"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Nascimento *
                </label>
                <input name="nascimento" type="date" className={inputClass} />
              </div>

              <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Profissão
                </label>
                <input
                  name="profissao"
                  type="text"
                  placeholder="Ex: Professor"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Data de Cadastro
                </label>
                <input name="dataCadastro" type="date" className={inputClass} />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Stethoscope size={14} /> Informações Clínicas
            </h3>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Tipo de Câncer *
                </label>
                <input
                  name="tipoCancer"
                  type="text"
                  placeholder="Ex: Neoplasia maligna do quadrante superior externo da mama"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  CID Principal *
                </label>
                <textarea
                  name="CIDprincipal"
                  rows="2"
                  placeholder="Ex: C50.4"
                  className={`${inputClass} resize-none py-2 min-h-[60px]`}
                />
              </div>

              <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  CID Secundário / Observações
                </label>
                <textarea
                  name="CIDsecundario"
                  rows="2"
                  placeholder="Ex: C78.0"
                  className={`${inputClass} resize-none py-2 min-h-[60px]`}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin size={14} /> Endereço
            </h3>

            <div className="grid grid-cols-12 gap-4">
              <input
                name="rua"
                type="text"
                placeholder="Rua"
                className={`col-span-12 md:col-span-6 ${inputClass}`}
              />
              <input
                name="numero"
                type="text"
                placeholder="Número"
                className={`col-span-6 md:col-span-2 ${inputClass}`}
              />
              <input
                name="cep"
                type="text"
                placeholder="CEP"
                className={`col-span-6 md:col-span-4 ${inputClass}`}
              />
              <input
                name="bairro"
                type="text"
                placeholder="Bairro"
                className={`col-span-12 md:col-span-6 ${inputClass}`}
              />
              <input
                name="cidade"
                type="text"
                placeholder="Cidade"
                className={`col-span-12 md:col-span-6 ${inputClass}`}
              />
            </div>
          </section>

          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Phone size={14} /> Contato
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="telefone1"
                type="text"
                placeholder="Telefone 1"
                className={inputClass}
              />
              <input
                name="telefone2"
                type="text"
                placeholder="Telefone 2"
                className={inputClass}
              />
            </div>
          </section>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
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
              className="flex items-center gap-2 border border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-2.5 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50"
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
