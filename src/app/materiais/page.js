"use client";

import { useEffect, useState } from "react";
import { Boxes, Plus, Search, Menu } from "lucide-react";

import AppShell from "@/shared/layouts/AppShell";
import Button from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTable, EmptyTableState } from "@/shared/ui/Table";
import Pagination from "../components/shared/ui/Pagination";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";

import ModalNovoMaterial from "../components/modals/ModalNovoMaterial";
import ModalEditarMaterial from "../components/update/materiais/ModalEditarMaterial";
import BotaoEditarMaterial from "../components/update/materiais/BotaoEditarMaterial";
import BotaoDeletarMaterial from "../components/BotaoDeletarMaterial";

import { get_Materiais } from "@modulos/materiais/controller/materialController";

export default function MateriaisPage() {
  const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();

  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialEditando, setMaterialEditando] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const ITENS_POR_PAGINA = 15;

  async function carregarMateriais() {
    setLoading(true);

    try {
      const dados = await get_Materiais();
      setMateriais(dados);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarMateriais();
  }, []);

  const materiaisFiltrados = materiais.filter((material) => {
    const termo = busca.toLowerCase();

    return (
      material.nome?.toLowerCase().includes(termo) ||
      material.descricao?.toLowerCase().includes(termo) ||
      material.status?.toLowerCase().includes(termo)
    );
  });

  const totalPaginas = Math.ceil(materiaisFiltrados.length / ITENS_POR_PAGINA);

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;

  const materiaisPaginados = materiaisFiltrados.slice(inicio, fim);

  return (
    <AppShell isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <main className="bg-[#EEF2F7] dark:bg-background flex-1 flex flex-col min-w-0 transition-all duration-300">
        <div className="p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={toggleSidebar}
                className="text-foreground/60 hover:text-foreground p-2 hover:bg-foreground/10 rounded-lg transition-colors md:hidden"
                aria-label="Abrir menu"
              >
                <Menu size={24} />
              </button>

              <div className="p-3 bg-[#5C7A53] border border-transparent rounded-xl shadow-sm flex-shrink-0">
                <Boxes className="text-white" size={24} />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                  Materiais
                </h1>

                <p className="text-foreground/50 text-xs sm:text-sm">
                  {materiais.length} registros
                </p>
              </div>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm sm:text-base !bg-[#5C7A53] hover:!bg-[#4F6847]"
            >
              <Plus size={20} />
              Novo Material
            </Button>
          </div>

          <div className="rounded-2xl border border-card-border bg-[#F9FBFD] dark:bg-background overflow-hidden">
            <div className="p-4 border-b border-card-border">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                  size={18}
                />

                <Input
                  type="text"
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value);
                    setPaginaAtual(1);
                  }}
                  placeholder="Pesquisar material..."
                  className="pl-10 bg-transparent"
                />
              </div>
            </div>

            <DataTable>
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead className="bg-[#F9FBFD] dark:bg-zinc-800/50 border-b border-card-border">
                  <tr className="text-[11px] uppercase tracking-wider text-foreground/50">
                    <th className="px-6 py-4 font-semibold">Nome</th>
                    <th className="px-6 py-4 font-semibold">Descrição</th>
                    <th className="px-6 py-4 font-semibold">Total</th>
                    <th className="px-6 py-4 font-semibold">Disponível</th>
                    <th className="px-6 py-4 font-semibold">Emprestado</th>
                    <th className="px-6 py-4 font-semibold">Emprestado para</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <EmptyTableState colSpan="8">
                      Carregando...
                    </EmptyTableState>
                  ) : materiaisFiltrados.length === 0 ? (
                    <EmptyTableState colSpan="8">
                      Nenhum material cadastrado
                    </EmptyTableState>
                  ) : (
                    materiaisPaginados.map((material) => {
                      const total = material.quantidadeTotal || 0;
                      const atual = material.quantidadeAtual || 0;
                      const emprestado = total - atual;

                      return (
                        <tr
                          key={material.id}
                          className="border-b border-card-border hover:bg-foreground/5 transition-colors"
                        >
                          <td className="px-6 py-4 text-foreground font-medium text-sm">
                            {material.nome}
                          </td>

                          <td className="px-6 py-4 text-foreground/60 text-sm max-w-[260px]">
                            <p className="truncate" title={material.descricao || ""}>
                              {material.descricao || "-"}
                            </p>
                          </td>

                          <td className="px-6 py-4 text-center text-foreground/60 text-sm">
                            {total}
                          </td>

                          <td className="px-6 py-4 text-center text-sm">
                            <span className="inline-flex justify-center min-w-8 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                              {atual}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-center text-sm">
                            <span className="inline-flex justify-center min-w-8 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                              {emprestado}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-foreground/60 text-sm max-w-[220px]">
                            <p className="truncate">
                              {material.emprestimos?.length > 0
                                ? material.emprestimos.map((emprestimo) => emprestimo.nome).join(", ")
                                : "Disponível"}
                            </p>
                          </td>

                          <td className="px-6 py-4 text-center text-sm">
                            <span className={`inline-flex justify-center min-w-16 px-3 py-1 rounded-full text-xs font-semibold ${material.status === "ativo"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                              : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                              }`}>
                              {material.status || "-"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                              <BotaoEditarMaterial
                                onClick={() =>
                                  setMaterialEditando(material)
                                }
                              />

                              <BotaoDeletarMaterial
                                id={material.id}
                                onDeleted={carregarMateriais}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </DataTable>

            {materiaisFiltrados.length > 0 && (
              <Pagination
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onPageChange={setPaginaAtual}
              />
            )}
          </div>
        </div>

        {isModalOpen && (
          <ModalNovoMaterial
            onClose={() => setIsModalOpen(false)}
            onSuccess={carregarMateriais}
          />
        )}

        {materialEditando && (
          <ModalEditarMaterial
            material={materialEditando}
            onClose={() => setMaterialEditando(null)}
            onSuccess={carregarMateriais}
          />
        )}
      </main>
    </AppShell>
  );
}