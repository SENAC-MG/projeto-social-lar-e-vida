"use client";
import React, { useState } from "react";
import { UserPlus, Users, Search, MoreHorizontal, Hospital } from "lucide-react";
import Sidebar from "../components/sideBar";
import ModalNovoFuncionario from "../components/modals/ModalNovoFuncionario";

export default function PacientesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0c10] flex">
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
                <p className="text-gray-500 text-sm">0 registros</p>
              </div>
            </div>
            <button
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
                placeholder="Pesquisar funcionarios..."
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan="8"
                      className="py-24 text-center text-gray-600 italic text-sm"
                    >
                      Nenhum funcionário cadastrado
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <ModalNovoFuncionario onClose={() => setIsModalOpen(false)} />
        )}
      </main>
    </div>
  );
}
