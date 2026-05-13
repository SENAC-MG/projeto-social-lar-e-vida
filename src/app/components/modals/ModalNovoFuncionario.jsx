"use client";
import React from "react";
import {
  X,
  Save,
  RotateCcw,
  Calendar,
  User,
  Phone,
  MapPin,
  Briefcase,
  Stethoscope, // Adicionei este ícone para os CIDs
} from "lucide-react";

export default function ModalNovoFuncionario({ onClose, onSuccess }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inputClass =
    "w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-all placeholder:text-gray-600";

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#11141d] w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#1a1f2e]">
          <h2 className="text-xl font-bold text-white">Novo Funcionário</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-md"
          >
            <X size={24} />
          </button>
        </div>

        <form className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* SEÇÃO: DADOS PESSOAIS */}
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
                  type="text"
                  placeholder="Nome Completo"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Cargo <span className="text-[#F97316]">*</span>
                </label>
                <select
                  className={`${inputClass} appearance-none bg-[#11141d] cursor-pointer`}
                >
                  <option>Gerente</option>
                  <option>Assistente</option>
                  <option>Analista</option>
                </select>
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Email <span className="text-[#F97316]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="exemplo@email.com"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Telefone <span className="text-[#F97316]">*</span>
                </label>
                <input type="text" placeholder="Telefone" className={inputClass} />
              </div>
            </div>
          </section>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#e85a1a] text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-orange-900/20 active:scale-95"
            >
              <Save size={18} />
              Salvar
            </button>
            <button
              type="reset"
              className="flex items-center gap-2 border border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-2.5 rounded-lg font-bold transition-all active:scale-95"
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
