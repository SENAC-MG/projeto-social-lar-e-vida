"use client";

import React, { useState, useEffect } from "react";
import { Plus, Box } from "lucide-react";
import Sidebar from "../components/sideBar";
import ModalNovoEmprestimo from "../components/modals/ModalNovoEmprestimo";
import { get_Emprestimos } from "@modulos/emprestimos/controller/emprestimoController";
import BotaoDeletarEmprestimo from "../components/BotaoDeletarEmprestimo";

export default function EmprestimosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-[#0a0c10] flex">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-gray-950">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#F97316] border border-gray-800 rounded-xl shadow-sm">
                <Box className="text-white" size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">Empréstimos</h1>
                <p className="text-gray-500 text-sm">
                  {emprestimos.length} registros
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#e85a1a] text-white transition-all px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-orange-900/20"
            >
              <Plus size={20} />
              Novo Empréstimo
            </button>
          </div>

          <div className="bg-[#11141d] rounded-2xl border border-gray-800/50 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#1a1f2e] border-b border-gray-800/50">
                  <tr className="text-[11px] uppercase tracking-wider text-gray-400">
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
                        className="py-24 text-center text-gray-500 italic text-sm"
                      >
                        Carregando empréstimos...
                      </td>
                    </tr>
                  ) : emprestimos.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-24 text-center text-gray-600 italic text-sm"
                      >
                        Nenhum empréstimo cadastrado
                      </td>
                    </tr>
                  ) : (
                    emprestimos.map((emprestimo) => (
                      <tr
                        key={emprestimo.id}
                        className="border-b border-gray-800 text-gray-300 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4">{emprestimo.nome}</td>

                        <td className="px-6 py-4">
                          {emprestimo.materiaisEmprestados}
                        </td>

                        <td className="px-6 py-4">{emprestimo.cpf}</td>

                        <td className="px-6 py-4">{emprestimo.cidade}</td>

                        <td className="px-6 py-4">{emprestimo.telefone1}</td>

                        <td className="px-6 py-4">
                          {emprestimo.dataEmprestimo
                            ? new Date(
                              emprestimo.dataEmprestimo
                            ).toLocaleDateString("pt-BR")
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