"use client";

import React, { useState } from "react";
import { X, Save, User, Phone, MapPin, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { updatePacienteAction } from "@modulos/pacientes/controller/pacienteController";

export default function ModalEditarPaciente({ paciente, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FF7517] focus:ring-1 focus:ring-[#FF7517] outline-none transition-all placeholder:text-gray-600";

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await updatePacienteAction(paciente.id, formData);

    if (res.success) {
      toast.success(res.message || "Paciente atualizado com sucesso!");
      onSuccess?.();
      onClose();
    } else {
      toast.error(res.error || "Erro ao atualizar paciente.");
    }

    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#11141d] w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#1a1f2e]">
          <h2 className="text-xl font-bold text-white">Editar Paciente</h2>

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
              <User size={14} /> Dados Pessoais
            </h3>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-8 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Nome Completo
                </label>
                <input
                  name="nome"
                  type="text"
                  defaultValue={paciente.nome}
                  placeholder="Nome Completo"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={paciente.status ? "Ativo" : "Inativo"}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="">Não alterar</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">CPF</label>
                <input
                  name="cpf"
                  type="text"
                  defaultValue={paciente.cpf}
                  placeholder="000.000.000-00"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">RG</label>
                <input
                  name="rg"
                  type="text"
                  defaultValue={paciente.rg}
                  placeholder="RG"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Nascimento
                </label>
                <input
                  name="nascimento"
                  type="date"
                  defaultValue={formatDate(paciente.nascimento)}
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Profissão
                </label>
                <input
                  name="profissao"
                  type="text"
                  defaultValue={paciente.profissao}
                  placeholder="Ex: Professor"
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Data de Cadastro
                </label>
                <input
                  name="dataCadastro"
                  type="date"
                  defaultValue={formatDate(paciente.dataCadastro)}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[#FF7517] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Stethoscope size={14} /> Informações Clínicas
            </h3>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Tipo de Câncer
                </label>
                <input
                  name="tipoCancer"
                  type="text"
                  defaultValue={paciente.tipoCancer}
                  placeholder="Ex: Neoplasia..."
                  className={inputClass}
                />
              </div>

              <div className="col-span-12 md:col-span-6 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-400">
                  CID Principal
                </label>
                <textarea
                  name="CIDprincipal"
                  rows="2"
                  defaultValue={paciente.CIDprincipal}
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
                  defaultValue={paciente.CIDsecundario}
                  placeholder="Ex: C78.0"
                  className={`${inputClass} resize-none py-2 min-h-[60px]`}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[#FF7517] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin size={14} /> Endereço
            </h3>

            <div className="grid grid-cols-12 gap-4">
              <input
                name="rua"
                type="text"
                defaultValue={paciente.rua}
                placeholder="Rua"
                className={`col-span-12 md:col-span-6 ${inputClass}`}
              />

              <input
                name="numero"
                type="text"
                defaultValue={paciente.numero}
                placeholder="Número"
                className={`col-span-6 md:col-span-2 ${inputClass}`}
              />

              <input
                name="cep"
                type="text"
                defaultValue={paciente.cep}
                placeholder="CEP"
                className={`col-span-6 md:col-span-4 ${inputClass}`}
              />

              <input
                name="bairro"
                type="text"
                defaultValue={paciente.bairro}
                placeholder="Bairro"
                className={`col-span-12 md:col-span-6 ${inputClass}`}
              />

              <input
                name="cidade"
                type="text"
                defaultValue={paciente.cidade}
                placeholder="Cidade"
                className={`col-span-12 md:col-span-6 ${inputClass}`}
              />
            </div>
          </section>

          <section>
            <h3 className="text-[#FF7517] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Phone size={14} /> Contato
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="telefone1"
                type="text"
                defaultValue={paciente.telefone1}
                placeholder="Telefone 1"
                className={inputClass}
              />

              <input
                name="telefone2"
                type="text"
                defaultValue={paciente.telefone2}
                placeholder="Telefone 2"
                className={inputClass}
              />
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

