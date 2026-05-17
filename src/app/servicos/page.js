"use client";

import React, { useState, useEffect } from "react";
import { Plus, Wrench, Search, Menu } from "lucide-react";
import Sidebar from "../components/sideBar";
import ModalNovoServico from "../components/modals/ModalNovoServico";
import { get_Servicos } from "@modulos/servicos/controller/servicoController";
import BotaoDeletarServico from "../components/BotaoDeletarServico";

export default function ServicosPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicos, setServicos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  // Força a sidebar a abrir em telas Desktop na montagem do componente
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  async function carregarServicos() {
    try {
      const dados = await get_Servicos();
      setServicos(dados);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  }

  useEffect(() => {
    carregarServicos();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const servicosFiltrados = servicos.filter((servico) =>
    [
      servico.nome,
      servico.cpf,
      servico.tipoServico,
      servico.unidade,
    ]
      .join(" ")
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 flex flex-col bg-background min-w-0 transition-all duration-300">
        <div className="p-4 sm:p-8">

          {/* Header Responsivo */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-8">
            <div className="flex items-center gap-3 sm:gap-4">

              {/* ÍCONE DE TRÊS RISCOS: Visível apenas no Mobile */}
              <button
                onClick={toggleSidebar}
                className="text-foreground/60 hover:text-foreground p-2 hover:bg-foreground/10 rounded-lg transition-colors md:hidden"
                aria-label="Abrir menu"
              >
                <Menu size={24} />
              </button>

              <div className="p-3 bg-primary border border-transparent rounded-xl shadow-sm flex-shrink-0">
                <Wrench className="text-white" size={24} />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                  Serviços
                </h1>
                <p className="text-foreground/50 text-xs sm:text-sm">
                  {servicos.length} registros
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white transition-all px-4 sm:px-6 py-2.5 rounded-lg font-medium shadow-lg active:scale-95 w-full sm:w-auto text-sm sm:text-base"
            >
              <Plus size={20} />
              Novo Serviço
            </button>
          </div>

          {/* Pesquisa */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                size={18}
              />
              <input
                type="text"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                placeholder="Pesquisar serviço..."
                className="w-full bg-card-bg border border-card-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* Tabela Responsiva com Scroll Lateral */}
          <div className="bg-card-bg rounded-2xl border border-card-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrolling-touch">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-card-bg border-b border-card-border">
                  <tr className="text-[11px] uppercase tracking-wider text-foreground/50">
                    <th className="px-6 py-4 font-semibold">Nome</th>
                    <th className="px-6 py-4 font-semibold">CPF</th>
                    <th className="px-6 py-4 font-semibold">Tipo</th>
                    <th className="px-6 py-4 font-semibold">Duração</th>
                    <th className="px-6 py-4 font-semibold">Valor</th>
                    <th className="px-6 py-4 font-semibold">Unidade</th>
                    <th className="px-6 py-4 font-semibold">Tempo</th>
                    <th className="px-6 py-4 text-center font-semibold">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {servicosFiltrados.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-24 text-center text-foreground/40 italic text-sm"
                      >
                        Nenhum serviço cadastrado
                      </td>
                    </tr>
                  ) : (
                    servicosFiltrados.map((servico) => (
                      <tr
                        key={servico.id}
                        className="border-b border-card-border hover:bg-foreground/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-foreground font-medium text-sm">
                          {servico.nome}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/60">{servico.cpf}</td>
                        <td className="px-6 py-4 text-sm text-foreground/60">{servico.tipoServico}</td>
                        <td className="px-6 py-4 text-sm text-foreground/60">{servico.duracao}</td>
                        <td className="px-6 py-4 text-green-500 font-medium text-sm">
                          R$ {servico.valorServico}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/60">{servico.unidade}</td>
                        <td className="px-6 py-4 text-sm text-foreground/60">{servico.tempoServico}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <BotaoDeletarServico
                              id={servico.id}
                              onDeleted={carregarServicos}
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
          <ModalNovoServico
            onClose={() => setIsModalOpen(false)}
            onSuccess={carregarServicos}
          />
        )}
      </main>
    </div>
  );
}
