"use client";

import React, { useState, useEffect } from "react";
import { Plus, Box, Menu } from "lucide-react";
import Sidebar from "../components/sideBar";
import ModalNovoEmprestimo from "../components/modals/ModalNovoEmprestimo";
import { get_Emprestimos } from "@modulos/emprestimos/controller/emprestimoController";
import BotaoDeletarEmprestimo from "../components/BotaoDeletarEmprestimo";

export default function EmprestimosPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Força a sidebar a abrir em telas Desktop na montagem do componente
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  async function carregarEmprestimos() {
    try {
      setLoading(true);
      const dados = await get_Emprestimos();
      setEmprestimos(dados || []);
    } catch (error) {
      console.error("Erro ao carregar empréstimos:", error);
      setEmprestimos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarEmprestimos();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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
                <Box className="text-white" size={24} />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">Empréstimos</h1>
                <p className="text-foreground/50 text-xs sm:text-sm">
                  {emprestimos.length} registros
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white transition-all px-4 sm:px-6 py-2.5 rounded-lg font-medium shadow-lg w-full sm:w-auto text-sm sm:text-base"
            >
              <Plus size={20} />
              Novo Empréstimo
            </button>
          </div>

          {/* Tabela Responsiva com Scroll Lateral */}
          <div className="bg-card-bg rounded-2xl border border-card-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrolling-touch">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-card-bg border-b border-card-border">
                  <tr className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold">
                    <th className="px-6 py-4">Nome</th>
                    <th className="px-6 py-4">Materiais</th>
                    <th className="px-6 py-4">CPF</th>
                    <th className="px-6 py-4">Cidade</th>
                    <th className="px-6 py-4">Telefone 1</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-24 text-center text-foreground/40 italic text-sm"
                      >
                        Carregando empréstimos...
                      </td>
                    </tr>
                  ) : emprestimos.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-24 text-center text-foreground/40 italic text-sm"
                      >
                        Nenhum empréstimo cadastrado
                      </td>
                    </tr>
                  ) : (
                    emprestimos.map((emprestimo) => (
                      <tr
                        key={emprestimo.id}
                        className="border-b border-card-border hover:bg-foreground/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-foreground font-medium text-sm">
                          {emprestimo.nome}
                        </td>
                        <td className="px-6 py-4 text-sm max-w-[250px] truncate text-foreground/60" title={emprestimo.materiaisEmprestados}>
                          {emprestimo.materiaisEmprestados}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/60">{emprestimo.cpf}</td>
                        <td className="px-6 py-4 text-sm text-foreground/60">{emprestimo.cidade}</td>
                        <td className="px-6 py-4 text-sm text-foreground/60">{emprestimo.telefone1}</td>
                        <td className="px-6 py-4 text-sm text-foreground/60">
                          {emprestimo.dataEmprestimo
                            ? new Date(emprestimo.dataEmprestimo).toLocaleDateString("pt-BR")
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <BotaoDeletarEmprestimo
                              id={emprestimo.id}
                              onDeleted={carregarEmprestimos}
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
          <ModalNovoEmprestimo
            onClose={() => setIsModalOpen(false)}
            onSuccess={carregarEmprestimos}
          />
        )}
      </main>
    </div>
  );
}
