"use client";

import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { toast } from "sonner";
import { updateServicoAction } from "@modulos/servicos/controller/servicoController";

export default function ModalEditarServico({ servico, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(
    servico.unidade || "",
  );

  const unidades = ["Hora", "Dia", "Mês", "Sessão"];

  const inputClass =
    "w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-[#FF7517] focus:ring-1 focus:ring-[#FF7517] outline-none transition-all placeholder:text-gray-600";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (unidadeSelecionada) {
      formData.set("unidade", unidadeSelecionada);
    }

    const res = await updateServicoAction(servico.id, formData);

    if (res.success) {
      toast.success(res.message || "Serviço atualizado com sucesso!");
      onSuccess?.();
      onClose();
    } else {
      toast.error(res.error || "Erro ao atualizar serviço.");
    }

    setLoading(false);
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-2xl bg-[#11141d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-[#11141d]">
          <h2 className="text-white font-bold text-lg">Editar Serviço</h2>

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
          className="p-6 space-y-6 overflow-y-auto max-h-[80vh] custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="nome"
              type="text"
              defaultValue={servico.nome}
              placeholder="Nome completo"
              className={inputClass}
            />

            <input
              name="cpf"
              type="text"
              defaultValue={servico.cpf}
              placeholder="CPF"
              className={inputClass}
            />
          </div>

          <hr className="border-gray-800" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="tipoServico"
              type="text"
              defaultValue={servico.tipoServico}
              placeholder="Tipo de Serviço"
              className={`md:col-span-2 ${inputClass}`}
            />

            <input
              name="duracao"
              type="text"
              defaultValue={servico.duracao}
              placeholder="Duração"
              className={inputClass}
            />

            <input
              name="valorServico"
              type="number"
              defaultValue={servico.valorServico}
              placeholder="Valor"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-3 font-medium">
              Unidade de Medida
            </label>

            <div className="flex flex-wrap gap-3 mb-4">
              {unidades.map((unidade) => {
                const isSelecionada = unidadeSelecionada === unidade;

                return (
                  <button
                    key={unidade}
                    type="button"
                    onClick={() => setUnidadeSelecionada(unidade)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95 ${
                      isSelecionada
                        ? "bg-[#FF7517] text-white"
                        : "bg-white text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {unidade}
                  </button>
                );
              })}
            </div>

            <input
              name="tempoServico"
              type="number"
              min="1"
              defaultValue={servico.tempoServico}
              placeholder="Tempo / quantidade"
              className="w-[160px] bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-[#FF7517] focus:ring-1 focus:ring-[#FF7517] outline-none transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#FF7517] hover:bg-[#FF7517] text-white px-8 py-2.5 rounded-lg font-bold transition-all disabled:opacity-50"
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

