"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, Users, Search, Menu } from "lucide-react";
import { Toaster } from "sonner";

import Sidebar from "../components/sideBar";
import ModalNovoPaciente from "../components/modals/ModalNovoPaciente";
import ModalEditarPaciente from "../components/update/pacientes/ModalEditarPaciente";

import { get_Pacientes } from "@modulos/pacientes/controller/pacienteController";

import BotaoDeletarPaciente from "../components/BotaoDeletarPaciente";
import BotaoEditarPaciente from "../components/update/pacientes/BotaoEditarPaciente";

export default function PacientesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  const carregarPacientes = async () => {
    setLoading(true);

    try {
      const dados = await get_Pacientes();
      setPacientes(dados);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPacientes();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background flex overflow-x-hidden">
      <Toaster richColors position="top-right" />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 flex flex-col bg-background min-w-0 transition-all duration-300">
        <div className="p-4 sm:p-8">

          {/* Cabeçalho do Painel Adaptável */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-8">
            <div className="flex items-center gap-3 sm:gap-4">

              {/* ÍCONE DE TRÊS RISCOS: Visível apenas no Mobile */}
              <button
                type="button"
                onClick={toggleSidebar}
                className="text-foreground/60 hover:text-foreground p-2 hover:bg-foreground/10 rounded-lg transition-colors md:hidden"
                aria-label="Abrir menu"
              >
                <Menu size={24} />
              </button>

              <div className="p-3 bg-primary border border-transparent rounded-xl shadow-sm flex-shrink-0">
                <Users className="text-white" size={24} />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">Pacientes</h1>
                <p className="text-foreground/50 text-xs sm:text-sm">
                  {pacientes.length} registros
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white transition-all px-4 sm:px-6 py-2.5 rounded-lg font-medium shadow-lg w-full sm:w-auto text-sm sm:text-base"
            >
              <UserPlus size={20} />
              Novo Paciente
            </button>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                size={18}
              />

              <input
                type="text"
                placeholder="Pesquisar paciente..."
                className="w-full bg-card-bg border border-card-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* Tabela Isolada com Scroll Lateral */}
          <div className="bg-card-bg rounded-2xl border border-card-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrolling-touch">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-card-bg border-b border-card-border">
                  <tr className="text-[11px] uppercase tracking-wider text-foreground/50">
                    <th className="px-6 py-4 font-semibold">Nome</th>
                    <th className="px-6 py-4 font-semibold">Tipo de Câncer</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">CPF</th>
                    <th className="px-6 py-4 font-semibold">Cidade</th>
                    <th className="px-6 py-4 font-semibold">Telefone 1</th>
                    <th className="px-6 py-4 font-semibold">Telefone 2</th>
                    <th className="px-6 py-4 font-semibold">
                      Data de Cadastro
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="py-24 text-center text-foreground/40 italic text-sm"
                      >
                        Carregando...
                      </td>
                    </tr>
                  ) : pacientes.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="py-24 text-center text-foreground/40 italic text-sm"
                      >
                        Nenhum paciente cadastrado
                      </td>
                    </tr>
                  ) : (
                    pacientes.map((paciente) => (
                      <tr
                        key={paciente.id}
                        className="border-b border-card-border hover:bg-foreground/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-foreground font-medium text-sm">
                          {paciente.nome}
                        </td>
                        <td className="px-6 py-4 text-foreground/60 text-sm">
                          {paciente.tipoCancer}
                        </td>
                        <td className="px-6 py-4 text-foreground/60 text-sm">
                          {paciente.status}
                        </td>
                        <td className="px-6 py-4 text-foreground/60 text-sm">
                          {paciente.cpf}
                        </td>
                        <td className="px-6 py-4 text-foreground/60 text-sm">
                          {paciente.cidade}
                        </td>
                        <td className="px-6 py-4 text-foreground/60 text-sm">
                          {paciente.telefone1}
                        </td>
                        <td className="px-6 py-4 text-foreground/60 text-sm">
                          {paciente.telefone2}
                        </td>
                        <td className="px-6 py-4 text-foreground/60 text-sm">
                          {paciente.createdAt
                            ? new Date(paciente.createdAt).toLocaleDateString("pt-BR")
                            : "-"}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <BotaoEditarPaciente
                              onClick={() => setPacienteEditando(paciente)}
                            />

                            <BotaoDeletarPaciente
                              id={paciente.id}
                              onDeleted={carregarPacientes}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <ModalNovoPaciente
            onClose={() => setIsModalOpen(false)}
            onSuccess={carregarPacientes}
          />
        )}

        {pacienteEditando && (
          <ModalEditarPaciente
            paciente={pacienteEditando}
            onClose={() => setPacienteEditando(null)}
            onSuccess={carregarPacientes}
          />
        )}
      </main>
    </div>
  );
}
