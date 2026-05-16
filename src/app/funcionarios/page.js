"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, Hospital, Search } from "lucide-react";
import { Toaster } from "sonner";
import Sidebar from "../components/sideBar";
import ModalNovoFuncionario from "../components/modals/ModalNovoFuncionario";
import { get_Funcionarios } from "@modulos/funcionarios/controller/funcionarioController";
import BotaoDeletar from "../components/BotaoDeletar";

export default function FuncionariosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="min-h-screen bg-[#0a0c10] flex">
      <Toaster richColors position="top-right" />
      <Sidebar />

      <main className="flex-1 flex flex-col bg-gray-950">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#F97316] border border-gray-800 rounded-xl shadow-sm">
                <Hospital className="text-white" size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">Funcionários</h1>
                <p className="text-gray-500 text-sm">
                  {funcionarios.length} registros
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#e85a1a] text-white transition-all px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-orange-900/20"
            >
              <UserPlus size={20} />
              Novo Funcionário
            </button>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />

              <input
                type="text"
                placeholder="Pesquisar funcionários..."
                className="w-full bg-[#11141d] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#F97316]/50"
              />
            </div>
          </div>

          <div className="bg-[#11141d] rounded-2xl border border-gray-800/50 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#1a1f2e] border-b border-gray-800/50">
                  <tr className="text-[11px] uppercase tracking-wider text-gray-400">
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
                    <tr>
                      <td
                        colSpan="5"
                        className="py-24 text-center text-gray-600 italic text-sm"
                      >
                        Carregando...
                      </td>
                    </tr>
                  ) : funcionarios.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-24 text-center text-gray-600 italic text-sm"
                      >
                        Nenhum funcionário cadastrado
                      </td>
                    </tr>
                  ) : (
                    funcionarios.map((funcionario) => (
                      <tr
                        key={funcionario.id}
                        className="border-b border-gray-800/30 hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-white">
                          {funcionario.nome}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {funcionario.email}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {funcionario.telefone}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {funcionario.cargo}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
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
            </div>
          </div>
        </div>

        {isModalOpen && (
          <ModalNovoFuncionario
            onClose={() => setIsModalOpen(false)}
            onSuccess={carregarFuncionarios}
          />
        )}
      </main>
    </div>
  );
}