"use client";


import React, { useState, useEffect } from "react";

import { UserPlus, Hospital, Search, Menu } from "lucide-react";

import AppShell from "@/shared/layouts/AppShell";
import ModalNovoFuncionario from "../components/modals/ModalNovoFuncionario";
import ModalEditarFuncionario from "../components/update/funcionarios/ModalEditarFuncionario";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";
import Button from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTable, EmptyTableState } from "@/shared/ui/Table";

import { get_Funcionarios } from "@modulos/funcionarios/controller/funcionarioController";

import BotaoDeletar from "../components/BotaoDeletar";
import BotaoEditarFuncionario from "../components/update/funcionarios/BotaoEditarFuncionario";

export default function FuncionariosPage() {
  const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);

  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarFuncionarios = async () => {
    setLoading(true);

    try {
      const dados = await get_Funcionarios();
      setFuncionarios(dados);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  return (
    <AppShell isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <main className="flex-1 flex flex-col bg-[#EEF2F7] dark:bg-[#081120] min-w-0 transition-all duration-300">

        <div className="p-4 sm:p-8">



          {/* Cabeçalho Responsivo */}

          <div className=" flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-8">
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



              <div className="p-3 bg-[#0F766E] border border-transparent rounded-xl shadow-sm flex-shrink-0">

                <Hospital className="text-white" size={24} />
              </div>

              <div className="min-w-0">

                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">Funcionários</h1>

                <p className="text-foreground/50 text-xs sm:text-sm">

                  {funcionarios.length} registros
                </p>
              </div>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm sm:text-base !bg-[#0F766E] hover:!bg-[#0b685e]"
            >
              <UserPlus size={20} />
              Novo Funcionário
            </Button>
          </div>

          <div className="mb-6 flex gap-4 bg-[#F9FBFD] dark:bg-[#1E1E24]">
            <div className="relative flex-1 bg-[#F9FBFD] dark:bg-[#1E1E24]">
              <Search

                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"

                size={18}
              />

              <Input
                type="text"
                placeholder="Pesquisar funcionários..."
                className="pl-10"
              />
            </div>
          </div>



          {/* Tabela Responsiva com Scroll Horizontal Isolado */}

          <DataTable>
              <table className="bg-[#F9FBFD] dark:bg-[#1E1E24] w-full text-left border-collapse min-w-[600px]">

                <thead className="bg-[#F9FBFD] dark:bg-[#1E1E24] border-b border-card-border">

                  <tr className="text-[11px] uppercase tracking-wider text-foreground/50">

                    <th className="px-6 py-4 font-semibold">Nome</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Telefone</th>
                    <th className="px-6 py-4 font-semibold">Cargo</th>
                    <th className="px-6 py-4 font-semibold text-center">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <EmptyTableState colSpan="5">
                        Carregando...
                    </EmptyTableState>
                  ) : funcionarios.length === 0 ? (
                    <EmptyTableState colSpan="5">
                        Nenhum funcionário cadastrado
                    </EmptyTableState>
                  ) : (
                    funcionarios.map((funcionario) => (
                      <tr
                        key={funcionario.id}

                        className="border-b border-card-border hover:bg-foreground/5 transition-colors"

                      >

                        <td className="px-6 py-4 text-foreground font-medium text-sm">

                          {funcionario.nome}
                        </td>

                        <td className="px-6 py-4 text-foreground/60 text-sm">

                          {funcionario.email}
                        </td>

                        <td className="px-6 py-4 text-foreground/60 text-sm">

                          {funcionario.telefone}
                        </td>

                        <td className="px-6 py-4 text-foreground/60 text-sm">

                          {funcionario.cargo}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <BotaoEditarFuncionario
                              onClick={() =>
                                setFuncionarioEditando(funcionario)
                              }
                            />

                            <BotaoDeletar
                              id={funcionario.id}
                              onDeleted={carregarFuncionarios}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
          </DataTable>
        </div>

        {isModalOpen && (
          <ModalNovoFuncionario
            onClose={() => setIsModalOpen(false)}
            onSuccess={carregarFuncionarios}
          />
        )}

        {funcionarioEditando && (
          <ModalEditarFuncionario
            funcionario={funcionarioEditando}
            onClose={() => setFuncionarioEditando(null)}
            onSuccess={carregarFuncionarios}
          />
        )}
      </main>
    </AppShell>
  );

}
