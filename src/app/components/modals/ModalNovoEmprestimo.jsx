"use client";
import React, { useState } from "react";
import { X, Save, RotateCcw, Calendar } from "lucide-react";

/**
 * @typedef {Object} ModalProps
 * @property {() => void} onClose
 */

/**
 * @param {ModalProps} props
 */
export default function ModalNovoEmprestimo({ onClose }) {
  // Estado para controlar qual material está selecionado
  const [materialSelecionado, setMaterialSelecionado] =
    useState("Cadeira de Roda");

  const listaMateriais = [
    "Cadeira de Roda",
    "Cadeira de Banho",
    "Andadores",
    "Muletas",
  ];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-4xl bg-[#11141d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
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

        <form className="p-6 space-y-8 overflow-y-auto max-h-[85vh] custom-scrollbar">
          {/* Seção: DADOS PESSOAIS */}
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
                  type="text"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  CPF *
                </label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  RG *
                </label>
                <input
                  type="text"
                  placeholder="MG-00-000-00"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Nascimento *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="dd / mm / aaaa"
                    className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Data do Empréstimo *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    defaultValue="2026-04-26"
                    className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Seção: MATERIAIS */}
          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
              Materiais Emprestados *
            </h3>
            <div className="flex flex-wrap gap-3">
              {listaMateriais.map((item) => {
                const isSelecionado = materialSelecionado === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMaterialSelecionado(item)}
                    className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95 ${
                      isSelecionado
                        ? "bg-[#F97316] text-white"
                        : "bg-white text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <p className="text-red-500 text-[11px] mt-2 italic font-medium">
              Selecione ao menos um material
            </p>
          </section>

          {/* Seção: ENDEREÇO */}
          <section>
            <h3 className="text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
              Endereço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Rua *
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Número *
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  CEP *
                </label>
                <input
                  type="text"
                  placeholder="00000-000"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Bairro *
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Cidade *
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Seção: CONTATO */}
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
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1.5 font-medium">
                  Telefone 2
                </label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#F97316] outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#e85a1a] text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-orange-900/20 active:scale-95"
            >
              <Save size={18} />
              Salvar
            </button>
            <button
              type="reset"
              onClick={() => setMaterialSelecionado("")}
              className="flex items-center gap-2 border border-gray-700 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-all active:scale-95"
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
