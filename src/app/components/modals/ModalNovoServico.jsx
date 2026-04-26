"use client";
import React, { useState } from "react";
import { X, Save, RotateCcw } from "lucide-react";

export default function ModalNovoServico({ onClose }) {
  // Estado para os campos de seleção (exemplo: Unidade)
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("");

  const unidades = ["Hora", "Dia", "Mês", "Sessão"];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-2xl bg-[#11141d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-[#11141d]">
          <h2 className="text-white font-bold text-lg">Novo Serviço</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-md"
          >
            <X size={22} />
          </button>
        </div>

        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Serviço */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-2 font-medium">
                Tipo de Serviço *
              </label>
              <input
                type="text"
                placeholder="Ex: Fisioterapia, Banho..."
                className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-all"
              />
            </div>

            {/* Duração */}
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">
                Duração *
              </label>
              <input
                type="text"
                placeholder="Ex: 30 minutos, 1 hora"
                className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-[#F97316] outline-none transition-all"
              />
            </div>

            {/* Valor/Preço (Opcional, mas comum em serviços) */}
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">
                Valor Sugerido (R$)
              </label>
              <input
                type="number"
                placeholder="0,00"
                className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-[#F97316] outline-none transition-all"
              />
            </div>
          </div>

          {/* Unidade de Medida (Estilo Botões Selecionáveis) */}
          <div>
            <label className="block text-gray-400 text-sm mb-3 font-medium">
              Unidade *
            </label>
            <div className="flex flex-wrap gap-3">
              {unidades.map((unidade) => {
                const isSelecionada = unidadeSelecionada === unidade;
                return (
                  <button
                    key={unidade}
                    type="button"
                    onClick={() => setUnidadeSelecionada(unidade)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95 ${
                      isSelecionada
                        ? "bg-[#F97316] text-white"
                        : "bg-white text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {unidade}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#e85a1a] text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-orange-900/20 active:scale-95"
            >
              <Save size={18} />
              Salvar Serviço
            </button>
            <button
              type="reset"
              onClick={() => setUnidadeSelecionada("")}
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
