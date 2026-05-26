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
    "bg-card w-full border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground";

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
      <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-card">
          <h2 className="text-foreground font-bold text-lg">Editar Serviço</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-md"
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

          <hr className="border-border" />

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
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-accent"
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
              className="w-[160px] bg-card border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 !bg-primary hover:!bg-primary/90 text-primary-foreground px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
