"use client";

import React, { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cadastrar_Servico } from "@modulos/servicos/controller/servicoController";
import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";

export default function ModalNovoServico({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("");

  const unidades = ["Hora", "Dia", "Mês", "Sessão"];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("unidade", unidadeSelecionada);

    const res = await cadastrar_Servico(formData);

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
    "bg-card w-full border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground";

  return (
    <Modal title="Novo Serviço" onClose={onClose} className="max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[80vh] custom-scrollbar bg-[#F7F9FC] dark:bg-[#081120]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground/70 text-sm mb-2 font-medium">
                Nome <span className="text-primary">*</span>
              </label>
              <input
                name="nome"
                type="text"
                required
                placeholder="Nome completo"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-foreground/70 text-sm mb-2 font-medium">
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
          </div>

          <hr className="border-card-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-foreground/70 text-sm mb-2 font-medium">
                Tipo de Serviço <span className="text-primary">*</span>
              </label>
              <input
                name="tipoServico"
                type="text"
                required
                placeholder="Ex: Fisioterapia, Banho..."
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-foreground/70 text-sm mb-2 font-medium">
                Duração <span className="text-primary">*</span>
              </label>
              <input
                name="duracao"
                type="text"
                required
                placeholder="Ex: 30 minutos, 1 hora"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-foreground/70 text-sm mb-2 font-medium">
                Valor Sugerido (R$) <span className="text-primary">*</span>
              </label>
              <input
                name="valorServico"
                type="number"
                required
                placeholder="0"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-foreground/70 text-sm mb-3 font-medium">
              Unidade de Medida <span className="text-primary">*</span>
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
                        : "bg-card-bg border border-card-border text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {unidade}
                  </button>
                );
              })}
            </div>

            {unidadeSelecionada && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-foreground/70 text-xs mb-1.5 font-medium uppercase tracking-wider">
                  Tempo / Quantidade de {unidadeSelecionada}s
                </label>

                <div className="flex items-center gap-3">
                  <div className="relative max-w-[120px]">
                    <input
                      name="tempoServico"
                      type="number"
                      min="1"
                      required
                      placeholder="0"
                      className={inputClass}
                    />
                  </div>

                  <span className="text-foreground/70 font-medium">
                    {unidadeSelecionada === "Sessão"
                      ? "sessão(ões)"
                      : unidadeSelecionada.toLowerCase() + "(s)"}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-card-border">
            <Button
              type="submit"
              disabled={loading || !unidadeSelecionada}
              className="px-8 !bg-primary hover:!bg-primary/90 cursor-pointer text-primary-foreground"
            >
              <Save size={18} />
              {loading ? "Salvando..." : "Salvar Serviço"}
            </Button>

            <Button
              type="reset"
              variant="secondary"
              disabled={loading}
              onClick={() => setUnidadeSelecionada("")}
              className="px-8 hover:!bg-[#5B6B7C] cursor-pointer"
            >
              <RotateCcw size={18} />
              Limpar
            </Button>
          </div>
        </form>
    </Modal>
  );
}
