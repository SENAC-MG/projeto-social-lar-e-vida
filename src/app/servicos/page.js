"use client";
import React, { useState, useEffect } from "react";
import { Plus, Wrench, Search } from "lucide-react";
import Sidebar from "../components/sideBar";
import ModalNovoServico from "../components/modals/ModalNovoServico";

export default function ServicosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("O modal está aberto?", isModalOpen);
  }, [isModalOpen]);

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] flex">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-gray-950">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#F97316] border border-gray-800 rounded-xl shadow-sm">
                <Wrench className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Serviços</h1>
                <p className="text-gray-500 text-sm">0 registros</p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#e85a1a] text-white transition-all px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-orange-900/20"
            >
              <Plus size={20} />
              Novo Serviço
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
                placeholder="Pesquisar serviço..."
                className="w-full bg-[#11141d] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#F97316]/50"
              />
            </div>
          </div>
          <div className="bg-[#11141d] rounded-2xl border border-gray-800/50 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#1a1f2e] border-b border-gray-800/50">
                  <tr className="text-[11px] uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-4 font-semibold">Tipo</th>
                    <th className="px-6 py-4 font-semibold">Duração</th>
                    <th className="px-6 py-4 font-semibold">Unidade</th>
                    <th className="px-6 py-4 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan="8"
                      className="py-24 text-center text-gray-600 italic text-sm"
                    >
                      Nenhum serviço cadastrado
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isModalOpen && <ModalNovoServico onClose={fecharModal} />}
      </main>
    </div>
  );
}
