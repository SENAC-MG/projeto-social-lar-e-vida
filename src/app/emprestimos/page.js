"use client";

import React, { useState, useEffect } from "react";
import { Plus, Box, Menu, Search, Package } from "lucide-react";
import AppShell from "@/shared/layouts/AppShell";
import ModalNovoEmprestimo from "../components/modals/ModalNovoEmprestimo";
import ModalEditarEmprestimo from "../components/update/emprestimos/ModalEditarEmprestimo";

import { get_Emprestimos } from "@modulos/emprestimos/controller/emprestimoController";

import BotaoDeletarEmprestimo from "../components/BotaoDeletarEmprestimo";
import BotaoEditarEmprestimo from "../components/update/emprestimos/BotaoEditarEmprestimo";
import { useResponsiveSidebar } from "@/shared/hooks/useResponsiveSidebar";
import Button from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTable, EmptyTableState } from "@/shared/ui/Table";

export default function EmprestimosPage() {
    const { isSidebarOpen, toggleSidebar } = useResponsiveSidebar();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emprestimoEditando, setEmprestimoEditando] = useState(null);
    const [pesquisa, setPesquisa] = useState("");
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

    const emprestimosFiltrados = emprestimos.filter((emprestimo) =>
        [emprestimo.nome, emprestimo.cpf, emprestimo.materiais, emprestimo.cidade]
            .join(" ")
            .toLowerCase()
            .includes(pesquisa.toLowerCase())
    );
    return (
        <AppShell isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
            <main className="bg-[#EEF2F7] dark:bg-background flex-1 flex flex-col min-w-0 transition-all duration-300">
                <div className="p-4 sm:p-8 bg-background">

                    {/* Header Responsivo */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-8">
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

                            <div className="p-3 border border-transparent rounded-xl shadow-sm flex-shrink-0 bg-[#5C7A53]">
                                <Box className="text-white" size={24} />
                            </div>

                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">Empréstimos</h1>
                                <p className="text-foreground/50 text-xs sm:text-sm">
                                    {emprestimos.length} registros
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm sm:text-base !bg-[#5C7A53] hover:!bg-[#4F6847]"
                        >
                            <Package size={20} />
                            Novo Empréstimo
                        </Button>
                    </div>

                    <div className="mb-6 flex gap-4">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                                size={18}
                            />
                            <Input
                                type="text"
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                                placeholder="Pesquisar empréstimo..."
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Tabela Responsiva com Scroll Lateral */}
                    <DataTable>
                        <table className="bg-[#F9FBFD] dark:bg-background w-full text-left border-collapse min-w-[800px]">
                            <thead className="bg-[#F9FBFD] dark:bg-zinc-800/50 border-b border-card-border">
                                <tr className="text-[11px] uppercase tracking-wider text-foreground/50 font-semibold">
                                    <th className="px-6 py-4">Nome</th>
                                    <th className="px-6 py-4">CPF</th>
                                    <th className="px-6 py-4">Quantidade</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Data Empréstimo</th>
                                    <th className="px-6 py-4">Previsão Devolução</th>
                                    <th className="px-6 py-4 text-center">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {emprestimosFiltrados.length === 0 ? (
                                    <EmptyTableState colSpan="7">
                                        {loading ? "Carregando empréstimos..." : "Nenhum empréstimo encontrado"}
                                    </EmptyTableState>
                                ) : (
                                    emprestimos.map((emprestimo) => (
                                        <tr
                                            key={emprestimo.id}
                                            className="border-b border-card-border hover:bg-foreground/5 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-foreground font-medium text-sm">
                                                {emprestimo.nome}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-foreground/60">
                                                {emprestimo.cpf}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-foreground/60">
                                                {emprestimo.quantidade || 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${emprestimo.status === "ativo" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
                                                        emprestimo.status === "devolvido" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" :
                                                            emprestimo.status === "atrasado" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300" :
                                                                "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                                                    }`}>
                                                    {emprestimo.status || "ativo"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-foreground/60">
                                                {emprestimo.dataEmprestimo
                                                    ? new Date(emprestimo.dataEmprestimo).toLocaleDateString("pt-BR")
                                                    : "-"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-foreground/60">
                                                {emprestimo.previsaoDevolucao
                                                    ? new Date(emprestimo.previsaoDevolucao).toLocaleDateString("pt-BR")
                                                    : "-"}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <BotaoEditarEmprestimo
                                                        onClick={() =>
                                                            setEmprestimoEditando(emprestimo)
                                                        }
                                                    />

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
                    </DataTable>

                </div>

                {isModalOpen && (
                    <ModalNovoEmprestimo
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={carregarEmprestimos}
                    />
                )}

                {emprestimoEditando && (
                    <ModalEditarEmprestimo
                        emprestimo={emprestimoEditando}
                        onClose={() => setEmprestimoEditando(null)}
                        onSuccess={carregarEmprestimos}
                    />
                )}
            </main>
        </AppShell>
    );
}
