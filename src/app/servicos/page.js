"use client";

import React, { useState, useEffect } from "react";
import { Plus, Wrench, Search, Menu } from "lucide-react"; // Adicionado o ícone Menu
import Sidebar from "../components/sideBar";
import ModalNovoServico from "../components/modals/ModalNovoServico";
import { get_Servicos } from "@modulos/servicos/controller/servicoController";
import BotaoDeletarServico from "../components/BotaoDeletarServico";

export default function ServicosPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Inicializa fechada para Mobile
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
    <div className="min-h-screen bg-[#0a0c10] flex overflow-x-hidden">
      {/* Sidebar integrada ao controle de estado responsivo */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 flex flex-col bg-gray-950 min-w-0 transition-all duration-300">
        <div className="p-4 sm:p-8">
          
          {/* Header Responsivo */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* ÍCONE DE TRÊS RISCOS: Visível apenas no Mobile */}
              <button
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors md:hidden"
                aria-label="Abrir menu"
              >
                <Menu size={24} />
              </button>

              <div className="p-3 bg-[#F97316] border border-gray-800 rounded-xl shadow-sm flex-shrink-0">
                <Wrench className="text-white" size={24} />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                  Serviços
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {servicos.length} registros
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#e85a1a] text-white transition-all px-4 sm:px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-orange-900/20 active:scale-95 w-full sm:w-auto text-sm sm:text-base"
            >
              <Plus size={20} />
              Novo Serviço
            </button>
          </div>

          {/* Pesquisa */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                placeholder="Pesquisar serviço..."
                className="w-full bg-[#11141d] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#F97316]/50"
              />
            </div>
          </div>

          {/* Tabela Responsiva com Scroll Lateral */}
          <div className="bg-[#11141d] rounded-2xl border border-gray-800/50 overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrolling-touch">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-[#1a1f2e] border-b border-gray-800/50">
                  <tr className="text-[11px] uppercase tracking-wider text-gray-400">
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
                        className="py-24 text-center text-gray-600 italic text-sm"
                      >
                        Nenhum serviço cadastrado
                      </td>
                    </tr>
                  ) : (
                    servicosFiltrados.map((servico) => (
                      <tr
                        key={servico.id}
                        className="border-b border-gray-800 text-gray-300 hover:bg-[#1a1f2e]/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-white font-medium text-sm">
                          {servico.nome}
                        </td>
                        <td className="px-6 py-4 text-sm">{servico.cpf}</td>
                        <td className="px-6 py-4 text-sm">{servico.tipoServico}</td>
                        <td className="px-6 py-4 text-sm">{servico.duracao}</td>
                        <td className="px-6 py-4 text-green-400 font-medium text-sm">
                          R$ {servico.valorServico}
                        </td>
                        <td className="px-6 py-4 text-sm">{servico.unidade}</td>
                        <td className="px-6 py-4 text-sm">{servico.tempoServico}</td>
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