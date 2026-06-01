"use client";

import React, { useState, useEffect } from "react";
import { Wrench, Search, Menu } from "lucide-react";

import Pagination from "../components/shared/ui/Pagination";
import AppShell from "@/shared/layouts/AppShell";
import ModalNovoServico from "../components/modals/ModalNovoServico";
import ModalEditarServico from "../components/update/servicos/ModalEditarServico";
import { get_Servicos } from "@modulos/servicos/controller/servicoController";
import BotaoDeletarServico from "../components/BotaoDeletarServico";
import BotaoEditarServico from "../components/update/servicos/BotaoEditarServico";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";
import Button from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTable, EmptyTableState } from "@/shared/ui/Table";

export default function ServicosPage() {
    const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servicoEditando, setServicoEditando] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);

    const ITENS_POR_PAGINA = 15;

    async function carregarServicos() {
        try {
            const dados = await get_Servicos();
            setServicos(dados || []);
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
        }
    }

    useEffect(() => {
        carregarServicos();
    }, []);

    const servicosFiltrados = servicos.filter((servico) =>
        [
            servico.nome,
            servico.cpf,
            servico.tipoServico,
            servico.unidade,
            servico.status,
            servico.funcionarioResponsavel,
        ]
            .join(" ")
            .toLowerCase()
            .includes(pesquisa.toLowerCase())
    );

    const totalPaginas = Math.ceil(servicosFiltrados.length / ITENS_POR_PAGINA);

    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;

    const servicosPaginados = servicosFiltrados.slice(inicio, fim);

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

                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm sm:text-base !bg-[#5C7A53] hover:!bg-[#4F6847]"
                        >
                            <Wrench size={20} />
                            Novo Serviço
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
                                    value={pesquisa}
                                    onChange={(e) => setPesquisa(e.target.value)}
                                    placeholder="Pesquisar serviço..."
                                    className="pl-10 bg-transparent"
                                />
                            </div>
                        </div>

                        <DataTable>
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="bg-[#F9FBFD] dark:bg-zinc-800/50 border-b border-card-border">
                                    <tr className="text-[11px] uppercase tracking-wider text-foreground/50">
                                        <th className="px-6 py-4 font-semibold">Nome</th>
                                        <th className="px-6 py-4 font-semibold">Tipo Serviço</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Responsável</th>
                                        <th className="px-6 py-4 font-semibold">Valor (R$)</th>
                                        <th className="px-6 py-4 font-semibold">Data Serviço</th>
                                        <th className="px-6 py-4 text-center font-semibold">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {servicosFiltrados.length === 0 ? (
                                        <EmptyTableState colSpan="7">
                                            Nenhum serviço cadastrado
                                        </EmptyTableState>
                                    ) : (
                                        servicosPaginados.map((servico) => (
                                            <tr
                                                key={servico.id}
                                                className="border-b border-card-border hover:bg-foreground/5 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-foreground font-medium text-sm">
                                                    {servico.nome}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-foreground/60">
                                                    {servico.tipoServico}
                                                </td>

                                                <td className="px-6 py-4 text-sm">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${servico.status === "pendente"
                                                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                                            : servico.status === "em andamento"
                                                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                                                : servico.status === "concluido"
                                                                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                                                    : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                                                            }`}
                                                    >
                                                        {servico.status || "pendente"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-foreground/60">
                                                    {servico.funcionarioResponsavel || "-"}
                                                </td>

                                                <td className="px-6 py-4 text-green-500 font-medium text-sm">
                                                    R$ {servico.valorServico}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-foreground/60">
                                                    {servico.dataServico
                                                        ? new Date(servico.dataServico).toLocaleDateString(
                                                            "pt-BR"
                                                        )
                                                        : "-"}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        <BotaoEditarServico
                                                            onClick={() => setServicoEditando(servico)}
                                                        />

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
                        </DataTable>

                        {servicosFiltrados.length > 0 && (
                            <Pagination
                                paginaAtual={paginaAtual}
                                totalPaginas={totalPaginas}
                                onPageChange={setPaginaAtual}
                            />
                        )}
                    </div>
                </div>

                {isModalOpen && (
                    <ModalNovoServico
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={carregarServicos}
                    />
                )}

                {servicoEditando && (
                    <ModalEditarServico
                        servico={servicoEditando}
                        onClose={() => setServicoEditando(null)}
                        onSuccess={carregarServicos}
                    />
                )}
            </main>
        </AppShell>
    );
}